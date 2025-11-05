const RimProduct = require("../../models/rimProducts");

const getFilteredProducts = async (req, res) => {
  try {
    const {
      category = "",
      brand = "",
      sortBy = "price-lowtohigh"
    } = req.query;

    // Build filters
    let filters = {};

    if (category) {
      filters.category = { $in: category.split(",") };
    }

    if (brand) {
      filters.brand = { $in: brand.split(",") };
    }

    // Sorting logic
    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;

      case "price-hightolow":
        sort.price = -1;
        break;

      case "title-atoz":
        sort.title = 1;
        break;

      case "title-ztoa":
        sort.title = -1;
        break;

      default:
        sort.price = 1;
    }

    const products = await RimProduct.find(filters).sort(sort);

    return res.status(200).json({
      success: true,
      data: products
    });

  } catch (error) {
    console.error("Error fetching filtered products:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

const getProductDetails = async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await RimProduct.findById(id);

        if(!product) return res.status(400).json({
            success : false,
            message : 'Product not found'
        })

        res.status(200).json(
           {
            success : true,
            data : product
           } 
        )
    }
    catch (error) {
          console.error("Error fetching filtered products:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
    }
}

module.exports = { getFilteredProducts , getProductDetails};
