require('dotenv').config();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Product = mongoose.model('Product');
const Category = mongoose.model('Category');
const bcrypt = require("bcrypt");
const Helper = require('./Helper');

module.exports = {
    CreateCategory: async (req, res) => {
        try {
            let { parentId, name, image } = req.body;
            let categoryData = {};
            if (parentId) {
                categoryData['parentId'] = mongoose.Types.ObjectId(parentId);
            } else {
                categoryData['isParent'] = true;
            }
            if (name) { categoryData['name'] = name; }
            if (image) { categoryData['image'] = image; }
            let category = new Category(categoryData);
            category.save()
                .then(function (data) {
                    return res.send({
                        status: true,
                        message: 'category is created',
                        response: data,
                    });
                })

        } catch (error) {
            console.log(error);
            return next(error);
        }
    },
    getCategories: async (req, res) => {
        try {
            let parentId = req.query.parentId;
            let findquery = {};
            if (parentId) {
                findquery['parentId'] = mongoose.Types.ObjectId(parentId);
            } else {
                findquery['isParent'] = true;
            }
            let category = await Category.find(findquery).exec();
            return res.send({
                status: true,
                message: 'category Data',
                response: category,
            });
        } catch (error) {
            console.log(error);
            return next(error);
        }
    },
    createProduct: async (req, res, next) => {
        try {
            let requiredField = Helper.mandatoryField(req.body, [
                'title', 'productInfo', 'productDetails', 'name', 'image', 'price', 'madeBy'
            ]);
            if (requiredField.length > 0) {
                return res.status(500).send({
                    status: false,
                    show_msg: 0,
                    msg: 'Some technical issue, Please contact technical team',
                    response: {},
                });
            }
            const { title, productInfo, productDetails, name, categoryId, image, price, madeBy } = req.body;
            let data = {}
            data.title = title;
            data.productInfo = productInfo;
            data.productDetails = productDetails;
            data.name = name;
            if (categoryId) {
                data.categoryId = categoryId;
            }
            data.image = image;
            data.price = price;
            data.madeBy = madeBy;

            let product = new Product(data);
            product.save()
                .then(function (data) {
                    return res.send({
                        status: true,
                        message: '',
                        response: data,
                    });
                })
        } catch (error) {
            console.log(error);
            return next(error);
        }
    },
    AddProductInCategory: async (req, res, next) => {
        try {
            let { productId, categoryId } = req.body;
            let requiredField = Helper.mandatoryField(req.body, [
                'productId', 'categoryId'
            ]);
            if (requiredField.length > 0) {
                return res.status(500).send({
                    status: false,
                    show_msg: 0,
                    msg: 'Some technical issue, Please contact technical team',
                    response: {},
                });
            }
            let product = await Product.findOne({ _id: productId }).exec();
            if (!product) {
                return res.status(500).send({
                    status: false,
                    msg: 'Product Not Found Enter Vaild Id',
                    response: {},
                });
            }
            if (product.categoryId && product.categoryId !== null) {
                return res.status(500).send({
                    status: false,
                    msg: 'Product already has categoryId',
                    response: {},
                });
            }
            let category = await Category.findOne({ _id: categoryId }).exec();
            if (!category) {
                return res.status(500).send({
                    status: false,
                    msg: 'categoryId is Invaild',
                    response: {},
                });
            }
            product.categoryId = categoryId;
            product.save()
                .then(function (data) {
                    return res.send({
                        status: true,
                        message: '',
                        response: data,
                    });
                })

        } catch (error) {
            console.log(error);
            next();
        }
    },
    getProductByCategory: async (req, res, next) => {
        try {

        } catch (error) {
            console.log(error);
            next();
        }
    }
    // createCategory: async (req, res, next) => {
    //     try {

    //     } catch (error) {
    //         console.log(error);
    //         next();
    //     }
    // }

}