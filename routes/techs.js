const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const Tech = require('../models/Tech');

// @route   POST api/techs
// @desc    Register a technician
// @access  Public
router.post(
    '/',
    [
        check('firstName', 'First name is required')
            .not()
            .isEmpty(),
        check('lastName', 'Last name is required')
            .not()
            .isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { firstName, lastName } = req.body;

        try {
            let tech = await Tech.findOne({ firstName, lastName });

            if(tech) {
                return res.status(400).json({ msg: 'Technician already exists' })
            }

            tech = new Tech({
                firstName,
                lastName
            });
        
            await tech.save();
    
            res.send(tech);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route   GET api/techs
// @desc    Get techs from server
// @access  Public
router.get('/', 
    async (req, res) => {
        try {
            const techs = await Tech.find({});
            res.json(techs);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route   DELETE api/techs/_:id
// @desc    Delete tech from server
// @access  Public
router.delete('/:_id', async (req, res) => {
    try {
        let tech = await Tech.findById(req.params._id);

        if(!tech) return res.status(404).json({ msg: 'Tech not found' });

        await Tech.findByIdAndRemove(req.params._id);

        res.json(req.params._id);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;