const { Thought, User } = require('../models');

const thoughtController = {
    // create thought
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
                if(!dbUserData) {
                    res.status(404).json({ message: 'You thought wrong... there is no user by this id, hence no thought to be thought!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err))
    },

}

module.exports = thoughtController;