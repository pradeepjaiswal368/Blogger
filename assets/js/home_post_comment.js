{
    let createComment = function(){

        let commentPostForm = $('#post-comment-form');
          
        commentPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({

                type: 'post',
                url : '/comments/create',
                data : commentPostForm.serialize(),
                success : function(data){
                   console.log(data);
                  $('.post-comments-list>ul').prepend(commentDom(data.data.comment));
                  deleteComment($(' .delete-comment-button', commentDom(data.data.comment)));
                },

                error : function(error){
                    console.log(error.responseText);
                }

            })
        });

    }

    let commentDom = function(comment){
        return $(`  <li id="comment-${comment._id}">
        <p>
        ${comment.content}
        
            <small>
                ${comment.user.name}
            </small>

            
                <small>
                    <a href="/comments/destroy/${comment._id}" class="delete-comment-button"> <i class="far fa-trash-alt"></i> x </a>
                </small>


                <small>
                    <a class="toggle-like-button"
                        data-likes="0"
                        href="/likes/toggle/?id=${comment._id}&type=Comment">
                        0  Likes
                    </a>
           </small>


            </p>
    </li>`)
    }


    let deleteComment = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type : 'get',
                url : $(deleteLink).attr('href'),
                success : function(data){
                    
                    $(`#comment-${data.data.comment_id}`).remove();
                },
                error : function(error){
                    console.log(error.responseText);
                }
            });
        })
    }

    createComment();
}

   