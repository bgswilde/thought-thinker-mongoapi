const router = require('express').Router();
const { addThought } = require('../../controllers/thought-controller');

// for the add thought route, only needing the userId param ... /api/thoughts/<userId>
router.route('/:userId').post(addThought);

module.exports = router;
