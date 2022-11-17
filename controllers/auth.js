// // exports.getLogin = (req,res,next) => {

// // const user = require("../models/user");
// // const User = require("../models/user");

// //     // const isLoggedIn = req
// //     //     ?.get('cookie')
// //     //     ?.split(';')[1]
// //     //     ?.trim()
// //     //     ?.split('=')[1]
// //     console.log(req.session.isLoggedIn)
// //     res.render('auth/login',{
// //         path: '/login',
// //         pageTitle: 'Login',
// //         isAuthenticated: false
// //     })
// // }

// // exports.postLogin = (req,res,next) => {
// //     // res.setHeader("set-cookie", 'loggedIn=True')
// //     req.session.isLoggedIn = true;
// //     res.redirect('/')
// // };

// // const User = require('../models/user');

// // exports.getLogin = (req,res,next) => {
// //     console.log(req.session.isLoggedIn)
// //     res.render('auth/login',{
// //         path: '/login',
// //         pageTitle: 'Login',
// //         isAuthenticated: false
// //     })
// // }
// // exports.getSignup= (req,res,next) => {
// //     res.render('auth/signup',{
// //         path: '/signup',
// //         pageTitle: 'Signup',
// //         isAuthenticated: false
// //     })
// // }

// // exports.postLogin = (req,res,next) => {
// //     User.findById('63414e658e6d611938fc9def')
// //     .then(user => {
// //         req.session.isLoggedIn = true
// //         req.session.user = user
// //         req.session.save(err => {
// //             console.log(err)
// //             res.redirect('/')
// //         })
// //     })
// // };
// // exports.postSignup = (req,res,next) => {
// //     const email = req.body.email;
// //     const password = req.body.password;
// //     const conformpassword = req.body.conformpassword;

// //     User.findOne({ email: email})
// //         .then(userDoc => {
// //             if (userDoc) {
// //                 return res.redirect('/signup')
// //             }

// //             return bcrypt
// //                 .hash(password, 12)
// //                 .then(hashPassword =>{
// //                     const user = new User({
// //                         email: email,
// //                         password: password,
// //                         cart: { items:[]}
// //                 })
// //                 return user.save()
// //             })
// //             .then (result => {
// //                 res.redirect('/login')
// //             })
// //         })
// //         .catch(err => {
// //             console.log(err)
// //         })
// // }

// // exports.postLogout = (req, res, next) => {
// //     req.session.destroy(err => {
// //         console.log(err)
// //         res.redirect('/')
// //     })
// // }

// const crypto = require('crypto')
// const bcrypt = require("bcryptjs");
// const nodemailer = require('nodemailer');
// const sendGridTransport = require('nodemailer-sendgrid-transport');

// const User = require("../models/user");
// const { log } = require('console');
// // const flash = require('connect-flash');

// const transporter = nodemailer.createTransport(
//   sendGridTransport({
//     auth: {
//       api_key: "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",
//     },
//   })
// )

// exports.getLogin = (req, res, next) => {
//   res.render("auth/login", {
//     path: "/login",
//     pageTitle: "Login",
//     isAuthenticated: false,
//     // errorMessage: message,
//     errorMessage: req.flash('error')
//   })
// };
// exports.getSignup = (req, res, next) => {
//   res.render("auth/signup", {
//     path: "/signup",
//     pageTitle: "Signup",
//     isAuthenticated: false,
//   });
// };

// exports.postLogin = (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   User.findOne({ email: email })
//     .then((user) => {
//       if (!user) {
//         // req.flash('error','Invalid email or password')
//         req.flash("error", "Invalid email");
//         req.flash("error", "Invalid Password");
//         return res.redirect("/login");
//       }

//       bcrypt
//         .compare(password, user.password)
//         .then((doMatch) => {
//           if (doMatch) {
//             req.session.isLoggedIn = true;
//             req.session.user = user;

//             return req.session.save((err) => {
//               console.log(err);
//               res.redirect("/");
//             });
//           }
//           req.flash("error", "Invalid email");
//           // req.flash("error", "Invalid Password");          
//           res.redirect("/login");
//         })
//         .catch((err) => {
//           console.log(err);
//           res.redirect("/login");
//         });
//     })
//     .catch((err) => console.log(err));
// };

// exports.postSignup = (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   const conformPassword = req.body.conformPassword;

//   User.findOne({ email: email })
//     .then((userDoc) => {
//       if (userDoc) {
//         return res.redirect("/signup");
//       }

//       return bcrypt
//         .hash(password, 12)
//         .then((hashPassword) => {
//           const user = new User({
//             email: email,
//             password: hashPassword,
//             cart: { items: [] },
//           });
//           return user.save();
//         })
//         .then((result) => {
//           res.redirect("/login");
//           return transporter.sendmail({
//             to: email,
//             from:'dhanushggowda008@gmail.com',
//             html: '<h1>You successfully signedup!</h1>'
//           });
//         })
//         .catch((err) => console.log(err))
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// exports.postLogout = (req, res, next) => {
//   req.session.destroy((err) => {
//     console.log(err);
//     res.redirect("/");
//   });
// };

// exports.getReset = (req, res, next) => {
//   res.render('auth/reset',{
//     path: '/reset',
//     pageTitle: 'Reset Passward',
//     errorMessage: req.flash('error'),
//     isAuthenticated: false
//   })
// };

