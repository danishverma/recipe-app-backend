import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true }, 
    contact: String,
    password: String
},{timestamps: true});

// Indexing email field for faster querying
userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);

export default User;

