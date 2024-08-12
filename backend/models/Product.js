import {Schema, model} from "mongoose";

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
        type: Boolean, 
        default: true 
    }
}, {
    timestamps: true,
    collection: "products"
})

// Aggiungo un pre-save hook per gestire la data dell'aggiornamento
productSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Product = model('Product', productSchema);

export default Product;