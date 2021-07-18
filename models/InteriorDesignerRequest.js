const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        mobile: {
            type: Number,
            required: true,
            unique: true,
        },
        email: {
            type: Number,
            required: true,
            lowercase: true,
            unique: true,
        },
        message: String,
        address: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);