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

import { Link as ReactLink} from 'react-router-dom';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {format} from "date-fns";

import Header from "./Header.jsx";
import Footer from "../components/Footer.jsx";
import TipTap from "../components/Tiptap.jsx";

import "../styles/styles.css";
import "../styles/postPage.css";

export default function PostPage(){
    const params = useParams();
    const [post, setPost] = useState([]);
    const [isActiveCommentEditor, setIsActiveCommentEditor] = useState(false);
    const [userInfo, setUserInfo] = useState([]);
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
            await setPost(postInfo);
        }
        getPost();
        async function identifyUser(){
            const response = await fetch('http://localhost:4000/profile',
                {
                    method: 'GET',
                    credentials: "include"
                }
            )
            const userInfo = await response.json();
            await setUserInfo(userInfo);
        }
        identifyUser();
    }
    ,[]);

    function toggleCommentEditor(){
        setIsActiveCommentEditor(!isActiveCommentEditor);
        console.log(isActiveCommentEditor);
    }


    return (
        <div className="postPage">
            <Header/>
            <div className="post">
                <h2 className="title">{post.title}</h2>
                <h5 className="author">{post.author}</h5>
                <time className="date">&nbsp;Created At: {post.createdAt}&nbsp;&nbsp;Updated At: {post.updatedAt}&nbsp;</time>
                <div className="content" dangerouslySetInnerHTML={{__html:post.content}}></div>
                <ReactLink className={
                    "authorEditLink".concat((userInfo.username==post.author)?" active":"")

                } to={"/editpost/".concat(params.id)}></ReactLink>
                <div className="buttonBar">
                    <button className="buttonComment" onClick={toggleCommentEditor}></button>
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
                    <button className="submitComment">Submit</button>
                </div>
            </div>
            
            <Footer/>
        </div>
    )
}