const { User } = require('../models');

const userController = {

    // GET route to get all users ... /api/users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .sort({ username: 'asc' })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // POST route to add a user ... /api/users
    addUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },
    // GET route to get a single user by id ... /api/users/:id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                // Send a 404 message if no user exists with the specified id
                if (!dbUserData) {
                    res.status(404).json({ message: 'I think you may have the wrong info... no thinker found.'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // PUT route to edit a username/email by id ... /api/users/:id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                // Send a 404 message if no user exists with the specified id
                if (!dbUserData) {
                    res.status(404).json({ message: 'I think you may have the wrong info... no thinker found.'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // DELETE route to remove by id ... /api/users/:id
    removeUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                // Send a 404 message if no user exists with the specified id
                if (!dbUserData) {
                    res.status(404).json({ message: 'I think you may have the wrong info... no thinker found.'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
};

module.exports = userController