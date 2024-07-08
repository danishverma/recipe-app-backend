import { v4 as uuidv4 } from 'uuid'
import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    id: { type: String, default: uuidv4 },
    first_name: String,
    last_name: String,
    email: { type: String, unique: true }, 
    contact: String,
    password: String,
    role: String,
},{timestamps: true});

// Indexing email field for faster querying
userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);

export default User;

