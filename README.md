# Scatch - E-Commerce Web App

Scatch is a full-stack e-commerce web application built with Node.js, Express, MongoDB, and EJS. It provides customer authentication, protected shopping pages, cart management, product listing, and an owner/admin product creation flow with image upload support.

The project follows a classic MVC-style Express structure where routes handle request mapping, controllers handle business logic, models define MongoDB collections, views render server-side pages, and utility modules keep shared logic separate.

## Features

- User registration and login with hashed passwords
- JWT-based authentication stored in browser cookies
- Protected routes for shop, cart, and user profile pages
- Flash messages for success and error feedback
- Product listing with product image, price, discount, and custom colors
- Add-to-cart functionality for authenticated users
- Cart page with grouped products and quantity display
- Increment and decrement cart item quantity using fetch requests
- User profile page with account and order sections
- Owner/admin product dashboard
- Product creation with image upload using Multer memory storage
- MongoDB database integration with Mongoose
- EJS templates with Tailwind CSS CDN and Remix Icon

## Tech Stack

| Category | Technology |
| --- | --- |
| Runtime | Node.js |
| Server | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Template Engine | EJS |
| Authentication | JSON Web Token, bcrypt |
| Session/Flash | express-session, connect-flash |
| File Upload | Multer |
| Styling | Tailwind CSS CDN, custom CSS |
| Icons | Remix Icon |
| Development | Nodemon |

## Folder Structure

```text
Scratch_The_E-Commerce App/
|-- app.js
|-- package.json
|-- package-lock.json
|-- config/
|   |-- development.json
|   |-- keys.js
|   |-- mongoose-connection.js
|   `-- multer-config.js
|-- controller/
|   |-- authController.js
|   `-- productController.js
|-- middlewares/
|   `-- isloggedIn.js
|-- models/
|   |-- owners-model.js
|   |-- product-model.js
|   `-- user-model.js
|-- public/
|   |-- css/
|   |   `-- style.css
|   |-- image/
|   `-- js/
|       `-- script.js
|-- routes/
|   |-- index.js
|   |-- ownersRouter.js
|   |-- productsRouter.js
|   `-- usersRouter.js
|-- utils/
|   |-- cartCount.js
|   |-- generated-token.js
|   `-- groupCarts.js
`-- views/
    |-- admin.ejs
    |-- cart.ejs
    |-- createproducts.ejs
    |-- index.ejs
    |-- owner-login.ejs
    |-- shop.ejs
    |-- users-profile.ejs
    `-- partials/
        |-- footer.ejs
        `-- header.ejs
```

## Project Architecture

### `app.js`

The main entry point of the application. It configures Express, EJS, static assets, body parsers, sessions, flash messages, database connection, and route mounting.

### `config/`

Contains application configuration files:

- `mongoose-connection.js` connects the app to MongoDB.
- `multer-config.js` configures Multer with memory storage for product images.
- `development.json` stores the development MongoDB URI used by the `config` package.
- `keys.js` is intended for environment-based secret configuration.

### `models/`

Defines Mongoose schemas:

- `user-model.js` stores users, password hashes, cart items, orders, contact details, and profile picture data.
- `product-model.js` stores product details, image buffer, price, discount, and UI color values.
- `owners-model.js` stores owner/admin account details.

### `controller/`

Contains route controller logic:

- `authController.js` handles user registration, password hashing, login, JWT generation, and cookie creation.
- `productController.js` handles product creation and image upload persistence.

### `routes/`

Defines HTTP routes:

- `/` renders login/register, shop, cart, logout, and cart update routes.
- `/users` handles user registration, login, and profile.
- `/products` handles admin product listing and product creation.
- `/owners` handles owner/admin related pages and owner creation in development mode.

### `middlewares/`

Contains authentication middleware:

- `isloggedIn.js` validates the JWT cookie and attaches the logged-in user to `req.user`.

### `utils/`

Contains reusable helper functions:

