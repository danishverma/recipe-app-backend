import { Timestamp } from 'mongodb'
import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
    user_id: String,
    recipe: String,
    created_at: Timestamp,
    updated_at: Timestamp
})