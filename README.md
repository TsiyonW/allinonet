<div align="center">

  # All in one Ecommerce

</div>

## What is AllInOneeCommerce?
A bot which has functionalities like searching an item and returning the results, add items to cart, redirect to order page,  and view item details from multiple e-commerce sites.

## Content

- [Codebase](#codebase)
  - [Technologies](#technologies)
  - [Foler Structure](#folder-structure)
  - [Code Style](#code-style)
  
- [Usage](#usage)
  - [Installation](#installation)
  - [Setting up database](#setting-up-database)

## Codebase
## Technologies
We have used Node.js to power our servers and we have used javascript and typescript languages.
Here is the list of technologies we use:
- **PostgreSQL**: Data storage
- **GraphQL**: API, powered by Apollo server and express
- **Objection**: ORM for nodejs
- **Nightmare**: browser automation library
## Folder structure
```sh
Allinoneecommerce/
├── db
  ├── config
  ├── models
├── dist
├── migrations
├── types
  ├── saveditem
  ├── search
  ├── user
├── utils
```


### Code Style
  We run Prettier to format the coding style.

## Usage
To use the API locally clone the repository
```
$ git clone https://github.com/TsiyonW/allinoneecommerce.git
```
### Installation
1. **Node.js**: see [Node.js documentation](https://nodejs.org/en/download/) for instructions on installing
2. **Yarn**: package manager to manage our dependencies see [yarn documentation](https://yarnpkg.com/getting-started/install) for instructions on installing.
3. **PostgreSQL**: opensource object-relational database system see [postgresql documentation](https://www.postgresql.org/docs/9.3/tutorial-install.html) for instruction.
4. **Dependencies**: install all the dependencies using yarn install
```
$ yarn install
```
Now all the installations have finished. Then we will setup our database
## Setting up database
Create a database you want to use and replace DATABAES_URL in knexfile.js to your database url
 ### Migrate the database
 ```
knex migrate:latest or 
npx knex migrate latest
```
Then run the server 
```
yarn start
```
Go to http://localhost:3000/graphql
