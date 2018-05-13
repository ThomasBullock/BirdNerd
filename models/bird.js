import mongoose from 'mongoose';

const BirdSchema = new mongoose.Schema({
    name: String,
    slug: String,
    species: String,
    order: String,   // bird category or order
    family: String,
    location: [String],
    wingspan: [Number],
    conservationStatus: String,
    imageAspect: String, // Portrait or Landscape        
    imageUrl: String,
    comments: String,
    created_at: Date,
    bytes: Number,
    format: String,
    public_id: String,
});

export default mongoose.model('Bird', BirdSchema);