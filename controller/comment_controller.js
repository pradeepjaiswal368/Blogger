const Comment = require('../models/comment');
const Post = require('../models/post');
const Like = require('../models/like');

module.exports.create = async function(req, res){

    
    try{   
    let post = await Post.findById(req.body.post);

    if (post){
        let comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        });

        post.comments.push(comment);
        post.save();
        
        comment = await comment.populate('user', 'name email').execPopulate();   

        if (req.xhr){

            return res.status(200).json({
                data: {
                    comment: comment
                },
                message: "comment created!"
            });
        }


        res.redirect('/');
    }
}catch(err){
    // req.flash('error', err);
    return;
}


};

module.exports.destroy =  async function(req, res){
 console.log(req.xhr)
    try{

        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
        let postId = comment.post;

        await Like.deleteMany({likeable : comment._id, onModel : 'Comment'}); 
        
        
        
        comment.remove();

       await Post.findByIdAndUpdate(postId, { $pull : {comments : req.params.id}});
       
       if (req.xhr){

            return res.status(200).json({
                data: {
                    comment_id: req.params.id
                },
                message: "comment deleted!"
            });
        }

            return res.redirect('back');
    }

    }catch(err){
        console.log('error in creating comment ', err);
        return res.redirect('back');
    }
    
}