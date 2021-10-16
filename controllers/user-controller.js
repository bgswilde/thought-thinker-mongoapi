const { User } = require('../models');

const userController = {

    // route to get all users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            // .sort({ username: asc })
            .then(dbUsersData => res.json(dbUsersData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
};

module.exports = userController