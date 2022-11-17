// const express = require('express')
// const path = require('path')

// const adminController = require('../controllers/admin')

// const router = express.Router();

// router.get('/add-product', adminController.getAddProduct)

// router.get('/products', adminController.getProducts)

// router.post('/add-product', adminController.postAddProduct)

// router.get('/edit-product/:productId', adminController.getEditProduct)

// router.post('/edit-product', adminController.postEditProduct)

// module.exports = router;



// const express = require('express')
// const path = require('path')

// const adminController = require('../controllers/admin')

// const router = express.Router();

// router.get('/add-product', adminController.getAddProduct)

// router.get('/products', adminController.getProducts)

// router.post('/add-product', adminController.postAddProduct)

// router.get('/edit-product/:productId', adminController.getEditProduct)

// router.post('/edit-product', adminController.postEditProduct)

// router.post('/delete-product', adminController.postDeleteProduct)

// module.exports = router;






// mogo db

const express = require('express')
const path = require('path')

const adminController = require('../controllers/admin')
const isAuth = require('../middleware/is-auth')

const router = express.Router();

router.get('/add-product', isAuth, adminController.getAddProduct)

router.get('/products',isAuth, adminController.getProducts)

router.post('/add-product',isAuth, adminController.postAddProduct)

router.get('/edit-product/:productId',isAuth, adminController.getEditProduct)

router.post('/edit-product',isAuth, adminController.postEditProduct)

router.post('/delete-product',isAuth, adminController.postDeleteProduct)

module.exports = router;