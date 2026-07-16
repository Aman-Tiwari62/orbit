# Orbit Server API

## Base URL

- `http://localhost:<PORT>/api`
- `PORT` is loaded from `process.env.PORT`

## Authentication

- The server uses a `token` cookie for authenticated requests.
- Routes under `/api/post` and `/api/user` require authentication via `isAuthenticated` middleware.

---

## Routes

### Authentication

#### `POST /api/auth/signup`
- Purpose: Register a new user.
- Request body: `application/json`
  - `name` (string, required)
  - `username` (string, required)
  - `email` (string, required)
  - `password` (string, required)
- Success response:
  - `201 Created`
  - JSON:
    - `success: true`
    - `message: "user signup successfully"`
    - `user`: object
      - `id`
      - `name`
      - `username`
      - `email`
      - `profilePic`
      - `bio`
      - `followers` (array)
      - `following` (array)
- Error response examples:
  - `400 Bad Request` when validation fails: `{ success: false, message }`
  - `409 Conflict` when email or username already exists: `{ success: false, message }`
  - `500 Internal Server Error`

#### `POST /api/auth/login`
- Purpose: Authenticate a user.
- Request body: `application/json`
  - `usernameOrEmail` (string, required)
  - `password` (string, required)
- Success response:
  - `200 OK`
  - JSON:
    - `success: true`
    - `message: "user login successfully"`
    - `user`: object
      - `id`
      - `name`
      - `username`
      - `email`
      - `profilePic`
      - `bio`
      - `followers` (array)
      - `following` (array)
- Error response examples:
  - `400 Bad Request` when validation fails: `{ success: false, message }`
  - `404 Not Found` when user does not exist: `{ success: false, message }`
  - `401 Unauthorized` when password is incorrect: `{ success: false, message }`
  - `500 Internal Server Error`

#### `POST /api/auth/logout`
- Purpose: Clear the authentication cookie.
- Authentication: required
- Success response:
  - `200 OK`
  - JSON:
    - `success: false`  <!-- actual implementation returns false -->
    - `message: "logout successfully."`
- Error response:
  - `500 Internal Server Error`

---

### Posts

#### `POST /api/post/createPost`
- Purpose: Create a new post.
- Authentication: required
- Request type: `multipart/form-data`
  - `content` (string, optional)
  - `image` (file, optional)
- Success response:
  - `201 Created`
  - JSON:
    - `success: true`
    - `message: "post created successfully"`
    - `post`: object
      - `author` (populated with `name`, `username`, `profilePic`)
      - `content`
      - `image`
      - `likes` (array)
      - timestamps
- Error response examples:
  - `400 Bad Request` when neither content nor image is provided: `{ success: false, message }`
  - `500 Internal Server Error`

#### `GET /api/post/getPosts`
- Purpose: Fetch all posts.
- Authentication: required
- Success response:
  - `200 OK`
  - JSON:
    - `success: true`
    - `message: "posts fetched successfully"`
    - `posts`: array of post objects
      - each post includes populated `author` with `username` and `profilePic`
- Error response:
  - `500 Internal Server Error`

#### `PUT /api/post/editPostContent/:id`
- Purpose: Edit text content of an existing post.
- Authentication: required
- Path params:
  - `id`: post ID
- Request body: `application/json`
  - `content` (string, required)
- Success response:
  - `200 OK`
  - JSON:
    - `success: true`
    - `message: "post updated successfully"`
    - `post`: updated post object with populated `author`
- Error responses:
  - `404 Not Found` when post does not exist
  - `403 Forbidden` when current user is not the author
  - `400 Bad Request` when `content` is missing
  - `500 Internal Server Error`

#### `DELETE /api/post/deletePost/:id`
- Purpose: Delete a post.
- Authentication: required
- Path params:
  - `id`: post ID
- Success response:
  - `200 OK`
  - JSON:
    - `success: true`
    - `message: "post deleted successfully"`
- Error responses:
  - `404 Not Found` when post does not exist
  - `403 Forbidden` when current user is not the author
  - `500 Internal Server Error`

#### `PUT /api/post/like/:id`
- Purpose: Toggle like status for a post.
- Authentication: required
- Path params:
  - `id`: post ID
- Success response:
  - `200 OK`
  - JSON:
    - `success: true`
    - `message: "post like status updated successfully"`
