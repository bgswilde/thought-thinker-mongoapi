const router = require('express').Router();
const { 
    getAllUsers, 
    addUser, 
    getUserById, 
    updateUser, 
    removeUser, 
    addFriend, 
    removeFriend 
} = require('../../controllers/user-controller');

// All user routes following the route /api/users

// routes to get all users and add a user ... /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(addUser);

// routes to get a single user, update a single user, and delete a single user ... /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(removeUser);

// routes to add and delete a friend to a user's friend list ... /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);


module.exports = router;