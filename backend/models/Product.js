import {Schema, model} from "mongoose";

// Definisco lo Schema per i commenti/recensioni per ogni prodotto
const commentSchema = new Schema({
    text: { 
        type: String, 
        required: true 
    },
    rating: { 
        type: Number, 
        required: true, 
        min: 1, 
        max: 5 
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

// Definisco lo Schema per tutti i prodotti che non sono piante 
const productSchema = new Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    image: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    category: { 
        type: String, 
        required: true 
    },
    inStock: { 
        type: Number, 
        default: 0, 
        min: 0 
    },
    comments: [commentSchema]
}, {
    timestamps: true,
    collection: "products"
})

const Product = model('Product', productSchema);

export default Product;