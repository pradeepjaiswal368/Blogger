const express = require('express');
const router = express.Router();
const passport = express('passport');

const postController = require('../controller/post_controller');

router.post('/create', postController.create);

router.get('/destroy/:id',postController.destroy);

module.exports = router;