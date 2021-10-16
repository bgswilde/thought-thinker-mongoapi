const router = require('express').Router();
const { getAllUsers, addUser, getUserById, updateUser, removeUser } = require('../../controllers/user-controller');

// All user routes using the same endpoint of /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(addUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(removeUser);

module.exports = router;