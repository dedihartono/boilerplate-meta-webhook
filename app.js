const express = require('express')
const app = express()

const token = process.env.TOKEN

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Meta Webhook API',
    status: 'active',
    endpoints: {
      webhook: '/webhooks'
    }
  });
});

app.get('/webhooks',  (req, res) => {
 if (
   req.query['hub.mode'] == 'subscribe' &&
   req.query['hub.verify_token'] == token
 ) {
   res.send(req.query['hub.challenge']);
 } else {
   res.sendStatus(400);
 }
})

// For Vercel deployment
module.exports = app;