import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema({
    user: {
        _id: {
            type: mongoose.Schema.ObjectId,
            ref: 'user'
        }
    },
    birdName: String, // comes from select or search input in submit photo form and is used to query db to get bird
    birdSlug: String,  
    birdId: {  
        type: mongoose.Schema.ObjectId,
        ref: 'bird'     
    },
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: [{
            type: Number
            // required: 'You must supply coordinates!'
        }],
        address: {
            type: 'String'
            // required: 'You must supply a city!'
        }
    },
    likes: [{
            type: mongoose.Schema.ObjectId,
            ref: 'user'
        }],
    comments: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'user'
        },
        text: String
    }],
    camera: String, // brand/model od camera used to take the photo 
    imageAspect: String, // Portrait or Landscape    
    imageUrl: String,
    created_at: Date,
    dateTaken: Date,
    bytes: Number,
    format: String,
    public_id: String,
});

export default mongoose.model('Photo', PhotoSchema);