import { useParams } from "react-router-dom";
import "../styles/comment.css";
import { useEffect, useState, useContext } from "react";
// import { UserContext } from "../UserContext.jsx";

// canDeleteByCurrentUser is to check if the author of the comment and the user is the same user, if yes, allow them to delete the comment
export default function Comment({commentId, userId, content, createdAt, canDeleteByCurrentUser}){
    const [username, setUsername] = useState("<Anonymous>")
    const [isConfirmationWindowOpened, setConfirmationWindowOpened] = useState(false);
    // const {userInfo, setUserInfo} = useContext(UserContext);
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
    async function onDeleteCommentConfirmClicked(event){
        event.preventDefault();
        
        const response = await fetch(`http://localhost:4000/comment/${commentId}`,
            {
                method: "DELETE"
            }
        )
        if(response.status==200){
            window.location.reload();
        }
        setConfirmationWindowOpened(false);
    }
    async function onDeleteCommentCancelClicked(event){
        setConfirmationWindowOpened(false);
    }
    async function onDeleteCommentClicked(){
        setConfirmationWindowOpened(true);
    }
    return (
        <div className="comment">
            <div className="commentInfo">From: {username}&emsp;&emsp;At: {createdAt}</div>
            <div className="commentContent" dangerouslySetInnerHTML={{__html:content}}></div>
            {
                (canDeleteByCurrentUser)?<span className="deleteCommentButton" onClick={onDeleteCommentClicked}>Delete</span>:<span></span>
            }
            <div className={"confirmDeletionWindow".concat((isConfirmationWindowOpened)?" active":"")}>
                <p>Confirm Comment Deletion?</p>
                <span>
                    <button onClick={onDeleteCommentConfirmClicked}>Confirm</button>
                    <button onClick={onDeleteCommentCancelClicked}>Cancel</button>
                </span>
                
            </div>
        </div>
    );
}