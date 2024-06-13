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

// import mongoose from 'mongoose';

// const { Schema } = mongoose;

// const userSchema = new Schema({
//     first_name: {
//         type: String,
//         required: true 
//     },
//     last_name: {
//         type: String,
//         required: true 
//     },
//     email: { 
//         type: String, 
//         unique: true, 
//         required: true, 
//         lowercase: true, 
//         validate: {
//             validator: function(value) {
//                 return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
//             },
//             message: props => `${props.value} is not a valid email address!`
//         }
//     },
//     contact: {
//         type: String,
//         validate: {
//             validator: function(value) {
//                 return /^\d{10}$/.test(value);
//             },
//             message: props => `${props.value} is not a valid contact number!`
//         }
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     timestamps: true
// });

// userSchema.index({ email: 1 });

// const User = mongoose.model('User', userSchema);

// export default User;
