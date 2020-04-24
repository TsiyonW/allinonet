import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { schemas } from './utils/schema'
import users from './types/user/user.resolver'
import accounts from './types/ecommerceaccount/ecommerceaccount.resolver'
import cart from './types/cart/cart.resolver'
import { merge } from 'lodash'
import { BotService } from './utils/common';
require('dotenv').config();
const bodyParser = require('body-parser');
// let bot = require('./utils/common')

const app = express();
app.use(bodyParser.json());
// let bot = new BotService();

//   BotService.startBot();
  const server = new ApolloServer({
    typeDefs: schemas,
    resolvers: merge({}, users,cart, accounts),
    
  })

  server.applyMiddleware({app})

  app.get('/', (req, res)=>{
    res.send({
        name:"Tsiyon", 
        age:22,
    })
})
const port = process.env.PORT || 3000
  app.listen(port, function(){
    console.log(`Server ready at http://localhost:3000${server.graphqlPath}`)
  });
  
//   app.post('/' + bot.token, function (req, res) {
//     console.log(bot.token)
//     bot.processUpdate(req.body);
//     res.sendStatus(200);
//   });



