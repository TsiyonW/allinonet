import { CartDB } from '../../db/models/Cart'
import { link } from 'fs'
const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: false })
const cheerio = require('cheerio')

// return all the items in the cart
export const myCart = async(_:any, args:any,ctx:any)=>{
  let data: string[] = [];

  let searchResult = await nightmare
        .goto('https://www.amazon.com')
        .type('#twotabsearchtextbox', 'bag')
        .click('input.nav-input')
        .wait('.s-desktop-content')
        .evaluate(() => {          
          let element:HTMLElement = document.querySelector('.s-desktop-content') as HTMLElement
          return element.innerHTML}
        )
        .end()

  // if(searchResult){
    let $ = cheerio.load(searchResult);
    // var element = $('.sg-col-inner')
    $('div[data-component-type = "s-search-result"]').each((i:any, elem:any)=>{
      // console.log('i : ',i)
      // console.log($.html(elem))
      let items = $.html(elem)
      let item = cheerio.load(items)
      // let linkItems =  $.html('a.a-text-normal')
      // let linkItem = cheerio.load(linkItems)    id:ID!

      let itemD = {} as any;
      itemD.user_id = 1;
      itemD.site = item('h2 a.a-text-normal').get(0).attribs.href;
      itemD.description = item('a.a-text-normal span.a-text-normal').text().trim();
      itemD.unitPrice = item('.a-offscreen').text().trim();
      itemD.rating = item('i span.a-icon-alt').text().trim();
      itemD.image = item('img').get(0).attribs.src;
      itemD.item = "some item";
      itemD.quantity = 1;
      itemD.measurementUnit="peace"
      
      data.push(itemD)
  
  
    })
    // console.log($('a.a-text-normal').get(3).attribs.href)
    // console.log(data)
    return data
  // }
  // console.log("something wrong")


}

//get specific item in the cart using id
export const cart = async(_:any, args:any,ctx:any)=>{
    const cartItem = await CartDB.Cart.query().findById(args.id)
    return cartItem
}
// add item to cart
const addToCart = async(_:any, args:any,ctx:any)=>{
  return await  CartDB.Cart.query().insert({...args.input, user_id:ctx.user.id})

}
// removes item from the cart
const removeFromCart = async(_:any, args:any,ctx:any)=>{

  return await CartDB.Cart.query().deleteById(args.id)
}
// remove all items from the cart
const emptyCart = async(_:any, args:any,ctx:any)=>{

  return await CartDB.Cart.query().delete().where('user_id', '=',args.user_id)
}
// update items from cart /updating the quantity of items to add to a cart/
const updateCart = async(_:any, args:any,ctx:any)=>{
  return await CartDB.Cart.query().patchAndFetchById(args.id,args.input )

}
export default {
    Query: {
      myCart,
      cart
    },
    Mutation: {
      addToCart,
      removeFromCart,
      emptyCart,
      updateCart
    }
}