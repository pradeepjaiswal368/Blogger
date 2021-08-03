{


    let addFriend = function(){

        let toggleFriend = $('#add-friend');
       
        toggleFriend.submit(function(e){
            e.preventDefault();
           

            $.ajax({
                type : 'post',
                url :  $(toggleFriend).attr('action'),
                success : function(data){
                   
                    if(data.data.deleted == true){
                        statusText(true);                    
                    }else{
                        statusText(false);          
                    }

                   
                },

               

                error : function(error){
                              console.log(error.responseText);
                          }
            });


        })

        var button = document.getElementById('button');
        function statusText(val){
            if(val == true){
                button.value = 'Remove'
                
            }else{
                button.value = 'Add'
            }
        } 


    }


    addFriend();
}