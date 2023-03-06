Countries routes

Base URL /countries

| METHOD  | URI Path                                 | Description                                      |
|---------|------------------------------------------|--------------------------------------------------|
| GET     | /countries                               | All countries list                               |
| GET     | /countries/:id                           | Matching ID country details                      |
| PUT     | /countries/:id/edit                      | Matching ID country edit                         |
| DELETE  | /countries/:id/delete                    | Matching ID country deletion                     |
| POST    | /countries/:id/comments/create           | Create new comment in specific country           |
| PUT     | /countries/:id/comments/edit    | Matching ID comment deletion in specific country |
| DELETE  | /countries/:id/comments/delete  | Matching ID comment deletion in specific country |

Posts routes

Base URL /posts

| METHOD  | URI Path                                 | Description                                   |
|---------|------------------------------------------|-----------------------------------------------|
| GET     | /posts                                   | All posts list                                |
| POST    | /posts/create                            | Create a new post                             |
| GET     | /posts/:id                               | Matching ID post details                      |
| PUT     | /posts/:id/edit                          | Matching ID post edit                         |
| DELETE  | /posts/:id/delete                        | Matching ID post deletion                     |
| POST    | /posts/:id/comments/create               | Create new comment in specific post           |
| PUT     | /posts/:id/comments/edit                 | Matching ID comment deletion in specific post |
| DELETE  | /posts/:id/comments/delete               | Matching ID comment deletion in specific post |

Users routes

Base URL /users

| METHOD  | URI Path                                 | Description               |
|---------|------------------------------------------|---------------------------|
| GET     | /users                                   | All users list            |
| GET     | /users/:id                               | Matching ID user details  |
| PUT     | /users/:id/edit                          | Matching ID user edit     |
| DELETE  | /users/:id/delete                        | Matching ID user deletion |

Auth routes

Base URL /auth

| METHOD  | URI Path                                 | Description               |
|---------|------------------------------------------|---------------------------|
| POST    | /login                                   | Login user                |
| POST    | /signup                                  | Signup user               |
| GET     | /verify                                  | Verify auth token         |
