import express from 'express';
import jwt from 'jsonwebtoken';  
import crypto from 'crypto';

import { requireAuth } from '../middleware/auth';
import User from '../models/user';
import Bird from '../models/bird';
import Photo from '../models/photo';
var cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: 'birdnerd', 
    api_key: '926417793976924', 
    api_secret: 'Q1YrfEjVO_WujCKhAZYElT8tffo' 
});

const router = express.Router();

// Test protected route
router.get('/protected', requireAuth, (req, res) => {
    res.send({ content: 'The protected test route is functional!' });
});

router.get('/birds', (req, res) => { // removed requireAuth,
    Bird.find({})
        .exec()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
});

router.post('/birds', requireAuth, (req, res) => {
    if(req.user.profile.role === 'moderator') {
        const bird = new Bird(req.body);
        bird.save()
        .then(data => {
            res.json({err: false});
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })
    } else {
        return res.status(403).send({ error: 'You are not authorized' });
    }
}); 

router.get('/birds/:birdSlug', (req, res) => {  // removed requireAuth,
    const birdSlug = req.params.birdSlug; 
    Bird.findOne( { slug: birdSlug } ) 
        .exec()
        .then(data => {
            console.log(data)
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
});


// router.get('/birds/:name', (req, res) => {  // removed requireAuth,
//     const birdName = req.params.name;
//     Bird.findOne( { name: birdName } ) 
//         .exec()
//         .then(data => {
//             console.log(data);
//             res.json(data);
//         })
//         .catch(err => {
//             console.log(err);
//             res.json(err);
//         });
// });

// router.delete('/birds/:birdId', requireAuth, (req, res) => {
//     if(req.user.profile.role === 'moderator') {
//         const birdId = req.params.birdId;
//         Bird.findByIdAndRemove(birdId)
//         .exec()
//         .then(data =>{
//             res.json({ err: false});
//         })
//         .catch(err => {
//             console.log(err);
//             res.json(err);
//         });
//     } else {
//         return res.status(403).send({ error: 'You are not authorized' });
//     }
// });

router.delete('/bird', requireAuth, (req, res) => {
    if(req.user.profile.role === 'moderator') {
        console.log(req.body)
        Bird.findOneAndRemove({ _id: req.body._id}, (err, bird) => {
            if(err){
                throw err;
            } 
            if(bird){
                console.log(bird)
                cloudinary.v2.uploader.destroy(bird.public_id, function(error, result){
                    if(error) {
                        console.log('Cloudinary Error:====', error);
                    }
                });
                res.json({ err: false, msg: 'bird found and removed'});
            }else{
                console.log('No bird profile photo found');
                res.json({ err: true, msg: 'No bird profile photo found'});
            }         
        })
    } else {
        return res.status(403).send({ error: 'You are not authorized' });
    }
})

// photo

router.get('/photos', requireAuth, (req, res) => {
    Photo.find({})
    .then(data => {
        res.json(data)
    }).catch(err => {
        console.log(err);
        res.json(err);        
    })
})


router.get('/photos/:query', requireAuth, (req, res) => {
    console.log(`request ${req.params.query} API`);
    const query = req.params.query;
    if(query === 'user') {
        Photo.find({ user: req.user._id })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                console.log(err);
                res.json(err);
            });          
    } else if(query === 'recent') {
        Photo.find({}).sort( { created_at: -1} ).limit(12)
        .then(data => {
            // console.log(data)
           res.json(data); 
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });         
    } else if(query === 'oldest') {
        Photo.find({}).sort( { created_at: 1} ).limit(12)
        .then(data => {
            // console.log(data)
           res.json(data); 
        })        
        .catch(err => {
            console.log(err);
            res.json(err);
        });              
    } else if(query === 'popular') {
        Photo.find({}).sort( { likes: -1} ).limit(12)
        .then(data => {
            // console.log(data)
           res.json(data); 
        })        
        .catch(err => {
            console.log(err);
            res.json(err);
        });
    
    } else {
        Photo.find({ birdSlug: query })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                console.log(err);
                res.json(err);
            });               
    }
  
}) 

router.post('/photo', requireAuth, (req, res) => { 
    // console.log(req);
    //req.body.user = req.user._id;
    //req.body.likes = 0;
    //req.body.comments = [];
    const photo = new Photo(req.body);
    photo.save()
        .then(data => {
            res.json({err: false});
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })          
});


router.post('/updatephotos', requireAuth, (req, res) => {
    console.log(req.body);
    // console.log(req.user);
    if(req.user.profile.role === 'moderator') {
        // Photo.find( { [req.body.field] : req.body.value })
        // .then(data => {
        //     console.log(data);
        // })
        // Photo.find( { [req.body.field] : req.body.value }, function(err, photos) {
        //     if(err){
        //         throw err;
        //     }            
        //     // console.log(photos)
        //     if(photos) {
        //         photos.forEach(photo => {
        //             console.log(photo)
        //             photo
        //         })
        //     }
        // })
        Photo.update({[req.body.field] : req.body.value }, req.body.updates, {multi: true}, function(err, raw) {
            if(err){
                throw err;
            }
            console.log('The raw response from Mongo was ', raw);
            res.json({ err: false, msg: 'photos updated'});
        }) 
                
    }

})

router.delete('/photo', requireAuth, (req, res) => {
    if(req.user.profile.role === 'moderator') {
        Photo.findOneAndRemove({'public_id' : req.body.public_id}, function (err, photo) {
            if(err){
                throw err;
            }
            if(photo){
                cloudinary.v2.uploader.destroy(req.body.public_id, function(error, result){
                    if(error) {
                        console.log('Cloudinary Error:====', error);
                    }
                });
                res.json({ err: false, msg: 'photo found and removed'});
            }else{
                console.log('No photo found');
                res.json({ err: true, msg: 'No photo found'});
            }
        });
    } else {
        Photo.findOneAndRemove({'public_id': req.body.public_id, 'user': req.user._id}, function (err, photo) {
            if(err){
                throw err;
            }
            if(photo){
                cloudinary.v2.uploader.destroy(req.body.public_id, function(error, result){
                    if(error) {
                        console.log(error);
                    }
                    console.log(result);
                });
                res.json({ err: false, msg: 'photo found and removed'});
            }else{
                console.log('No photo found');
                res.json({ err: true, msg: 'No photo found'});
            }
        });
    }
});

router.post('/like', requireAuth, (req, res) => {
    console.log(req.body)
    // get the photo from the db with ID
    // Photo.findOne({ _id: req.body.photo}, function (err, photo))
    // Photo.find({_id: req.body.photo},  function(err, photo) {

    Photo.findByIdAndUpdate(req.body.photo, 
        { [req.body.operator] : { likes: req.body.user }},
        { new : true }, function(err, photo) {
      console.log(photo);
      if (err) return handleError(err);
      res.send(photo);
    })

});

// router.post('/birds/resize', requireAuth, (req, res) => {
    
// })

export default router;