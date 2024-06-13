import mongoose from 'mongoose';

const { Schema } = mongoose;

const wishlistSchema = new Schema({
    user_id: String,
    recipe: String,
    timestamps: true
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
