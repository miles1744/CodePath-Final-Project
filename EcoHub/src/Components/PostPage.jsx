import { useState, useEffect } from "react"
import { Link, Outlet, useParams } from 'react-router-dom'
import "../Css/App.css"
import { supabase } from "../client.js"
import { UserAuth } from "../context/AuthContext.jsx"

const postPage = () =>{

    const {id} = useParams();
    const [post, setPost] = useState({});
    const [comment, setComment] = useState({});
    const [comments, setComments] = useState([]);
    const [upvotes, setUpvotes] = useState(0);
    const { session } = UserAuth();

    

    const deletePost = async (event) => {
      event.preventDefault();
      
        await supabase
          .from('Posts')
          .delete()
          .eq('id', id); 
      
        window.location = "/Home";
      }

      const deleteComment = async (commentId) => {
      
        await supabase
          .from('Comments')
          .delete()
          .eq('id', commentId); 

          setComments(comments.filter((c) => c.id !== commentId));

        
        window.location = `/Post/${id}`;
      }

      const createComment = async (event) => {
        event.preventDefault();
      
        const { data: { user } } = await supabase.auth.getUser();
      
         await supabase
          .from('Comments')
          .insert({
            comment: comment,
            post_id: id,
            user_id: session?.user?.id ,
          })
          .select();

         setComments([...comments, user["comment"]]); 
         setComment(""); 
         
        window.location.href = `/Post/${id}`;
      };
      
    

      useEffect(() => {
        (async () => {
          const { data, error } = await supabase
            .from("Comments")
            .select("*")
            .eq("post_id", post.id);

          if (error) console.error("Error loading comments:", error.message);
          else setComments(data || []);
          })();
      }, [])

      useEffect(() => {
          (async () => {
            const { data, error } = await supabase
              .from("Posts")
              .select("*")
              .eq("id", id)
              .single();
            if (error) console.error(error.message);
            else {
              setPost(data);
              setUpvotes(data.Upvotes || 0);
            }
          })();
      }, []);
      


      const handleAddUpVote = async (e) => {
        e.preventDefault();
      
        const { data: postData, error: fetchError } = await supabase
          .from("Posts")
          .select("Upvotes")
          .eq("id", id)
          .single();
      
        if (fetchError) {
          console.error("Failed to fetch latest upvote:", fetchError);
          return;
        }
      
        const updated = postData.Upvotes + 1;
      
        const { error: updateError } = await supabase
          .from("Posts")
          .update({ Upvotes: updated })
          .eq("id", id);
      
        if (!updateError) {
          setUpvotes(updated);
        } else {
          console.error("Failed to update comments:", updateError);
        }
      };
      
      

    const getFriendlyTimeAgo = (createdAt) => {
        const { seconds, minutes, hours, days, months, years } = getTimeSincePost(createdAt);
        if (seconds === 1) return "1 second ago";
        if (seconds < 60 && seconds != 1) return `${seconds} seconds ago`;
        if (minutes === 1) return "1 minute ago";
        if (minutes < 60 && minutes != 1) return `${minutes} minutes ago`;
        if (hours === 1) return "1 hour ago";
        if (hours < 24 && hours != 1) return `${hours} hours ago`;
        if (days === 1) return "1 day ago";
        if (days < 30) return `${days} days ago`;
        if (months === 1) return "1 month ago";
        if (months < 12) return `${months} months ago`;
        return `${years} years ago`;
      };
      
    
      const getTimeSincePost = (createdAt) => {
        const postDate = new Date(createdAt);
        const now = new Date();
        const diff = now - postDate; 
      
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      
        return {
          seconds,
          minutes,
          hours,
          days,
          months,
          years
        };
      };


      useEffect(() => {
        const fetchComments = async () => {

          const { data, error } = await supabase
            .from("Comments")
            .select("*")
            .eq("post_id", id); 
          setComments(data);
        };
        fetchComments();
      }, []);
      





    

    return(
        <>
            <Outlet />
            <div className="post-page-container">
                <div className="post-page">
                    <div className="title">
                    {<p>{(!post?.created_at) ?  <p>Loading…</p> :getFriendlyTimeAgo(post.created_at)}</p>}
                    {session?.user?.id === post.user_id && (
                      <div className="button-container">
                          <Link to={`/Update/${post.id}`}><button className="edit-btn">Edit</button></Link>
                          <button className="delete-btn" onClick={deletePost}>Delete</button>
                      </div>
                    )}
                    </div>
                    <h4>{post.Title}</h4>
                    <p>{post.Content}</p>
                    {post.URL != "" ? 
                    (<img src={post.URL}/>) :
                    <div>
                    </div>}

                <div className="upvote-container">
                    <p className="upvote" onClick={handleAddUpVote}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up" viewBox="0 0 16 16"><path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/></svg></p>
                    <p>{upvotes} upvotes</p>
                </div>

                    <div className="comments-container">
                        {
                            comments && comments.length > 0 ? comments.map((c, index) => (
                                <div className="comment">
                                  <p key={index}>- {c.comment !== "{}" ? c.comment: ""}</p>
                                  {session?.user?.id === c.user_id && (
                                    <div className="comment-section">
                                      <svg onClick={() => deleteComment(c.id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                      </svg>
                                    </div>
                                  )}
                                </div>
                            )):
                            <div>
                            </div>
                        }
                        <form>
                            <input 
                            className="input-comment" 
                            placeholder="Leave a comment..." 
                            type="text" value={comment.text} 
                            onChange={(e) => {setComment(e.target.value)}}
                            maxLength={145}
                            />
                            <button onClick={createComment} className="input-btn" type="submit">Add Comment</button>
                        </form>
                    </div>
                    </div>
            </div>
        </>
    )
}

export default postPage;