// exports.postReset = (req, res, next) => {
//   crypto.randomBytes(32,(err,buffer) => {
//     if(err) {
//       console.log(err)
//       return res.redirect('/reset')
//     }
//     const token = buffer.toString('hex')
//     console.log({token});

//     User.findOne({email: req.body.email})
//     .then(user =>{
//       if(!user) {
//         req.flash('error', 'no account found with that email')
//         return res.redirect('/reset')
//       }
//       user.resetToken = token;
//       user.resetTokenExpiration = Date.now() + 3600000;
//       return user.save();
//     })
//     .then((result) => {
//       const html = `
//         <p>Click on the link to reset password</p>
//         <a href="http://localhost:3000/reset/${token}">link</a>
//       `;
//       console.log({html})
//       transporter.sendMail({
//         to: req.body.email,
//         from: 'dhanushggowda008@gmail.com',
//         subject: ' Password reset',
//         html: html
      
//     })
//   })
//   .catch(err =>{
//     console.log(err)
//   })
// })
// }

// exports.getNewPassword = (req, res, next) =>{
//   const token = req.parms.token;

//   User.findOne({
//     resetToken: token,
//     resetTokenExpiration: { $gt: date.now() },
//   })
//     .then((user) => {
//       res.render('auth/new-password', {
//         path:'/new-password',
//         pageTitle:'New Password',
//         errorMessage: req.flash('error'),
//         userId: user._id.toString(),
//         passwordToken: token,
//         isAuthenticated: false
//       })
//     })
//     .catch(err => console.log(err))
// }

// exports.postNewPassword = (req,res,next) =>{
//   const newPassword = req.body.password;
//   const userId= req.body.userId;
//   const passwordToken =req.body.passwordToken;

//   let resetUser;

//   User.findOne({
//     resetToken:passwordToken,
//     resetTokenExpiration: { $gt: Date.now() },
//     _id:userId,
//   })
//     .then((user) => {
//       resetUser = user
//       return bcrypt.hash(newPassword, 12)
//     })
//     .then((hashedPassword) =>{
//       resetUser.password = hashedPassword;
//       resetUser.resetToken = undefined;
//       resetUser.resetTokenExpiration = undefined;
//       return resetUser.save()
//     })
//     .then(result => {
//       res.redirect('/login');
//     })
//     .catch(err =>{
//       console.log(err);
//     })
// }





const crypto = require("crypto");

const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

const User = require("../models/user");

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "login",
    pageTitle: "Login",
    isAuthenticated: false,
    errorMessage: req.flash("error"),
    // errorMessage: message
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  //  User.findById("633bda8f3203323f504e7f48");
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        // req.flash("error", "Invalid email and password")
        req.flash("error", "Invalid email");
        req.flash("error", "Invalid Password");
        return res.redirect("/login");
      }

      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;

            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          }
          req.flash("error","Invalid Password" )
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log(err);
    });
  // .then((user) => {
  //   req.session.isLoggedIn = true;
  //   req.session.user = user;
  //   req.session.save((err) => {
  //     console.log(err);
  //     res.redirect("/");
  //   });
  // });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({
    email: email,
  })
    .then((userDoc) => {
      if (userDoc) {
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hasedPassword) => {
          const user = new User({
            email: email,
            password: hasedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          res.redirect("/login");
          return transporter.sendMail({
            to: email,
            from: "vskblogger00@gmail.com",
            subject: "Signup succeeded!",
            html: "<h1>You successfully signed up!</h1>",
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

exports.getReset = (req, res, next) => {
  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset Password",
    errorMessage: req.flash("error"),
    isAuthenticated: false,
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    console.log({ token });

    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          req.flash("error", "No account found with that email");
          return res.redirect("/reset");
        }

        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 36000000;
        return user.save();
      })

      .then((result) => {
        const html = `
            <p>You requested a password reset</p>
            <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
          `;
        console.log({ html });
        transporter.sendMail({
          to: req.body.email,
          from: "vskblogger00@gmail.com",
          subject: "Password reset",
          html: html,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.getNewPassword = (req, res, next) => {
   const token = req.params.token;
   User.findOne({
     resetToken: token,
     resetTokenExpiration: { $gt: Date.now() },
   })
     .then((user) => {
       res.render("auth/new-password", {
         path: "/new-password",
         pageTitle: "New Password",
         errorMessage: req.flash("error"),
         userId: user._id.toString(),
         passwordToken: token,
         isAuthenticated: false
       });
     })
     .catch((err) => {
       console.log(err);
     });
};

exports.postNewPassword = (req, res, next) => {
   const newPassword = req.body.password;
   const userId = req.body.userId;
   const passwordToken = req.body.passwordToken;

   
   let resetUser;

   User.findOne({
     resetToken: passwordToken,
     resetTokenExpiration: { $gt: Date.now() },
     _id: userId,
   })
     .then((user) => {
       resetUser = user;
       return bcrypt.hash(newPassword, 12);
     })
     .then((hashedPassword) => {
       resetUser.password = hashedPassword;
       resetUser.resetToken = undefined;
       resetUser.resetTokenExpiration = undefined;
       return resetUser.save();
     })
     .then((result) => {
       res.redirect("/login");
     })
     .catch((err) => {
       console.log(err);
     });
};