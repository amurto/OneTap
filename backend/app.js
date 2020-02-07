const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const usersRoutes = require('./routes/users-routes');
const schoolsRoutes = require('./routes/schools-routes');
const facilitatorsRoutes = require('./routes/facilitators-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')

  next();
});

app.use('/api/facilitators', facilitatorsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/schools', schoolsRoutes);


app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

mongoose
  .connect('mongodb+srv://XXXXXX:XXXX@tsec-nie5s.mongodb.net/test?retryWrites=true&w=majority',
    { 
      useCreateIndex: true,
      useNewUrlParser: true, 
      useUnifiedTopology: true
    },
  )
  .then(() => {
    app.listen(5000);
    console.log("Server connected");
  })
  .catch(err => {
    console.log(err);
});