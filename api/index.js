import express from 'express';
import Bird from '../models/bird';
const router = express.Router();

router.get('/birds', (req, res) => {
    res.send('helloo');
    res.end();
    /*Bird.find({}, (err, allbirds) => {
        if(err) {
            console.log(err);
        } else {
            console.log(allbirds);
            res.json({ allbirds });
        }
    });*/
});

router.post('/birds', (req, res) => {
    const name = req.body.name;
    const species = req.body.name;
    const location = req.body.name;
    const conservationStatus = req.body.name;

    const newBird = {
        name: name,
        species: species,
        location: location,
        conservationStatus: conservationStatus,
    }

    Bird.create(newBird, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            console.log('hihiiii');
            console.log(newlyCreated);
        }
    });
});

router.get('/birds/:birdId', (req, res) => {
    let bird = {
        birdId: req.params.birdId
    };
    bird.description = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text';
    
    res.send(bird);
});

export default router;