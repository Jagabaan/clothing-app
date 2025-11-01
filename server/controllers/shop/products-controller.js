const RimProduct = require("../../models/rimProducts")

const getFilteredProducts = async (req,res) => {
    try {

        const products = await RimProduct.find({});

        res.status(200).json({
            success: true,
            data: products
        })

    }
    catch (error) {
      console.error("Error fetching filtered products:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
     });  
    }
}
module.exports = {
    getFilteredProducts
}