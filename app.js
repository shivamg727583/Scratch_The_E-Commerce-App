const express = require('express');
const app = express();
const path=require('path');

require("dotenv").config();

const db = require('./config/mongoose-connection');

const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const indexRouter = require('./routes/index');

const expressSession=require('express-session');
const flash = require('connect-flash');





app.set('view engine','ejs');
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));

app.use(expressSession({
  resave:false,
  saveUninitialized:false,
  secret:process.env.EXPRESS_SESSION_SECRET,
}))
app.use(flash())

app.use('/owners',ownersRouter);
app.use('/products',productsRouter);
app.use('/users',usersRouter);
app.use('/',indexRouter);

app.get('/', function (req, res) {
  res.send('Hello World');
});





app.listen(3000,function(){
console.log('server is running on port 3000');
});