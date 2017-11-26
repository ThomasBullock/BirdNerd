import mongoose from 'mongoose';

const BirdSchema = new mongoose.Schema({
    name: String,
    slug: String,
    species: String,
    order: String,   // bird category or order
    location: [String],
    conservationStatus: String,
    imageUrl: String,
    comments: String,
    created_at: Date,
    bytes: Number,
    format: String,
    public_id: String,
});

export default mongoose.model('Bird', BirdSchema);