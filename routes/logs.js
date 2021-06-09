const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const Log = require('../models/Log');
const Tech = require('../models/Tech');

// @route   POST api/logs
// @desc    Register a log
// @access  Public
router.post(
    '/',
    [
        check('message', 'Message is required')
            .not()
            .isEmpty(),
        check('attention', 'Specify if attention is needed')
            .not()
            .isEmpty(),
        check('tech', 'Please add a technician')
        .not()
        .isEmpty(),
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { message, attention, tech } = req.body;

        try {
            log = new Log({
                message,
                attention,
                tech
            });
    
            await log.save();
    
            res.send(log);
            
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route   GET api/logs
// @desc    Get logs from server
// @access  Public
router.get('/', 
    async (req, res) => {
        try {
            const logs = await Log.find({});
            res.json(logs);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route   PUT api/logs/:id
// @desc    Update log from server
// @access  Public
router.put('/:_id', async (req, res) => {
    const { message, attention, tech } = req.body;

    console.log("Request body in API")
    console.log(req.body)

    // Build contact object
    const logFields = {};
    if(message) logFields.message = message;
    if(attention) logFields.attention = attention;
    if(tech) logFields.tech = tech;

    try {
        let log = await Log.findById(req.params._id);

        if(!log) return res.status(404).json({ msg: 'Log not found' });

        log = await Log.findByIdAndUpdate(req.params._id,
            { $set: logFields },
            { new: true });

        res.json(log);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/logs/:id
// @desc    Delete log from server
// @access  Public
router.delete('/:_id', async (req, res) => {
    try {
        let log = await Log.findById(req.params._id);

        if(!log) return res.status(404).json({ msg: 'Log not found' });

        await Log.findByIdAndRemove(req.params._id);

        res.json(req.params._id);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;