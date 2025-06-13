import { useParams } from "react-router-dom";
import "../styles/comment.css";
import { useEffect, useState } from "react";
// canDeleteByCurrentUser is to check if the author of the comment and the user is the same user, if yes, allow them to delete the comment
export default function Comment({commentId, userId, content, canDeleteByCurrentUser}){
    const [username, setUsername] = useState("<Anonymous>")
    useEffect(()=>{
        async function getUsername(){
            const response = await fetch(`http://localhost:4000/username/${userId}`)
            const username = await response.text();
            // The username text will be "" if no user is found, ${username} otherwise
            if(username.length>0){
                await setUsername(username);
            }
            
        }
        getUsername();
    }, []);
    async function onDeleteCommentClicked(){
        const response = await fetch(`http://localhost:4000/comment/${commentId}`,
            {
                method: "DELETE"
            }
        )
    }
    return (
        <div className="comment">
            <div className="commentInfo">{username}</div>
            <div className="commentContent" dangerouslySetInnerHTML={{__html:content}}></div>
            {
                (canDeleteByCurrentUser)?<span onClick={onDeleteCommentClicked}>Delete</span>:<span></span>
            }
            
        </div>
    );
}