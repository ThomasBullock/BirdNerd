import express from 'express';
import jwt from 'jsonwebtoken';  
import crypto from 'crypto';

import { requireAuth } from '../middleware/auth';
import User from '../models/user';
import Bird from '../models/bird';

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
    bird.save()
        .then(data => {
            console.log(data)
            res.json({err: false});
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })
}); 

router.get('/birds/:birdSlug', (req, res) => {  // removed requireAuth,
    const birdSlug = req.params.birdSlug;
    console.log(birdSlug)    
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

export default router;