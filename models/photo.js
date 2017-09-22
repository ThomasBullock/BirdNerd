import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    birdName: String, // comes from select or search input in submit photo form and is used to query db to get bird
    birdSlug: String,  
    birdId: {  
        type: mongoose.Schema.ObjectId,
        ref: 'bird'     
    },
    location: String,
    likes: Number,
    comments: [String],
    camera: String, // brand/model od camera used to take the photo 
    imageAspect: String, // Portrait or Landscape    
    imageUrl: String,
    created_at: Date,
    bytes: Number,
    format: String
});

export default mongoose.model('Photo', PhotoSchema);