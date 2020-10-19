const products = require("./products.js");
const utils = require("./utils");

exports.getProducts = (req, res) => {
  if (!Object.keys(products).length) {
    throw new Error("the products list is empty");
  }
  res.end(JSON.stringify(products));
};

exports.addProduct = (req, res) => {
  utils.parseBody(req, (newProduct) => {
    if (!newProduct.name || !newProduct.id) {
      throw new Error("the data is invalid");
    }

    for (let product in products) {
      if (parseInt(products[product].id) === parseInt(newProduct.id)) {
        throw new Error("the Product id is taken");
      }
    }

    products["product" + newProduct.id] = newProduct;

    return res.end(JSON.stringify(products));
  });
};
