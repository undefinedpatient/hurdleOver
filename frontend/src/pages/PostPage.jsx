import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react';
import Placeholder from "@tiptap/extension-placeholder";
import Document from '@tiptap/extension-document'
import Dropcursor from "@tiptap/extension-dropcursor";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Link from '@tiptap/extension-link';
import Highlight from "@tiptap/extension-highlight";
import Heading from "@tiptap/extension-heading";
import { UserContext } from '../UserContext.jsx';
import { Link as ReactLink} from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {format} from "date-fns";

import Header from "./Header.jsx";
import Footer from "../components/Footer.jsx";
import TipTap from "../components/Tiptap.jsx";

import "../styles/styles.css";
import "../styles/postPage.css";
import Comment from '../components/Comment.jsx';

export default function PostPage(){
    const params = useParams();
    
    const [postInfo, setPostInfo] = useState([]);
    const [comments, setComments] = useState([]);
    const [isActiveCommentEditor, setIsActiveCommentEditor] = useState(false);
    const {userInfo, setUserInfo} = useContext(UserContext);
    const editor = useEditor({
            extensions: [
                Document,
                Paragraph,
                Text,
                Image,
                Bold, Italic, Strike,
                Heading.configure({ levels: [1, 2, 3] }),
                Highlight.configure({ multicolor: true }),
                Dropcursor,
                Placeholder.configure({
                    placeholder: 'Write something …',
                }),
                Link.configure({
                    openOnClick: true,
                    autolink: true,
                    defaultProtocol: 'https'
                })
            ]
        }
    );

    useEffect(()=>{
        async function getPost(){
            const response = await fetch(`http://localhost:4000/post/${params.id}`,
                {
                    method:"GET"
                }
            );
            const postInfo = await response.json();
            await setPostInfo(postInfo);
        }
        
        async function getComments(){
            const response = await fetch(`http://localhost:4000/comment/${params.id}`,
                {
                    method: "GET"
                }
            );
            const commentsInfo = await response.json();
            
            await setComments(commentsInfo);
        }
        getPost();
        getComments();
    }
    ,[]);

    function toggleCommentEditor(){
        setIsActiveCommentEditor(!isActiveCommentEditor);
    }
    async function onSubmitCommentClicked(event){
        // console.log(userInfo);
        event.preventDefault();
        // Comment Input Validation
        if(editor==null||editor.getHTML().length==0){
            return;
        }
        
        const response = await fetch("http://localhost:4000/comment",{
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                postId: postInfo.id,
                userId: userInfo.id,
                content: editor.getHTML()
            }),
            credentials: "include"
        });
        if(response.status==200){
            // Reload the page
            window.location.reload();
        }else{
            alert("You need an account to leave comment!");
        }
    }

    return (
        <div className="postPage">
            <Header/>
            <div className="post">
                <h2 className="title">{postInfo.title}</h2>
                <h5 className="author">{postInfo.username}</h5>
                <time className="date">&nbsp;Created At: {postInfo.createdAt}&nbsp;&nbsp;Updated At: {postInfo.updatedAt}&nbsp;</time>
                <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}}></div>
                <ReactLink className={
                    "authorEditLink".concat((userInfo.username==postInfo.username)?" active":"")

                } to={"/editpost/".concat(params.id)}></ReactLink>
                <div className="buttonBar">
                    <button className="buttonComment" onClick={toggleCommentEditor}></button>
                    <span>{(postInfo.commentCount!=null&&postInfo.commentCount!=undefined)?postInfo.commentCount:0}</span>
                    <button className="upvote"></button>
                    <span>0</span>
                    <button className="downvote"></button>
                    <span>0</span>
                </div>
            </div>
            <div className="commentList">
                <h3>Comments</h3>
                <div className={"commentEditor".concat((isActiveCommentEditor==true)?" active":" ")}>
                    <TipTap editor={editor}/><br></br>
                    <button className="submitComment" onClick={onSubmitCommentClicked}>Submit</button>
                </div>
                {
                    (comments!=null && comments.length!=0)?comments.map((comment)=>{
                        console.log(comment);
                        return (<>
                            <Comment commentId={comment._id} userId={comment.userId} content={comment.content} createdAt={comment.createdAt} canDeleteByCurrentUser={(comment.userId==userInfo.id)}/>
                        </>
                        );
                    }):<div>Not Comment yet</div>
                }
            </div>
            
            <Footer/>
        </div>
    )
}