// const Product = require('../models/product')

// exports.getAddProduct = (req, res, next) => {
//   res.render('admin/edit-product', {
//     pageTitle: 'Add Product',
//     path: '/admin/add-product',
//     editing: false
//   })
// }

// exports.postAddProduct = (req, res, next) => {
//   const title = req.body.title;
//   const imageUrl = req.body.imageUrl;
//   const price = req.body.price;
//   const description = req.body.description;
//   const product = new Product( null,title, imageUrl, price, description);
//   product.save();
//   res.redirect('/')
// }

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if(!editMode) {
//     return res.redirect('/')
//   }
//   const prodId = req.params.productId;

//   Product.findById(prodId, product => {
//     if(!product) {
//       return res.redirect('/')
//     }

//     res.render('admin/edit-product', {
//       pageTitle: 'Edit Product',
//       path: '/admin/edit-product',
//       editing: editMode,
//       product: product
//     })
//   })
// }

// exports.postEditProduct = (req,res,next) => {
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedDesc = req.body.description;
//   const updatedPrice = req.body.price;


//   const updatedProduct = new Product(
//     prodId,
//     updatedTitle,
//     updatedImageUrl,
//     updatedDesc,
//     updatedPrice,
//   )
//   console.log(updatedProduct);
//   updatedProduct.save();
//   res.redirect('/admin/products')
// }

// exports.getProducts = (req, res, next) => {
//     Product.fetchAll((products) => {
//         res.render('admin/products', {
//             prods: products,
//             pageTitle: 'Admin Products',
//             path: '/admin/products'
//         })
//     });
// }





// const Product = require('../models/product')

// exports.getAddProduct = (req, res, next) => {
//   res.render('admin/edit-product', {
//     pageTitle: 'Add Product',
//     path: '/admin/add-product',
//     editing: false
//   })
// }

// exports.postAddProduct = (req, res, next) => {
//   const title = req.body.title;
//   const imageUrl = req.body.imageUrl;
//   const price = req.body.price;
//   const description = req.body.description;
//   const product = new Product(null, title, imageUrl, description, price);
//   product.save();
//   res.redirect('/')
// }

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if(!editMode) {
//     return res.redirect('/')
//   }
//   const prodId = req.params.productId;

//   Product.findById(prodId, product => {
//     if(!product) {
//       return res.redirect('/')
//     }

//     res.render('admin/edit-product', {
//       pageTitle: 'Edit Product',
//       path: '/admin/edit-product',
//       editing: editMode,
//       product: product
//     })
//   })
// }

// exports.postEditProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedPrice = req.body.price;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedDesc = req.body.description;

//   const updatedProduct = new Product(
//     prodId,
//     updatedTitle,
//     updatedImageUrl,
//     updatedDesc,
//     updatedPrice
//   )
//     console.log(updatedProduct)
//   updatedProduct.save();
//   res.redirect('/admin/products')
// }

// exports.getProducts = (req, res, next) => {
//     Product.fetchAll((products) => {
//         res.render('admin/products', {
//             prods: products,
//             pageTitle: 'Admin Products',
//             path: '/admin/products'
//         })
//     });
// }

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.deleteById(prodId)
//   res.redirect('/admin/products')
// }




// mongodb






const product = require('../models/product');
const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  })
}

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product( {
    title, price, description, 
    imageUrl,
    userId: req.user
  });
  product.save()
  .then(result => {
    console.log("new product created")
    res.redirect('/admin/products')
  })
  .catch(err => {
    console.log(err)
  })
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode) {
    return res.redirect('/')
  }
  const prodId = req.params.productId;

  Product.findById(prodId)
  .then(product =>{
    console.log(product);
    if(!product) {
      return res.redirect('/')
    }

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product,
      isAuthenticated: req.session.isLoggedIn
    })
  })
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  product.findById(prodId)
  .then (product => {
    product.title = updatedTitle;
    product.price = updatedPrice; 
    product.description = updatedDesc; 
    product.imageUrl = updatedImageUrl; 
    return product.save();
  })
  .then(result => {
    console.log("product updated");
    res.redirect('/admin/product')
  })
  .catch (err => {
    console.log(err)
  })
}

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products =>{
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
            isAuthenticated: req.session.isLoggedIn
        })
    })
    .catch(err => {
      console.log(err)
    })

}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findByIdAndRemove(prodId)
  .then(() => {
    console.log('product deleted')
  res.redirect('/admin/products')
  })
  .catch(err => {
    console.log(err)
  })
}