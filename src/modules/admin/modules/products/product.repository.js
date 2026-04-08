import Product from "./product.model.js";

export const findAllProducts = () => Product.find();
export const findProductById = (id) => Product.findById(id);
export const createProduct = (data) => Product.create(data);
export const updateProduct = (id, data) =>
  Product.findByIdAndUpdate(id, data, { new: true });
export const deleteProduct = (id) => Product.findByIdAndDelete(id);
