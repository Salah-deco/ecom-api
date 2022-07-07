import { Schema, model } from 'mongoose';

// create User Schema
const OrderSchema = new Schema(
    {
        userId: {type: String, required: true},
        products: [
            {
                productId: {type: String, required: true},
                quantity: {type: Number, required: true, default: 1},
            }
        ],
        amount: {type: Number, required: true},
        address: {type: Object, required: true},
        status: {type: String, required: true, default: 'pending'}
    },
    { timestamps: true }
);

module.exports = model("Order", OrderSchema);