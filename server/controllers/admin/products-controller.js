const { ImageUploadUtil } = require("../../helpers/cloudinary");
const RimProduct = require("../../models/rimProducts")

const handleImageUpload = async (req, res) =>
{
    try {

    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await ImageUploadUtil(url);

    res.json({
        success : true,
        result,
    })

    }
    catch (error)
    {
        console.log(error);
        res.json({
            success : false,
            message : 'Error occured'
        })
    }
}

const addProduct =  async (req, res) => {
    try {
        const {image,title, description, category, brand, price, totalStock} = req.body
        const newlyCreatedProduct = new RimProduct({
            image,title, description, category, brand, price, totalStock
        })
       await newlyCreatedProduct.save();
       res.status(201).json({
        success : true,
        data : newlyCreatedProduct
       }) ;
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : 'Error occured'
        })
    }
}

const fetchAllProduct =  async (req, res) => {
    try {
        const listOfProducts = await RimProduct.find({});
        res.status(200).json({
            success : true,
            data : listOfProducts
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : 'Error occured'
        })
    }
}

const editProduct =  async (req, res) => {
    try {
        const {id} = req.params;
        const {image,title, description, category, brand, price, totalStock} = req.body
        const findProduct = await RimProduct.findById(id)
        if(!findProduct) return res.status(404).json({
            success : false,
            message : 'Product not found'
        });

        findProduct.title = title || findProduct.title
        findProduct.description = description || findProduct.description
        findProduct.category = category || findProduct.category
        findProduct.brand = brand || findProduct.brand
        findProduct.price = price || findProduct.price
        findProduct.totalStock = totalStock || findProduct.totalStock
        findProduct.image = image || findProduct.image

        await findProduct.save();
        res.status(200).json({
            success : true,
            data : findProduct,
        });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : 'Error occured'
        })
    }
}

const deleteProduct =  async (req, res) => {
    try {

        const {id} = req.params
        const prodcuct = await RimProduct.findByIdAndDelete(id);

        if(!prodcuct)
            return res.status(404).json({
        success : false,
    message : "Product not found"});

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : 'Error occured'
        })
    }
}
module.exports = {handleImageUpload, addProduct,fetchAllProduct, editProduct,deleteProduct }