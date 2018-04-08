const app = require('./app');

app.listen(process.env.PORT || 3000, () => {
  console.log(`server run on ${process.env.PORT || 3000} port`);
});