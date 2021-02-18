{
    let createPost = function(){
        let newPostForm = $('#new_post_form');  ///////get form here
        

        newPostForm.submit(function(e){   ////// on submit this form event handler is called
            e.preventDefault();       /////////// prevent to relode auto data
            console.log('data come from post controller');

            $.ajax({
                type: 'post',
                url: 'posts/create',
                data: newPostForm.serialize(),
                success: function(data){        //////  data come from post controller while fetching ajax request
                   let newPost = newPostDom(data.data.post);
                   $('#post-container>ul').prepend(newPost);
                   deletePost($(' .delete_post_button',newPost));
            
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM

    let newPostDom = function(post){
        console.log('new post dom',post);

        return $(`<li id="post-${post._id}">

    
            <small>
                <a class="delete_post_button" href="/posts/destroy/${post._id}">
                    X
                </a>
            </small>
            ${post.content}
    
    
    
        
    
        <small>${post.user.name}</small>
        <br>
                        <small>
                            
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=post">
                                    0 Likes
                                </a>
                            
                        </small>

        <div class='comment-container'>
    
            <form action="comments/create" method="POST">
                <input type="text" placeholder="write comment..." name='content'>
                <input type="hidden" name='post' value='${post._id}'>
                <input type="submit" value="post">
            
            </form>
    
            
        </div>
    </li>`);
    }

    // method to delete a post from dom/////
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type : 'get',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    $(`#post-${data.data.post_id}`).remove(); //comes from post controler ajax

                },error : function(error){
                    console.log(error.responseText);

                }
            });
        });
    }
    

    createPost();
}

// <% for(comment of post.comment) {%>
                
//     <h1><%=comment.content%></h1>



//     <% if(locals.user && (locals.user.id==comment.user.id)) {%>

//         <small>
//             <a href="/comments/destroy/<%=comment.id%>">
//                 X
//             </a>
//         </small>

//     <%}%>






//     <small><%=comment.user.name%></small>
    
// <%}%>
