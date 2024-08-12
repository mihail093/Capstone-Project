import {Schema, model} from "mongoose";
import bcrypt from "bcrypt";

// Definisco lo Schema per gli utenti
const userSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
          validator: function(v) {
            return /^\S+@\S+\.\S+$/.test(v);
          },
          message: props => `${props.value} non è un indirizzo email valido!`
        }
    },
    password: { 
        type: String, 
        required: true 
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    avatar: {
        type: String
    },
    lastLogin: {
        type: Date
    },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user' 
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
}, {
    timestamps: true,
    collection: "users"
});

// Aggiungo un pre-save hook per ottenere la password hashata
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Metodo per confrontare le password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = model("User", userSchema);
export default User;