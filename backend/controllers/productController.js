import Product from "../models/Product.js";

// Create product with image uploads
export const createProduct = async (req, res) => {
  try {
    const imageUrls = req.files?.map((file) => file.path) || [];
    const parsedTags = req.body.tags ? JSON.parse(req.body.tags) : [];
    const product = await Product.create({
      ...req.body,
      tags: parsedTags,
      images: imageUrls,
      createdBy: req.user._id,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all products, optionally filtered by category or tags
export const getProducts = async (req, res) => {
  const { category, tag } = req.query;
  let filter = { isDeleted: false, isActive: true };
  if (category) filter.category = category;
  if (tag) filter.tags = tag;

  try {
    const products = await Product.find(filter).populate("category");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get product by ID with category info
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isDeleted: false,
    }).populate("category");

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update product with optional new images
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (req.files && req.files.length > 0) {
      product.images = req.files.map((file) => file.path);
    }

    if (typeof req.body.isActive !== "undefined") {
      product.isActive = req.body.isActive;
    }

    if (req.body.tags) {
      req.body.tags = JSON.parse(req.body.tags);
    }
    
    Object.assign(product, req.body);
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete product by ID
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.isDeleted = true;
    await product.save();

    res.status(200).json({ message: "Product soft-deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get featured products
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeaturedOnHome: true }).populate(
      "category"
    );
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const bulkSoftDeleteProducts = async (req, res) => {
  const { ids } = req.body; // array of product IDs

  try {
    const result = await Product.updateMany(
      { _id: { $in: ids } },
      { $set: { isDeleted: true } }
    );

    res.status(200).json({ message: "Products soft-deleted", result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Bulk delete error", error: error.message });
  }
};
