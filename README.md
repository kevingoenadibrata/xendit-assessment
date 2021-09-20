# Xenelectronic

## Prerequisite

    * npm
    * node

## How to Build and Run Locally

_Backend_

```
cd backend
npm install
npm run serve
```

_Frontend_

```
cd frontend
npm install
npm start
```

It should open up `localhost:3000` in your default browser

## How to run tests

```
cd backend
npm run test
```

## About the project

Xenelectronic consists of four main layers: 1. Frontend: Built with react SPA 2. Backend Server: NodeJS and ExpressJS for web routing, Mocha and Testdouble for testing 3. Database: Firestore by Firebase 4. File Storage: Google Storage

As a user, from the web page, you should be able to add items to cart, view items in the cart, and checkout. At this stage, the checkout mechanism is mocked by storing the transaction to the database without actual payment.
