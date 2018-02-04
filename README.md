# Email Service

## Intro

A simple HTTP REST api:
- Sends emails using multiple providers (Sendgrid & Mailgun)
- Provides failover if one of the provider fails

## Environment
- node 8
- npm 5

## Routes

| Path                         | Method |
| ---------------------------- | ------ |
| /email                       | POST   |
| /health-check                | GET    |

## Project Structure

```
├── src - service source files
|      ├── schemas - schema validators
|      ├── email - email routes and external provider services
├── test - (using mocha/shouldjs/nock)
       ├── integration
       ├── unit
```

## Quick Setup

1. Clone the repo
2. `npm i` to install node packages
3. Run `MAIL_GUN_API_KEY=<>` `SEND_GRID_API_KEY=<>` `npm start` to start the app
4. Run `npm test` to run specs
5. Run `npm run lint` to run es6 linter


## Config

1. App config is at `src/config.js`
2. Set Environment variables for mail provider api keys:
    * MAIL_GUN_API_KEY
    * SEND_GRID_API_KEY

## Sample Request

```
curl -X POST \
  http://localhost:3000/email \
  -d '{
  "to": ["john.doe@gmail.com"],
  "cc": ["john.doe@yahoo.com"],
  "subject": "test-email",
  "body": "test email content"
}'
```