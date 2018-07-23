# todo-app


## Routes
* POST `/users` for creating new user
* GET `/users` for fetching all users
* GET `/user/:id` for fetching user by `id` which also includes user's todo lists
* PUT `/user/:id` for update user by `id`
* DELETE `/user/:id` for deleting user by `id`
* POST `/user/:userId/todos` for creating a user's todo
* GET `/user/:userId/todo/:id` for fetching user's todo by user `id` and todo `id`
* PUT `/user/:userId/todo/:id` for updating todo by `id`
* DELETE `/user/:userId/todo/:id` for deleting todo by `id`
* POST `/login` for user login
* GET `/todos` to fetch all todos
