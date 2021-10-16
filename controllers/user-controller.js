const { User } = require('../models');

const userController = {

    // route to get all users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            // .sort({ username: asc })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    addUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }
};

module.exports = userController