import express from 'express';

const router = express.Router();


router.get('/birds', (req, res) => {
    
});

router.get('/birds/:birdId', (req, res) => {
    let bird = birds[req.params.birdId];
    bird.description = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text';
    
    res.send(bird);
});

export default router;