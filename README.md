# Credit Card System Application

## Getting Started

### Setup Backend(NodeJS,ExpressJS)
```sh
# Install dependencies at root directory
npm install

# run application
npm run start

# run tests
npm run test
```

### Setup Frontend(React)
```sh
# switch to the frontend directory @ credit_card_app/frontend
cd ./frontend

# install dependencies
npm install

# run application(developement mode)
npm run start # Starts on port 3000

# create a production build
npm run build
```

## Backend Endpoints
*It runs on port 5555*
- POST /api/cards
```
{
    "name": "John Doe",
    "card_no": 123456789098765,
    "limit": 2000
}
```
- GET /api/cards


