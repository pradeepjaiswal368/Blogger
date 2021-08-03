const express = require('express');
const router = express.Router();
const passport = require('passport');


const userController = require('../controller/users_controller');


router.post('/friends/:id', userController.friends);

router.get('/profile/:id', passport.checkAuthentication, userController.profile);

router.post('/update/:id', passport.checkAuthentication, userController.update);

router.get('/sign-in', userController.signin);
router.get('/sign-up', userController.signup);

router.post('/create', userController.create);

router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
    
), userController.createSession);


router.get('/auth/google', passport.authenticate('google', {scope : ['profile', 'email']}));

router.get('/auth/google/callback', passport.authenticate('google', {failure : '/user/sign-in'}), userController.createSession);


router.get('/sign-out', userController.destroy);


module.exports = router;