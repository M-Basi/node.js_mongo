const Product = require('../models/product.model')

exports.findAll = async(req, res) => {
    console.log("Find All products");

    try {
        const result = await Product.find();
        res.json({status: true, data: result});
    }catch(err) {
        res.json({status: false, data: err});
    }

}

exports.findOne = async(req, res) => {
    const id = req.params.id;
    
    console.log("Find product with id", id);

    try {
        const result = await Product.findOne({_id: id});
        res.json({status: true, data: result});
    }catch(err) {
        res.json({status: false, data: err});
    }

}

exports.create = async(req, res) => {
    const newProduct= new Product ({
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity,
        email: req.body.email        
    });

    console.log("Insert poduct with title", req.body.product)

    try {
        const result = await newProduct.save();
        res.json({status: true, data: result});
    }catch(err) {
        res.json({status: false, data: err});
    }
}

exports.update = async(req, res) => {
    const id = req.params.id;  

    console.log("Update product with id ", id);

    const updateProduct = {
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity,
    };

    try {
        const result = await Product.findOneAndUpdate(
            {_id: id},
            updateProduct
        );
        res.json({status: true, data: result});

    }catch(err) {
        res.json({status: false, data: err})
    }
}

exports.delete = async(req, res) => {
    const id = req.params.id;  
    console.log("Delete product with id", id);

    try {
        const result = await Product.findOneAndDelete({_id: id});
        res.json({status: true, data: result});

    }catch(err) {
        res.json({status: false, data: err});
    }
}