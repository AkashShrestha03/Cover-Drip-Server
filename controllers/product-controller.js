const Product = require("../models/product-model");

//Get Product
const getProducts = async (res, req) => {
  try {
    let products = await Product.find({});
    console.log("All Products Fetched");

    if (products) {
      res.status(200).json(products);
    }

    if (!products) {
      res.status(400).json({ msg: "Products not found" });
    }
  } catch (error) {
   console.log(error)
  }
};

//Add products

const addProducts = async (res, req)=>{
try {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    quantity: req.body.quantity,
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({ sucess: true, name: req.body.name });
} catch (error) {
  
}
}

module.exports = { getProducts, addProducts };
