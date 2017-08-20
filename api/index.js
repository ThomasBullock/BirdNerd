import express from 'express';

import Bird from '../models/bird';
const router = express.Router();

router.get('/birds', (req, res) => {
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

 router.post('/birds', (req, res) => {
    // const locations = req.body.location.split(',').map( (item) => item.trim() );  // moved to client
    // req.body.locations = locations;
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

router.get('/birds/:birdId', (req, res) => {
    const birdId = req.params.birdId;
    Bird.findById(birdId)
        .exec()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
});

router.delete('/birds/:birdId', (req, res) => {
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