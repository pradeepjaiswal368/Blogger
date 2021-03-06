
// {

//   let createLike = function(){

//     let toggleLike = $('.toggle-like-button');

//     toggleLike.click(function(e){
//       e.preventDefault();

//       $.ajax({
//         type : 'post',
//         url : $(toggleLike).attr('href'),
//         success : function(data){
//           console.log(data);
//           let likesCount = parseInt($(toggleLike).attr('data-likes'));
//           if (data.data.deleted == true){
//             likesCount -= 1;
            
//         }else{
//             likesCount += 1;
//         }

//         $(toggleLike).attr('data-likes', likesCount);
//         $(toggleLike).html(`${likesCount} Likes`);

//         },
//         error : function(error){
//           console.log(error.responseText);
//       }
//       })
//     })

//   }

//   createLike();

// }

// CHANGE :: create a class to toggle likes when a link is clicked, using AJAX
class ToggleLike{
  constructor(toggleElement){
      this.toggler = toggleElement;
      this.toggleLike();
  }


  toggleLike(){
      $(this.toggler).click(function(e){
          e.preventDefault();
          let self = this;

          // this is a new way of writing ajax which you might've studied, it looks like the same as promises
          $.ajax({
              type: 'POST',
              url: $(self).attr('href'),
          })
          .done(function(data) {
              let likesCount = parseInt($(self).attr('data-likes'));
              console.log(likesCount);
              if (data.data.deleted == true){
                  likesCount -= 1;
                  
              }else{
                  likesCount += 1;
              }


              $(self).attr('data-likes', likesCount);
              $(self).html(`${likesCount} Likes`);

          })
          .fail(function(errData) {
              console.log('error in completing the request');
          });
          

      });
  }
}