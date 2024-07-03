import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'

const { Schema } = mongoose;

const wishlistSchema = new Schema({
    id: { type: String, default: uuidv4 },
    user_id: String,
    recipe: Object,
}, {timestamps: true});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
