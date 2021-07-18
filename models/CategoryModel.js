const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    parentId: {
      type: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);