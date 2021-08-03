

{

    let createPost = function(){

        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url : '/posts/create',
                data : newPostForm.serialize(),
                success : function(data){
                 console.log(data);
                   let newPost = newPostDom(data.data.post);
                   $('.post-list-container>ul').prepend(newPost);
                   deletePost($(' .delete-post-button' , newPost));

                },
                error : function(error){
                    console.log(error.responseText);
                }
            })

        });
       }


    let newPostDom = function(post){

     return $(` <li id="posts-${post._id}" class="li">
     <p>
         
             <small>
                 <a href="/posts/destroy/${post._id}" class="delete-post-button"> <i class="far fa-trash-alt"></i> </a>
             </small>

             <h3>
               ${post.user.name}
             </h3>
                
             ${post.content}
                         
                         <small>      
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                                    0 Likes
                                </a>                            
                        </small>
                     
     </p>

     <div class="post-comments">
      
             <form action="/comments/create" method="POST">
                 <input type="text" name="content" placeholder="comment" required>
                 <input type="hidden" name="post" value="${post._id}">
                 <input type="submit" value="comment">
             </form>
 
             <hr>
             <h5>
                 COMMENTS
             </h5>
       
     <div class="post-comments-list">
         <ul id="post-comments-${post._id}">
            
         </ul>
     </div>

     </div>     
 </li>
`)

}
    
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type : 'get',
                url: $(deleteLink).attr('href'),
                success : function(data){
                
                    $(`#posts-${data.data.post_id}`).remove();
               
                },
                error : function(error){
                    console.log(error.responseText);
                }
            })
        });
    }


       createPost();

}
