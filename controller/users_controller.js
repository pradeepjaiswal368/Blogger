const User = require('../models/users');
const Friendship  = require('../models/friendship');


module.exports.profile = function(req, res){
User.findById(req.params.id, function(err, user){

    return res.render('profile', {
        title : 'User Profile',
        profile_user: user
    });
})  
}

module.exports.friends = async function(req, res){
    
    let deleted = false;


    let user = await User.findById(req.user.id);
        
        
        console.log(req.xhr);

        let existingFriend = await Friendship.findOne({
            from_user : req.user.id,
            to_user: req.params.id
        }); 

    


        if(existingFriend){
            user.friends.pull(existingFriend._id);
            user.save();
            deleted = true
            existingFriend.remove();
        }

        else{

            let newFriend = await Friendship.create({
                from_user : req.user.id,
                to_user: req.params.id
            });
        
            
            user.friends.push(newFriend._id);
            user.save();

            deleted = false;


        }

        
     return res.json(200, {
        message: "added sucessfully",
        data : {
            deleted : deleted
        }
    })

}


module.exports.update = function(req, res){
 
    if(req.user.id == req.params.id){

    User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
       
        return res.redirect('back');

    });
 
    }else{
        
        return res.status('404').send('Unauthorized');
    }

}

module.exports.signin = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile/:id')
    }
    return res.render('signin',{
        title : 'Sign In'
    });
}

module.exports.signup = function(req, res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile/:id')
    }

    return res.render('signup', {
        title: 'Sign Up'
    });
}

module.exports.create = function(req, res){
      if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
      }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('error in creating the user'); return;
        }

        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('error in creating the user'); return;
                }

                return res.redirect('/users/sign-in');

            });
        }else{
            return res.redirect('back');
        }
    });

}

module.exports.createSession = function(req, res){

    return res.redirect('/');
}


module.exports.destroy = function(req, res){
 
    req.logout();
    res.redirect('/');
}

