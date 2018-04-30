const app = require('./app');
const env = require('dotenv').config();

app.listen(process.env.PORT || 3000, () => {
  console.log(`server run on ${process.env.PORT || 3000} port`);
});