const router = require('express').Router();
const { 
    addThought,
    getAllThoughts,
    getThoughtById,
    updateThought,
    removeThought,
    addReaction, 
    removeReaction
} = require('../../controllers/thought-controller');

// all thought routes following the route /api/thoughts

// for the get all route ... /api/thoughts
router.route('/').get(getAllThoughts);

// for the get and update by id routes ... /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought);

// for the add thought route, only needing the userId param ... /api/thoughts/:userId
router.route('/:userId').post(addThought);

// for the delete thought route ... /api/thoughts/:userId/:thoughtId
router.route('/:userId/:thoughtId').delete(removeThought);

// for the post reaction route ... /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// for the delete reaction route ... /
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
