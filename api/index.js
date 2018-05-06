import express from 'express';
import jwt from 'jsonwebtoken';  
import crypto from 'crypto';

import { requireAuth } from '../middleware/auth';
import User from '../models/user';
import Bird from '../models/bird';
import Photo from '../models/photo';
import { put } from 'redux-saga/effects';
var cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: 'birdnerd', 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET, 
});

const router = express.Router();


///////////////////////////////////////////////////
/////////////         NEW API      ////////////////
///////////////////////////////////////////////////

///// Birds /////

// Return all birds from db
router.get('/birds', (req, res) => { // removed requireAuth,
    Bird.find({})
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
});

// Return bird with ID
router.get('/birds/:id', (req, res) => {  // removed requireAuth,
    const id = req.params.id; 
    Bird.findOne( { _id: id } ) 
        .exec()
        .then(data => {
            console.log(data)
            res.status(200).json(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
});

// Return bird from order
router.get('/birds/:order', (req, res) => {  // removed requireAuth,

    // TO DO

});

// Create new bird in DB
router.post('/birds', requireAuth, (req, res) => {
    if(req.user.profile.role === 'moderator') {
        const bird = new Bird(req.body);
        bird.save()
        .then(data => {
            console.log('Data : ======', data);
            res.status(201).json({error: false, data });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        })
    } else {
        return res.status(403).send({ error: 'You are not authorized' });
    }
});

// Find bird in DB by ID and Update
router.put('/birds/:id', requireAuth, async (req, res) => {
    if(req.user.profile.role === 'moderator') {
        // const bird = new Bird(req.body);
        // console.log(bird)
        console.log(req.params)
        console.log(req.body);
        
        if(req.body.imageUrl) {
            await Bird.findOne({ _id: req.params.id }, (error, bird) => {
                console.log('existing',  bird);                
                if(error){
                    throw error;
                } 
                if(bird){
                    cloudinary.v2.uploader.destroy(bird.public_id, function(error, result){
                        console.log('old bird photo destroyed')
                        if(error) {
                            console.log('Cloudinary Error:====', error);
                        }
                    });
                }else{
                    console.log('No bird profile photo found');
                }                     
            })
        }
                
        Bird.findOneAndUpdate({_id: req.params.id }, req.body, { new: true })
            .exec()
            .then(data => {
            console.log('Data : ======', data);
            res.status(200).json({error: false, data });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        })
    } else {
        return res.status(403).send({ error: 'You are not authorized' });
    }
}); 

// Delete bird from DB and cloudinary
router.delete('/birds/:id', requireAuth, (req, res) => {
    if(req.user.profile.role === 'moderator') {
        console.log(req.body)
        Bird.findOneAndRemove({ _id: req.params.id}, (error, bird) => {
            if(error){
                throw error;
            } 
            if(bird){
                console.log(bird)
                cloudinary.v2.uploader.destroy(bird.public_id, function(error, result){
                    if(error) {
                        console.log('Cloudinary Error:====', error);
                    }
                });
                res.status(204).json({ error: false, msg: 'bird found and removed'});
            }else{
                console.log('No bird profile photo found');
                res.status(500).json({ error: true, msg: 'No bird profile photo found'});
            }         
        })
    } else {
        return res.status(403).send({ erroror: 'You are not authorized' });
    }
})

///// Photos /////

// Get all photos of bird of :id
router.get('/birds/:id/photos', (req, res) => { // removed requireAuth
    console.log(req.body);
    const id = req.params.id;     
    Photo.find({ birdId: id })
    .then(data => {
        res.status(200).json(data)
    }).catch(error => {
        console.log(error);
        res.status(500).json(error);        
    })
})

// Get photos with assorted sorting queries
router.get('/photos', (req, res) => { // removed requireAuth
    // sort newest
    const sort = req.query.sort;
    const popular = req.query.popular;
    if(sort) {
        let field, order;
        console.log('in switch!')
        switch (sort) {
            case 'created_asc': 
            field = 'created_at';
            order = '1';
            break;
            case 'created_desc': 
            field = 'created_at';
            order = '-1';
            break;
            case 'taken_asc': 
            field = 'dateTaken';
            order = '1';
            break;
            case 'taken_dec': 
            field = 'dateTaken';
            order = '-1';
            break;                                                  
        }

        Photo.find({})
        .sort( { [field]: parseInt(order) } )
        .limit(12)
        .then(data => {
            res.status(200).json(data)
        }).catch(error => {
            console.log(error);
            res.status(500).json(error);        
        })

    } else if(popular) {
        Photo.getPopular()
        .then(data => {
            res.status(200).json(data)
        }).catch(error => {
            console.log(error);
            res.status(500).json(error);        
        })   

    } else { // return all photos
        Photo.find({})
        .then(data => {
            res.json(data)
        }).catch(error => {
            console.log(error);
            res.json(error);        
        })
  
    }

})

router.post('/photo', requireAuth, (req, res) => { 
    // console.log(req.body);
    const photo = new Photo(req.body);
    photo.save()
        .then(data => {
            console.log('Data : ======', data);            
            res.status(201).json({error: false, data});
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        })          
});



// Users //

router.get('/users', requireAuth, (req, res) =>{
    console.log('api users')
    User.find({}).select({ profile: 1 })
    .exec()
    .then( data => {
        res.status(200).json(data);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    })
})

router.delete('/photos/:id', requireAuth, (req, res) => {
    // console.log(req.user)
    const publicId = req.params.id;
    if(req.user.profile.role === 'moderator') {
        Photo.findOneAndRemove({'public_id' : publicId }, function (error, photo) {
            if(error){
                throw error;
            }
            if(photo){
                cloudinary.v2.uploader.destroy(req.body.public_id, function(error, result){
                    if(error) {
                        console.log('Cloudinary Error:====', error);
                    }
                });
                res.status(204).json({ error: false, msg: 'photo found and removed'});
            }else{
                console.log('No photo found');
                res.status(404).json({ error: true, msg: 'No photo found'});
            }
        });
    } else {
        console.log('we aint a mod')
        Photo.findOneAndRemove({'public_id': req.body.public_id, 'user._id': req.user._id}, function (error, photo) {
            console.log(photo)
            if(error){
                throw error;
            }
            if(photo){
                cloudinary.v2.uploader.destroy(req.body.public_id, function(error, result){
                    if(error) {
                        console.log(error);
                    }
                    console.log(result);
                });
                res.status(204).json({ error: false, msg: 'photo found and removed'});
            }else{
                console.log('No photo found');
                res.status(404).json({ error: true, msg: 'No photo found'});
            }
        });
    }
});

// update photos field of bird ID (eg if bird is deleted update photo birdID's to null)
router.put('/birds/:Id/photos/:field', requireAuth, (req, res) => {
    console.log(req.body);
    // console.log(req.user);
    if(req.user.profile.role === 'moderator') {

        Photo.update({[req.params.field] : req.params.Id }, req.body.updates, {multi: true}, function(error, raw) {
            if(error){
                throw error;
            }
            console.log('The raw response from Mongo was ', raw);
            res.status(200).json({ error: false, msg: 'photos updated'});
        })             
    }
})

router.put('/photos/:id/like', requireAuth, (req, res) => {
    console.log(req.body)
    const photoId = req.params.id;
    // get the photo from the db with ID
    // Photo.findOne({ _id: req.body.photo}, function (err, photo))
    // Photo.find({_id: req.body.photo},  function(err, photo) {

    Photo.findByIdAndUpdate( photoId, 
        { [req.body.operator] : { likes: req.body.user }},
        { new : true }, function(error, photo) {
      console.log(photo);
      if (photo) {
        res.status(200).json(photo);
      } else {
        res.status(500).json(error);
      };

    })

});

///////////////////////////////////////////////////
/////////////         NEW API      ////////////////
///////////////////////////////////////////////////



// Test protected route
router.get('/protected', requireAuth, (req, res) => {
    res.send({ content: 'The protected test route is functional!' });
});

// router.get('/birds', (req, res) => { // removed requireAuth,
//     Bird.find({})
//         .exec()
//         .then(data => {
//             res.json(data);
//         })
//         .catch(error => {
//             console.log(err);
//             res.json(err);
//         });
// });

// router.post('/birds', requireAuth, (req, res) => {
//     if(req.user.profile.role === 'moderator') {
//         const bird = new Bird(req.body);
//         bird.save()
//         .then(data => {
//             console.log('Data : ======', data);
//             res.json({err: false, data });
//         })
//         .catch(err => {
//             console.log(err);
//             res.json(err);
//         })
//     } else {
//         return res.status(403).send({ error: 'You are not authorized' });
//     }
// }); 


// router.post('/birds/update/:id', requireAuth, async (req, res) => {
//     if(req.user.profile.role === 'moderator') {
//         // const bird = new Bird(req.body);
//         // console.log(bird)
//         console.log(req.params)
//         console.log(req.body);
        
//         if(req.body.imageUrl) {
//             await Bird.findOne({ _id: req.params.id }, (err, bird) => {
//                 console.log('existing',  bird);
                
//                 if(err){
//                     throw err;
//                 } 
//                 if(bird){
//                     cloudinary.v2.uploader.destroy(bird.public_id, function(error, result){
//                         console.log('old bird photo destroyed')
//                         if(error) {
//                             console.log('Cloudinary Error:====', error);
//                         }
//                     });
//                 }else{
//                     console.log('No bird profile photo found');
//                 }                     
//             })
//         }
        
//         console.log('waited a bit then ');
        
//         Bird.findOneAndUpdate({_id: req.params.id }, req.body, { new: true })
//             .exec()
//             .then(data => {
//             console.log('Data : ======', data);
//             res.json({err: false, data });
//         })
//         .catch(err => {
//             console.log(err);
//             res.json(err);
//         })
//     } else {
//         return res.status(403).send({ error: 'You are not authorized' });
//     }
// }); 


// router.get('/birds/:birdSlug', (req, res) => {  // removed requireAuth,
//     const birdSlug = req.params.birdSlug; 
//     Bird.findOne( { slug: birdSlug } ) 
//         .exec()
//         .then(data => {
//             console.log(data)
//             res.json(data);
//         })
//         .catch(err => {
//             console.log(err);
//             res.json(err);
//         });
// });


// router.delete('/bird', requireAuth, (req, res) => {
//     if(req.user.profile.role === 'moderator') {
//         console.log(req.body)
//         Bird.findOneAndRemove({ _id: req.body._id}, (err, bird) => {
//             if(err){
//                 throw err;
//             } 
//             if(bird){
//                 console.log(bird)
//                 cloudinary.v2.uploader.destroy(bird.public_id, function(error, result){
//                     if(error) {
//                         console.log('Cloudinary Error:====', error);
//                     }
//                 });
//                 res.json({ err: false, msg: 'bird found and removed'});
//             }else{
//                 console.log('No bird profile photo found');
//                 res.json({ err: true, msg: 'No bird profile photo found'});
//             }         
//         })
//     } else {
//         return res.status(403).send({ error: 'You are not authorized' });
//     }
// })

// photo

// router.get('/photos', (req, res) => { // removed requireAuth
//     Photo.find({})
//     .then(data => {
//         res.json(data)
//     }).catch(err => {
//         console.log(err);
//         res.json(err);        
//     })
// })


router.get('/photos/:query', requireAuth, (req, res) => {
    console.log(`request ${req.params.query} API`);
    const query = req.params.query;
    if(query === 'user') {
        Photo.find({ user: req.user._id })
            .then(data => {
                res.json(data);
            })
            .catch(error => {
                console.log(error);
                res.json(error);
            });          
    } else if(query === 'recent') {
        Photo.find({}).sort( { created_at: -1} ).limit(12)
        .then(data => {
            // console.log(data)
           res.json(data); 
        })
        .catch(error => {
            console.log(error);
            res.json(error);
        });         
    } else if(query === 'oldest') {
        Photo.find({}).sort( { created_at: 1} ).limit(12)
        .then(data => {
            // console.log(data)
           res.json(data); 
        })        
        .catch(error => {
            console.log(error);
            res.json(error);
        });              
    } else if(query === 'popular') {
        Photo.find({}).sort( { likes: -1} ).limit(12)
        .then(data => {
            // console.log(data)
           res.json(data); 
        })        
        .catch(error => {
            console.log(error);
            res.json(error);
        });
    
    } else {
        Photo.find({ birdSlug: query })
            .then(data => {
                res.json(data);
            })
            .catch(error => {
                console.log(error);
                res.json(error);
            });               
    }
  
}) 

// router.post('/photo', requireAuth, (req, res) => { 
//     console.log(req.body);
//     //req.body.user = req.user._id;
//     //req.body.likes = 0;
//     //req.body.comments = [];
//     const photo = new Photo(req.body);
//     photo.save()
//         .then(data => {
//             console.log('Data : ======', data);            
//             res.json({err: false, data});
//         })
//         .catch(err => {
//             console.log(err);
//             res.json(err);
//         })          
// });


// router.post('/updatephotos', requireAuth, (req, res) => {
//     console.log(req.body);
//     // console.log(req.user);
//     if(req.user.profile.role === 'moderator') {

//         Photo.update({[req.body.field] : req.body.value }, req.body.updates, {multi: true}, function(err, raw) {
//             if(err){
//                 throw err;
//             }
//             console.log('The raw response from Mongo was ', raw);
//             res.json({ err: false, msg: 'photos updated'});
//         }) 
                
//     }

// })

// router.delete('/photo', requireAuth, (req, res) => {
//     console.log(req.user)
//     console.log(req.body)    
//     if(req.user.profile.role === 'moderator') {
//         Photo.findOneAndRemove({'public_id' : req.body.public_id}, function (err, photo) {
//             if(err){
//                 throw err;
//             }
//             if(photo){
//                 cloudinary.v2.uploader.destroy(req.body.public_id, function(error, result){
//                     if(error) {
//                         console.log('Cloudinary Error:====', error);
//                     }
//                 });
//                 res.json({ err: false, msg: 'photo found and removed'});
//             }else{
//                 console.log('No photo found');
//                 res.json({ err: true, msg: 'No photo found'});
//             }
//         });
//     } else {
//         console.log('we aint a mod')
//         Photo.findOneAndRemove({'public_id': req.body.public_id, 'user._id': req.user._id}, function (err, photo) {
//             console.log(photo)
//             if(err){
//                 throw err;
//             }
//             if(photo){
//                 cloudinary.v2.uploader.destroy(req.body.public_id, function(error, result){
//                     if(error) {
//                         console.log(error);
//                     }
//                     console.log(result);
//                 });
//                 res.json({ err: false, msg: 'photo found and removed'});
//             }else{
//                 console.log('No photo found');
//                 res.json({ err: true, msg: 'No photo found'});
//             }
//         });
//     }
// });

// router.post('/like', requireAuth, (req, res) => {
//     console.log(req.body)
//     // get the photo from the db with ID
//     // Photo.findOne({ _id: req.body.photo}, function (err, photo))
//     // Photo.find({_id: req.body.photo},  function(err, photo) {

//     Photo.findByIdAndUpdate(req.body.photo, 
//         { [req.body.operator] : { likes: req.body.user }},
//         { new : true }, function(err, photo) {
//       console.log(photo);
//       if (err) return handleError(err);
//       res.send(photo);
//     })

// });

// router.post('/birds/resize', requireAuth, (req, res) => {
    
// })

export default router;