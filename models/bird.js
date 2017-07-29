import mongoose from 'mongoose';

const BirdSchema = new mongoose.Schema({
    name: String,
    species: String,
    location: [String],
    conservationStatus: String,
});

export default mongoose.model('Bird', BirdSchema);