const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('uhhh... that is definitely an embarassing 404 error... try something that can be found, perhaps?');
});

module.exports = router;