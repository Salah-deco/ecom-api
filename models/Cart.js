import { Schema, model } from 'mongoose';

// create User Schema
const CartSchema = new Schema(
    {
        userId: {type: String, required: true},
        products: [
            {
                productId: {type: String, required: true},
                quantity: {type: Number, required: true, default: 1},
            }
        ],
    },
    { timestamps: true }
);

module.exports = model("Cart", CartSchema);