- Error responses:
  - `404 Not Found` when post does not exist
  - `500 Internal Server Error`

#### `POST /api/post/comment/:id`
- Purpose: Add a comment to a post.
- Authentication: required
- Path params:
  - `id`: post ID
- Current implementation: placeholder response
- Success response:
  - `200 OK`
  - JSON:
    - `success: true`
    - `message: "comment on postid: <id>"`

#### `PUT /api/post/editComment/:id`
- Purpose: Edit a comment.
- Authentication: required
- Path params:
  - `id`: post/comment ID
- Current implementation: placeholder response
- Success response:
  - `200 OK`
  - JSON:
    - `success: true`
    - `message: "edit comment, ostid: <id>"`

#### `DELETE /api/post/deleteComment/:id`
- Purpose: Delete a comment.
- Authentication: required
- Path params:
  - `id`: post/comment ID
- Current implementation: placeholder response
- Success response:
  - `200 OK`
  - JSON:
    - `success: true`
    - `message: "delete comment, ostid: <id>"`

---

### Users

#### `GET /api/user/`
- Purpose: Fetch the authenticated user's profile.
- Authentication: required
- Success response:
  - `200 OK`
  - JSON:
    - `success: true`
    - `message: "User fetched successfully"`
    - `user`: object
      - `id`
      - `name`
      - `username`
      - `email`
      - `profilePic`
      - `bio`
      - `followers`
      - `following`
- Error responses:
  - `404 Not Found` when user is not found
  - `500 Internal Server Error`

#### `GET /api/user/:id`
- Purpose: Fetch another user's profile.
- Authentication: required
- Path params:
  - `id`: user ID
- Success response:
  - `200 OK`
  - JSON:
    - `success: true`
    - `message: "User fetched successfully"`
    - `user`: object
      - `id`
      - `name`
      - `username`
      - `profilePic`
      - `bio`
      - `followers`
      - `following`
- Error responses:
  - `404 Not Found` when user is not found
  - `500 Internal Server Error`

#### `PUT /api/user/edit/bio`
- Purpose: Update the authenticated user's bio.
- Authentication: required
- Request body: `application/json`
  - `bio` (string)
- Success response:
  - `200 OK`
  - JSON:
    - `success: true`
    - `message: "bio updated"`
- Error responses:
  - `404 Not Found` when user is not found
  - `400 Bad Request` when bio exceeds 150 characters
  - `500 Internal Server Error`

#### `PUT /api/user/edit/profilePicture`
- Purpose: Update the authenticated user's profile picture.
- Authentication: required
- Request type: `multipart/form-data`
  - `profilePic` (file, required)
- Success response:
  - `200 OK`
  - JSON:
    - `success: true`
    - `message: "Profile picture updated successfully"`
    - `profilePicture`: URL string
- Error responses:
  - `400 Bad Request` when file is missing
  - `404 Not Found` when user is not found
  - `500 Internal Server Error`

#### `PUT /api/user/edit/name`
- Purpose: Update the authenticated user's name.
- Authentication: required
- Request body: `application/json`
  - `name` (string, required)
- Success response:
  - `200 OK`
  - JSON:
    - `success: true`
    - `message: "name updated"`
- Error responses:
  - `404 Not Found` when user is not found
  - `400 Bad Request` when name validation fails
  - `500 Internal Server Error`

#### `PUT /api/user/follow/:id`
- Purpose: Follow another user.
- Authentication: required
- Path params:
  - `id`: target user ID
- Success response:
  - `200 OK`
  - JSON:
    - `success: true`
    - `message: "User followed successfully"`
- Error responses:
  - `400 Bad Request` when following yourself or already following
  - `404 Not Found` when target user is not found
  - `500 Internal Server Error`

#### `PUT /api/user/unfollow/:id`
- Purpose: Unfollow another user.
- Authentication: required
- Path params:
  - `id`: target user ID
- Success response:
  - `200 OK`
  - JSON:
    - `success: true`
    - `message: "User unfollowed successfully"`
- Error responses:
  - `400 Bad Request` when unfollowing yourself or not following the user
  - `404 Not Found` when target user is not found
  - `500 Internal Server Error`

---

## Common Response Structure

All successful responses return JSON with:
- `success`: boolean
- `message`: string
- optional data fields such as `user`, `post`, `posts`, or `profilePicture`

All failure responses return JSON with:
- `success`: false
- `message`: string

