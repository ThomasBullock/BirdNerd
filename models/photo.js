import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    name: String // comes from select or search input in submit photo form and is used to query db to get bird  
    bird: {  
        type: mongoose.Schema.ObjectId,
        ref: 'bird'     
    },
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: [{
            type: Number,
            required: 'You must supply coordinates!'
        }],
        address: {
            type: 'String',
            required: 'You must supply a city!'
        }
    },
    likes: Number,
    comments: String,
    camera: String, // brand/model od camera used to take the photo 
    imageAspect: String  // Portrait or Landscape    
    imageUrl: String,
    created_at: Date,
    bytes: Number,
    format: String
});

export default mongoose.model('Photo', PhotoSchema);