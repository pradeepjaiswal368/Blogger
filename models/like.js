const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({

    user : {
        type : mongoose.Schema.ObjectId
    },

    //this defines the object id of liked object
    
    likeable : {
        type : mongoose.Schema.ObjectId,
        require : true,
        refPath : 'onModel'
    },

    //this defines the type of liked object since this is a dynamic reference

    onModel : {
        type : String,
        required : true,
        enum : ['Post', 'Comment']
    }

});


const Like = mongoose.model('Like', likeSchema);
module.exports = Like;