import "../styles/comment.css";

export default function Comment({username, content}){
    return (
        <div className="comment">
            <div className="commentInfo">{(username!=undefined||username!=null)?username:"<anonymous>"}</div>
            <div className="commentContent" dangerouslySetInnerHTML={{__html:content}}></div>
        </div>
    );
}