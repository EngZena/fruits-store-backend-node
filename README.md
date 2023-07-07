### FruitsStoreBackend

---

This is the customer relationship manager website created for technical proof of some concepts using Node and Mongoose.

### Used libraries

---

- Development purposes

  - [mongoose](https://www.npmjs.com/package/mongoose)
  - [nodemon](https://www.npmjs.com/package/nodemon)
  - [dotenv](https://www.npmjs.com/package/dotenv)
  - [eslint](https://eslint.org/)
  - [prettier](https://prettier.io/)
  - [morgan](https://www.npmjs.com/package/morgan)

- Authorization purposes

  - [bcryptjs](https://www.npmjs.com/package/bcryptjs)
  - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

- Security purposes

  - [cors](https://www.npmjs.com/package/cors)
  - [helmet](https://www.npmjs.com/package/helmet)
  - [xss](https://www.npmjs.com/package/xss)

- Email purposes
  - [nodemailer](https://www.npmjs.com/package/nodemailer)
  - [html-to-text](https://www.npmjs.com/package/html-to-text)

### Content of this project:

---

- Setup ESLINT with prettier.
- Authorization API's:
  - Signup.
  - Login.
  - Logout.
- Fruits API's:
  - Rest API: (POST, PATCH, GET, DELETE)
    - POST: this API is protected
    - PATCH: this API is protected
    - DELETE: this API is protected
    - GET
- Generic API handler
- Generic error handler
- Emails
  - Emails with HTML template like sign-up email.
  - Emails with HTML template containing database values, like forgot password emails.

## Development server

---

Run `npm start` for a dev server.
