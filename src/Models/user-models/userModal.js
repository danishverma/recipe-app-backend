import { Timestamp } from 'mongodb'
import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    contact: String,
    password: String,
    created_at: Timestamp,
    updated_at: Timestamp
})

