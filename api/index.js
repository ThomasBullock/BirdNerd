import express from 'express';
import Bird from '../models/bird';
const router = express.Router();

router.get('/birds', (req, res) => {
    /*Bird.find({}, (err, allbirds) => {
        if(err) {
            console.log(err);
        } else {
            console.log(allbirds);
            res.json({ allbirds });
        }
    });*/
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
    const name = req.body.name;
    const species = req.body.species;
    const location = req.body.location;
    const conservationStatus = req.body.conservationStatus;

    const newBird = {
        name: name,
        species: species,
        location: location,
        conservationStatus: conservationStatus,
    }
    const bird = new Bird(newBird);
    bird.save()
        .then(data => {
            res.json({err: false});
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })
    /*Bird.create(newBird, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.send(newlyCreated);
        }
    });*/
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