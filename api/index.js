import express from 'express';
import jwt from 'jsonwebtoken';  
import crypto from 'crypto';

import { requireAuth } from '../middleware/auth';
import User from '../models/user';
import Bird from '../models/bird';
import Photo from '../models/photo';

const router = express.Router();

// Test protected route
router.get('/protected', requireAuth, (req, res) => {
    res.send({ content: 'The protected test route is functional!' });
});

router.get('/birds', requireAuth, (req, res) => {
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
    const bird = new Bird(req.body);
    // console.log(req)
    bird.save()
        .then(data => {
            res.json({err: false});
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })
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

router.delete('/birds/:birdId', requireAuth, (req, res) => {
    const birdId = req.params.birdId;
    Bird.findByIdAndRemove(birdId)
    .exec()
    .then(data =>{
        res.json({ err: false});
    })
    .catch(err => {
        console.log(err);
        res.json(err);
    });
});

// photo

router.get('/myphotos', requireAuth, (req, res) => {
    console.log('request myPhotos API')
    Photo.find({ user: req.user._id })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });    
}) 

router.post('/photo', requireAuth, (req, res) => { 
    // console.log(req);
    req.body.user = req.user._id;
    req.body.likes = 0;
    req.body.comments = [];
    const photo = new Photo(req.body);
    // console.log(req)
    photo.save()
        .then(data => {
            res.json({err: false});
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })          
});

// router.post('/birds/resize', requireAuth, (req, res) => {
    
// })

export default router;