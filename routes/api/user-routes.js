const router = require('express').Router();
const { getAllUsers, addUser } = require('../../controllers/user-controller');

// All user routes using the same endpoint of /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(addUser);

module.exports = router;