- `generated-token.js` signs JWT tokens.
- `groupCarts.js` groups duplicate cart products and adds quantity counts.
- `cartCount.js` returns the current cart item count.

### `views/`

Contains EJS templates for customer pages, cart, profile, admin dashboard, product creation, and shared header/footer partials.

### `public/`

Contains static assets such as CSS, frontend JavaScript, and images.

## Environment Variables

Create a `.env` file in the project root:

```env
JWT_KEY=replace_with_a_strong_jwt_secret
EXPRESS_SESSION_SECRET=replace_with_a_strong_session_secret
MONGODB_URI=mongodb://127.0.0.1:27017
```

### Variable Details

| Variable | Required | Description |
| --- | --- | --- |
| `JWT_KEY` | Yes | Secret key used to sign and verify JWT authentication tokens. |
| `EXPRESS_SESSION_SECRET` | Yes | Secret used by `express-session` to sign session cookies. |
| `MONGODB_URI` | Yes | MongoDB connection URI. The app connects to the `scatch` database using this base URI. |

> Keep `.env` private. It is already listed in `.gitignore`, so it should not be committed to Git.

## Installation

1. Clone the repository.

```bash
git clone <repository-url>
cd "Scratch_The_E-Commerce App"
```

2. Install dependencies.

```bash
npm install
```

3. Create the `.env` file using the example above.

4. Make sure MongoDB is running locally.

```bash
mongod
```

5. Start the development server.

```bash
npm start
```

6. Open the application in your browser.

```text
http://localhost:3000
```

## Available Scripts

| Script | Description |
| --- | --- |
| `npm start` | Starts the app with Nodemon on port `3000`. |
| `npm test` | Placeholder test script. No automated tests are configured yet. |

## Main Routes

| Method | Route | Description | Auth |
| --- | --- | --- | --- |
| `GET` | `/` | Render user registration and login page | Public |
| `POST` | `/users/register` | Register a new user | Public |
| `POST` | `/users/login` | Login existing user | Public |
| `GET` | `/shop` | Show product shop page | User |
| `GET` | `/addToCart/:id` | Add product to cart | User |
| `GET` | `/cart` | Show cart page | User |
| `POST` | `/increment/:id` | Increase cart item quantity | User |
| `POST` | `/decrement/:id` | Decrease cart item quantity | User |
| `GET` | `/users/profile` | Show user profile page | User |
| `GET` | `/logout` | Clear auth cookie and logout | User |
| `GET` | `/owners` | Render owner login page | Public |
| `POST` | `/owners/create` | Create owner account in development mode | Development |
| `GET` | `/owners/admin` | Render product creation page | Owner/Admin |
| `GET` | `/products` | Show admin product list | Owner/Admin |
| `POST` | `/products/create` | Create product with uploaded image | Owner/Admin |

## Database Collections

### User

Stores customer account information:

- `fullname`
- `email`
- `password`
- `cart`
- `orders`
- `contact`
- `picture`

### Product

Stores product information:

- `image`
- `name`
- `price`
- `discount`
- `bgcolor`
- `panelcolor`
- `textcolor`

### Owner

Stores owner/admin information:

- `fullname`
- `email`
- `password`
- `products`
- `picture`
- `gstin`

## Notes for Development

- The app runs on port `3000`.
- Product images are uploaded using Multer memory storage and saved in MongoDB as buffers.
- Owner creation is only enabled when `NODE_ENV` is set to `development`.
- The MongoDB connection appends `/scatch` to the configured `MONGODB_URI`.
- Tailwind CSS and Remix Icon are loaded through CDN links in `views/partials/header.ejs`.

## Future Improvements

- Add owner login authentication and protect owner/admin routes.
- Add product edit and delete functionality.
- Add checkout and order placement flow.
- Add server-side validation for forms.
- Add automated tests for auth, product, and cart routes.
- Move cart quantity into a more explicit cart item schema.
- Improve error handling and API responses.
- Add production-ready session storage.

## Author

Shivam Gupta
