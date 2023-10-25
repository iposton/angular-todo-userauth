# Angular Todo Userauth

This app is designed to make http requests to a node.js app that is running on localhost://4000. I made a back-end API called [Node.js todo userauth](https://github.com/iposton/nodejs-todo-userauth). This angular front-end app will work with the Node.js API to allow a user to Create a task, Read a task, Update the task, and Delete a task. You must be logged in with a token to gain access to the task controls. Before you can add todos, you need to create List name and then the todos you create belong to that list. You can create multiple lists and and select a list from a drop down menu. This uses bootstrap to create a responsive UI.  

## Software used

  * Angular CLI version 16.2.7
  * Typescript version 5.1.3
  * Node.js version 18.10.0

## Install and serve the app

1. run `npm i`
2. `ng serve`

Then go to http://localhost:4200 on your machine.

## Login Credentials

The app routes to login page on initial load. Log in with the following credentials.

Username: test
Password: test

## API Routes
Run [Node.js todo userauth](https://github.com/iposton/nodejs-todo-userauth) server in your terminal at the same time as running the angular client server.

* Create List: POST (http://localhost:4000/lists, {name: 'List Name'}, {headers})
* Update List: POST (http://localhost:4000/lists, {name: 'New List Name'}, {headers})
* Delete List: DELETE (http://localhost:4000/lists/listID, listData)
* Get Lists: GET (http://localhost:4000/lists)
* Get request accepts sort params `http://localhost:4000/lists?sort=desc` or `sort=asc`

Same for Todos.

Enjoy :)



