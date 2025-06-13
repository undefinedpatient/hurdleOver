import { useParams } from "react-router-dom";
import "../styles/comment.css";
import { useEffect, useState } from "react";
export default function Comment({userId, content}){
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
    return (
        <div className="comment">
            <div className="commentInfo">{username}</div>
            <div className="commentContent" dangerouslySetInnerHTML={{__html:content}}></div>
        </div>
    );
}