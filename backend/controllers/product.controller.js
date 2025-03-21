import Product from "../models/product.model.js";
import mongoose from "mongoose";
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        console.log("Error in Fetching products:", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

export const createProduct = async (req, res) => {
    const product = req.body; // For example user will send this data
    if (!product.name || !product.price || !product.image) {
        // client error
        return res.status(400).json({
            success: false,
            message: "Please provide all fields"
        });
    }

    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({
            success: true,
            data: newProduct
        });
    } catch (error) {
        console.log("Error in Creating product:", error.message);
        // server error
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    // check Product ID exist?
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Invalid Product ID"
        });
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Product Deleted"
        });
    } catch (error) {
        console.log("Error in Deleting product:", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    // check Product ID exist?
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Invalid Product ID"
        });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({
            success: true,
            data: updatedProduct
        });
    } catch (error) {
        console.log("Error in Updating product", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

