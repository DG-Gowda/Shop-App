// // const Product = require('../models/product')
// // const Cart = require('../models/cart')

// // exports.getProducts = (req, res, next) => {
// //     Product.fetchAll((products) => {
// //         res.render('shop/product-list', {
// //             prods: products,
// //             pageTitle: 'All Products',
// //             path: '/products'
// //         })
// //     });
// // }

// // exports.getProduct = (req, res, next) => {
// //     const prodId = req.params.productId;
// //     Product.findById(prodId, product => {
// //         res.render('shop/product-detail', {
// //             product: product,
// //             pageTitle: product.title,
// //             path: '/products'
// //         })
// //     })
// // }

// // exports.getIndex = (req, res, next) => {
// //     Product.fetchAll((products) => {
// //         res.render('shop/index', {
// //             prods: products,
// //             pageTitle: 'Shop',
// //             path: '/'
// //         })
// //     });
// // }

// // exports.getCart = (req, res, next) => {
// //     Cart.getCart(cart => {
// //         Product.fetchAll(products => {
// //             const cartProducts = [];
// //             for(product of products) {
// //                 const cartProductData = cart.products.find(
// //                     prod => prod.id === product.id
// //                 )
// //                 if(cartProductData) {
// //                     cartProducts.push({ productData: product,qty:cartProductData.qty })
// //                 }
// //             }
// //             console.log({cart});
// //             console.log(cartProducts)
// //             res.render('shop/cart',{
// //                 path: '/cart',
// //                 pageTitle:'Your Cart',
// //                 products: cartProducts,
// //                 totalPrice: cart.totalPrice
// //             });
// //         })
// //     })
// //     //   res.render('shop/cart', {
// //     //         pageTitle: 'Your Cart',
// //     //         path: '/cart'  
// // }

// // exports.postCart = (req, res, next) => {
// //     const prodId = req.body.productId;
// //     Product.findById(prodId, product => {
// //        Cart.addProduct(prodId, product.price) 
// //     })
// //     res.redirect('/cart')
// // }

// // exports.postCartDeleteProduct = (req,res,next) =>{
// //     const prodId = req.body.productId;
// //     Product.findById(prodId,product => {
// //         Cart.deleteProduct(prodId,product.Price);
// //         res.redirect('/cart')
// //     })
// // }

// // exports.getOrders = (req, res, next) => {
// //     res.render('/shop/prders', {
// //         pageTitle: 'Your orders',
// //         path: '/orders'
// //     })
// // }

// // exports.getCheckout = (req, res, next) => {
// //     res.render('shop/checkout', {
// //         pageTitle: 'Checkout',
// //         path: '/checkout'
// //     })
// // }



// // mogodb




// const Product = require('../models/product')
// const Cart = require('../models/cart');
// const product = require('../models/product');

// exports.getProducts = (req, res, next) => {
//     product.find()
//     .then(products => {
//         console.log({products});
//         res.render('shop/product-list', {
//             prods: products,
//             pageTitle: 'All Products',
//             path: '/products'
//         })
//     })
//     .catch(err =>{
//         console.log(err)
//     })
// }

// exports.getProduct = (req, res, next) => {
//     const prodId = req.params.productId;

//     product.findById(prodId)
//     .then(product => {
//         console.log({product});
//         res.render('shop/product-detail', {
//             product: product,
//             pageTitle: product.title,
//             path: '/products'
//         })
//     })
//     .catch(err =>{
//         console.log(err)
//     })
// }

