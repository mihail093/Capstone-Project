import {Schema, model} from "mongoose";

// Definisco lo Schema per i commenti/recensioni per ogni pianta
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

// Definisco lo Schema per le piante
const plantSchema = new Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    scientificName: { 
        type: String, 
        required: true 
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
    careInstructions: {
        light: { 
            type: String, 
            required: true 
        },
        water: { 
            type: String, 
            required: true 
        },
        soil: { 
            type: String 
        },
        temperature: { 
            type: String 
        },
        difficulty: {
            type: String,
            enum: ['easiest', 'easy', 'medium', 'difficult', 'hardest'],
            default: 'medium'
        }
    },
    habitat: { 
        type: String, 
        enum: ['indoor', 'outdoor'], 
        default: 'indoor' 
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
    collection: "plants"
});

const Plant = model('Plant', plantSchema);

export default Plant;