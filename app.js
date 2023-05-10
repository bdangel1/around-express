const { PORT = 3000 } = process.env;
const express = require("express");
const app = express();
const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");

// use
app.use("/users", userRouter);
app.use("/cards", cardRouter);

// listeners
app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
  console.log(`App listening at port ${PORT}`);
});
