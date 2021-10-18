const { Thought, User } = require('../models');

const thoughtController = {
    // POST route to create thought ... /api/thoughts/:userId
    addThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                // Send a 404 message if no user exists with the specified id
                if(!dbUserData) {
                    res.status(404).json({ message: 'You thought wrong... there is no user by this id, hence no thought to be thought!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err))
    },

    // GET route to get all thoughts ... /api/thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // GET route to get a single thought by id ... /api/thoughts/:thoughtId
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                // Send a 404 message if no thought exists with the specified id
                if (!dbThoughtData) {
                    res.status(404).json({ message: "There is no thought by that id. On the bright side, there's actually something in the universe that hasn't been thought up!" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // PUT route to edit a thought's content  ... /api/thoughts/:thoughtid
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                // Send a 404 message if no thought exists with the specified id
                if (!dbThoughtData) {
                    res.status(404).json({ message: "There is no thought by that id. On the bright side, there's actually something in the universe that hasn't been thought up!" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // DELETE route to delete thought ... /api/thoughts/<userId>/<thoughtId>
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                // Send a 404 message if no thought exists with the specified id
                if (!deletedThought) {
                    return res.status(404).json({ message: "There is no thought by that id. On the bright side, there's actually something in the universe that hasn't been thought up!" })
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: {thoughtId: params.thoughtId } } },
                    { new: true }
                )
            })
            .then(dbUserData => {
                // Send a 404 message if no user exists with the specified id
                if (!dbUserData) {
                    res.status(404).json({ message: 'You thought wrong... there is no user by this id, hence no thought to be thought!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err))
    },

    // add a reaction to a thought ... /api/thoughts/:thoughtId/reactions
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                // Send a 404 message if no thought exists with the specified id
                if (!dbThoughtData) {
                    res.status(404).json({ message: "There is no thought by that id. On the bright side, there's actually something in the universe that hasn't been thought up!" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // delete a reaction to a thought ... /api/thoughts/:thoughtId/reactions/:reactionId
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: {reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbReactionData => {
                // Send a 404 message if an id in params doesn't match the id in the database
                if (!dbReactionData) {
                    res.status(404).json({ message: 'Is the ID what you think it is? I think it is not. Nothing Found.' });
                    return;
                }
                res.json(dbReactionData);
            })
            .catch(err => res.json(err))
    },

}

module.exports = thoughtController;