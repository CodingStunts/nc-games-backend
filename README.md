# Northcoders Backend Server Project - Games

[**_Link to hosted server_**](https://jays-games-server.herokuapp.com/api/)

[**_Link to GitHub repository_**](https://github.com/CodingStunts/be-nc-games)

Hello and welcome to my project page! This server project forms the backend element of my portfolio piece which will later be accompanied by a frontend interface made using React. Node.js is the language used for this project, further making use of Express as the framework for the server, PostgresQL for the database, along with Jest and Supertest for the testing during development. It has now been hosted using Heroku.

The purpose of this server is to allow users to retrieve game information including reviews, user data, comments, and category lists. It allows reviews to be sorted and ordered by several different criteria, whilst also having defaulted criteria in place. You can also post and amend the data in the reviews and comments as well as deleting comments and reviews.
Please see the /api page on the hosted version (linked above) for a full rundown of examples and instructions for what the server can do. Please feel free to have a mess around with it to see for yourself!

## SET UP

_To proceed with the following you will need to have a code editor downloaded and install some dependencies._

**1.** To clone this project from GitHub select the green 'Code' button and copy the https link into your terminal, using command `git clone https://github.com/CodingStunts/be-nc-games.git`. You should then be able to boot it up in your code editor to look it over by changing directory to the newly cloned repository and using command `code .` in your terminal. All associated files on this repo should then be available to you locally.

**2.** In order to get the project running locally as intended you will need to install the following npm dependencies via your terminal in your code editor.

Using command `npm i` this should install the following:

[**PostgresQL**](https://www.postgresql.org/)

[**Express**](https://www.npmjs.com/package/express)

[**dotenv**](https://www.npmjs.com/package/dotenv)

[**Supertest**](https://www.npmjs.com/package/supertest)

[**Jest**](https://www.npmjs.com/package/jest)

**3.** The environment the server runs in will dictate which database it uses, i.e. the test database or development database. You must create a new file in your code editor within the outermost folder of this repo called `.env.test` and also `.env.development`. In the env.test file you must write `PGDATABASE=nc_games_test` and in the env.development file it needs `PGDATABASE=nc_games`. Once these two parts are complete the server should be able to run as intended!

**4.** The database must be seeded using PosgresQL. You can do this by using command `npm run seed`, this must be done twice to create, drop, and create the database again. If this isn't done it can cause complications in the database later.

**5.** After the database has been seeded we can run the test suite and this should come back in your terminal to say all tests are passing, and will give descriptions of what each test is checking for in the server's behaviour. You can run the tests using the command `npm run test`.

Finally, be aware that in order for this all to be successful, you must make sure you're running PostgresQL at v8.7.1 or higher and also Node.js at v14.18.1 or higher.

**6.** Give it a whirl!
