const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriberModel');

//Getting All
router.get('/', async (req, res, next) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

//Getting One
router.get('/:id', getSubscriber, (req, res, next) => {
    res.json(res.subscriber);
});
//Creating One
router.post('/', async (req, res, next) => {
    const subscriber = new Subscriber(
        {
            name: req.body.name,
            subscriberToChannel: req.body.subscriberToChannel
        }
    );
    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
});
//Updating One
router.patch('/', getSubscriber, async (req, res, next) => {
    if(req.body.name != null){
        res.subscriber.name = req.body.name
    }
    if(req.body.subscriberToChannel != null){
        res.subscriber.subscriberToChannel = req.body.subscriberToChannel
    }
    try {
        const updateSubscriber = await res.subscriber.save();
        res.json(updateSubscriber);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});
//Deleting One
router.delete('/', getSubscriber, async (req, res, next) => {
    try {
        await res.subscriber.remove()
        res.json({message: 'Deleted Subscriber!'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

async function getSubscriber(req, res, next){
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if(subscriber == null){
            return res.status(404).json({message: 'Subscriber Not Found!'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    res.subscriber = subscriber;
    next();
}
module.exports = router;