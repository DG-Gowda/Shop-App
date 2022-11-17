// const path = require('path')

// const express = require('express');
// const bodyParser = require('body-parser');


// const errorController = require('./controllers/error')

// const app = express();

// app.set('view engine', 'ejs')
// app.set('views', 'views')

// const shopRoutes = require('./routes/shop')
// const adminRoutes = require('./routes/admin')

// app.use(bodyParser.urlencoded({extended:false}))
// app.use(express.static(path.join(__dirname, 'public')))

// app.use((req, res, next) => {
//   next();
// })
// app.use(shopRoutes)
// app.use('/admin', adminRoutes)

// app.use(errorController.get404)

// app.listen(3000, () => console.log("Server listening at http://localhost:3000"))





// const path = require('path')

// const express = require('express');
// const bodyParser = require('body-parser');

// const mongoose  = require('mongoose')
// const session = require('express-session')
// const MongoDBStore = require('connect-mongodb-session')(session)

// const errorController = require('./controllers/error')
// const User = require('./models/user')

// const MONGODB_URI = 'mongodb+srv://DG-Gowda:x0rs53ywxNeih5Gt@cluster0.07izxkv.mongodb.net/shop'
// const app = express();
// const store = new MongoDBStore({
//   uri: MONGODB_URI,
//   collection:'sesstion'
// })

// app.set('view engine', 'ejs')
// app.set('views', 'views')

// const shopRoutes = require('./routes/shop')
// const adminRoutes = require('./routes/admin')
// const authRoutes = require('./routes/auth')


// app.use(bodyParser.urlencoded({extended:false}))
// app.use(express.static(path.join(__dirname, 'public')))
// app.use(
//   session({ 
//     secret: 'my secret', 
//     cookie:{
//       maxAge: 1000 * 60 * 60 * 24 * 7   //week
//     },
//     resave: false, 
//     saveUninitialized:false,
//     store:store
//   })
// )

// app.use((req, res, next) =>{
//   if(!req.session.user) {
//     return next()
//   }

//   User.findById (req.session.user._id)
//   .then(user => {
//     req.user = user;
//     next ();
//   })
//   .catch(err => console.log(err))
// })

// // app.use((req, res, next) => {
// //   next();
// // })

// app.use('/admin', adminRoutes)
// app.use(shopRoutes)
// app.use(authRoutes)

// app.use(errorController.get404)



// mongoose.connect(MONGODB_URI)
// .then((result) => {

//   // User.findOne().then(user => {
//   //   if(!user) {
//   //     const user = new User({
//   //       name: 'DG',
//   //       email:'abc12@gmail.com',
//   //       cart: {
//   //         items: []
//   //       }
//   //     })
//   //     user.save()
//   //   }
//   // })
//   // console.log({result});
//   app.listen(3000, () => console.log("Server listening at http://localhost:3000"))
// }).catch((err) => {
//   console.log(err);
// });

// // app.listen(3000, () => console.log("Server listening at http://localhost:3000"))


// csurf

const path = require('path')

const express = require('express');
const bodyParser = require('body-parser');

const mongoose  = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const csrf = require('csurf')
const flash = require('connect-flash')

const errorController = require('./controllers/error')
const User = require('./models/user')

const MONGODB_URI = 'mongodb+srv://DG-Gowda:x0rs53ywxNeih5Gt@cluster0.07izxkv.mongodb.net/shop'
const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection:'sesstion'
})

const csrfProtection = csrf()
app.use(flash())

app.set('view engine', 'ejs')
app.set('views', 'views')

const shopRoutes = require('./routes/shop')
const adminRoutes = require('./routes/admin')
const authRoutes = require('./routes/auth')


app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  session({ 
    secret: 'my secret', 
    cookie:{
      maxAge: 1000 * 60 * 60 * 24 * 7   //week
    },
    resave: false, 
    saveUninitialized:false,
    store:store
  })
)

app.use(csrfProtection)

app.use((req, res, next) =>{
  if(!req.session.user) {
    return next()
  }

  User.findById (req.session.user._id)
  .then(user => {
    req.user = user;
    next ();
  })
  .catch(err => console.log(err))
})

app.use((req,res,next) => {
  res.locals.csrfToken = req.csrfToken();
  next()
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)
app.use(authRoutes)

app.use(errorController.get404)



mongoose.connect(MONGODB_URI)
.then((result) => {

  // User.findOne().then(user => {
  //   if(!user) {
  //     const user = new User({
  //       name: 'DG',
  //       email:'abc12@gmail.com',
  //       cart: {
  //         items: []
  //       }
  //     })
  //     user.save()
  //   }
  // })
  // console.log({result});
  app.listen(3000, () => console.log("Server listening at http://localhost:3000"))
}).catch((err) => {
  console.log(err);
});

// app.listen(3000, () => console.log("Server listening at http://localhost:3000"))