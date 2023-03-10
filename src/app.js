const express = require('express');
const userRouter = require('./router/user.route');

// ...

const app = express();

// não remova ou mova esse endpoint 
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use('/users', userRouter);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
