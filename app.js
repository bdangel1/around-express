const { PORT = 3000 } = process.env;
const express = require('express');
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/aroundb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    createIndexes: true, // Updated option
  })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start your application
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

const app = express();
const userRouter = require('./routes/userRoute');
const cardRouter = require('./routes/cardsRoute');

// use
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use((req, res, next) => {
  req.user = {
    _id: 'dbfe53c3c4d568240378b0c6', // paste the _id of the test user created in the previous step
  };

  next();
});
app.use((req, res) => {
  res.status(404).send({ message: 'The requested resource was not found' });
});

// listeners
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
