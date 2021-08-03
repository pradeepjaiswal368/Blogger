const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/users');
const Friends = require('../models/friendship');

module.exports.home = async function(req, res){
  if(req.user){

   try {
      
      let posts = await Post.find({})
         .sort('-createdAt')
         .populate('user')
         .populate({
            path: 'comments',
            populate: {
               path: 'user'
            },
            populate : {
               path : 'likes'
            }
         })
         .populate('likes');
        
         
         let friend = await User.findOne({_id : req.user._id}).populate({
            path : 'friends',
            populate : {
                path : 'to_user'       
            }
         });
  
        let users = await User.find({});   

            
      return res.render('home', {
         title: 'Social app',
         posts: posts,
         all_users: users,
         friend : friend
      });

      } 
   catch (err) {
      console.log('Error', err);
      return;
      }

  }else{
   try {
      
      let posts = await Post.find({})
         .sort('-createdAt')
         .populate('user')
         .populate({
            path: 'comments',
            populate: {
               path: 'user'
            },
            populate : {
               path : 'likes'
            }
         })
         .populate('likes');
        
        let users = await User.find({});   

            
      return res.render('home', {
         title: 'Social app',
         posts: posts,
         all_users: users,
      });

      } 
   catch (err) {
      console.log('Error', err);
      return;
      }
  }
  
}