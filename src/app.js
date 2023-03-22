const express = require('express');
const userRouter = require('./router/user.route');
const loginRouter = require('./router/login.route');
const categoryRouter = require('./router/category.route');
const postRouter = require('./router/post.route');

// ...

const app = express();

// não remova ou mova esse endpoint 
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use('/categories', categoryRouter);
app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/post', postRouter);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
