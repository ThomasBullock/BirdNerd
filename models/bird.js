import mongoose from 'mongoose';

const BirdSchema = new mongoose.Schema({
    name: String,
    species: String,
    location: [String],
    conservationStatus: String,
    imageUrl: String,
    created_at: Date,
    bytes: Number,
    format: String
});

export default mongoose.model('Bird', BirdSchema);