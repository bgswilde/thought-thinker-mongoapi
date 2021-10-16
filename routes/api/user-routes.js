const router = require('express').Router();
const { getAllUsers } = require('../../controllers/user-controller');

// All user routes using the same endpoint of /api/users
router.route('/').get(getAllUsers);

module.exports = router;