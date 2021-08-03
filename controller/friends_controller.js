const User = require('../models/users');
const Friends = require('../models/friendship');

module.exports.friends = async function(req, res){

    let friend = await User.findOne({_id : req.user._id}).populate({
        path : 'friends',
        populate : {
            path : 'to_user'       
        }
     });

     return res.render('home', {
         friend : friend
     });

}