// exports.getIndex = (req, res, next) => {
//     product.find()
//         .then(products =>{
//             res.render('shop/index', {
//                 prods: products,
//                 pageTitle: 'Shop',
//                 path: '/'
//             })
//         })
//         .catch(err => {
//             console.log(err);
//         })
// }
// exports.getCart = (req, res, next) => {
//     req.user.getCart()
//         .then(products => {
//             res.render('/shop/cart',{
//                 path: '/cart',
//                 pageTitle:'Your Cart',
//                 products: products,
//         })
//     // Cart.getCart(cart => {
//     //     Product.fetchAll(products => {
//     //         const cartProducts = [];
//     //         for(product of products) {
//     //             const cartProductData = cart.products.find(
//     //                 prod => prod.id === product.id
//     //             )
//     //             if(cartProductData) {
//     //                 cartProducts.push({ productData: product,qty:cartProductData.qty })
//     //             }
//     //         }
//     //         console.log({cart});
//     //         console.log(cartProducts)
//     //         res.render('shop/cart',{
//     //             path: '/cart',
//     //             pageTitle:'Your Cart',
//     //             products: cartProducts,
//     //             totalPrice: cart.totalPrice
//     })
// }
//     //   res.render('shop/cart', {
//     //         pageTitle: 'Your Cart',
//     //         path: '/cart'  
// // }

// exports.postCart = (req, res, next) => {
//     const prodId = req.body.productId;
//     product.findById(prodId)
//         .then(product => {
//             return req.user.addToCart(product)
//         })
//         .then(result => {
//             console.log(result)
//             res.redirect('/cart')
//         })
//         .catch(err => console.log(err))
// }
//     // Product.findById(prodId, product => {
//     //    Cart.addProduct(prodId, product.price) 
//     // })
//     // res.redirect('/cart')


// exports.postCartDeleteProduct = (req,res,next) =>{
//     const prodId = req.body.productId;

//     req.user
//         .deleteItemFromCart(prodId)
//         .then(result => {
//             res.redirect('/cart')
//         })
//         .catch(err => console.log(err))
//     // Product.findById(prodId,product => {
//     //     Cart.deleteProduct(prodId,product.Price);
//     //     res.redirect('/cart')
//     // })
// }

// exports.getOrders = (req, res, next) => {
//     res.render('/shop/prders', {
//         pageTitle: 'Your orders',
//         path: '/orders'
//     })
// }

// exports.getCheckout = (req, res, next) => {
//     res.render('shop/checkout', {
//         pageTitle: 'Checkout',
//         path: '/checkout'
//     })
// }




const Product = require('../models/product')
const Order = require('../models/order')

exports.getProducts = (req, res, next) => {
   Product.find()
    .then(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
            isAuthenticated: req.session.isLoggedIn

        })
    })
    .catch(err => {
        console.log(err)
    })
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;

    Product.findById(prodId)
        .then(product => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products',
                isAuthenticated: req.session.isLoggedIn

            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getIndex = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/',
                isAuthenticated: req.session.isLoggedIn

            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getCart = (req, res, next) => {
    // console.log(req.user);
    if(!req.session.isLoggedIn) {
        res.render('shop/cart' , {
            path:'/cart',
            pageTitle:'Your Cart',
            product:[],
            isAuthenticated:req.session.isLoggedIn
        })
    }
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            // console.log({user})
            const products = user.cart.items;
            // console.log({products});
            // console.log(products[0].productId);
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products,
                isAuthenticated: req.session.isLoggedIn

            })
        })
        .catch(err => console.log(err))
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product)
        })
        .then(result => {
            console.log(result)
            res.redirect('/cart')
        })
        .catch(err => console.log(err))
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    
    req.user
        .removeFromCart(prodId)
        .then(result => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err))
}

exports.postOrder = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items.map(i => {
                return { quantity: i.quantity, product: { ...i.productId._doc } }
            })
            const order = new Order({
                user: {
                    // name: req.user.name,
                    email: req.user.email,
                    userId: req.user
                },
                products: products
            })
            return order.save()
        })
        .then(result => {
            return req.user.clearCart()
        })
        .then(() => {
            res.redirect('/orders')
        })
        .catch(err => console.log(err))
}

exports.getOrders = (req, res, next) => {
    Order.find({ 'user.userId': req.user._id })
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders,
                isAuthenticated: req.session.isLoggedIn

            })
        })
        .catch(err => console.log(err))
}

// exports.getCheckout = (req, res, next) => {
//     res.render('shop/checkout', {
//         pageTitle: 'Checkout',
//         path: '/checkout'
//     })
// }