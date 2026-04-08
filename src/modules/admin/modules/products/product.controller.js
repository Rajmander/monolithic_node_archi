import { success, error } from "../../../utils/response.js";
import * as productService from "./product.service.js";

export const getAll = async (req, res) => {
  try {
    const products = await productService.getProducts();
    return success(res, 200, products, "Products fetched successfully");
  } catch (err) {
    return error(res, 500, err, "Failed to fetch products");
  }
};

export const create = async (req, res) => {
  try {
    const newProduct = await productService.addProduct(req.body);
    return success(res, 201, newProduct, "Product created successfully");
  } catch (err) {
    return error(res, 500, err, "Failed to create product");
  }
};
