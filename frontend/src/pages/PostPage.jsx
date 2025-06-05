import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {format} from "date-fns";

import Header from "./Header.jsx";
import Footer from "../components/Footer.jsx";
import "../styles/styles.css";
import "../styles/postPage.css";

export default function PostPage(){
    const params = useParams();
    const [post, setPost] = useState([]);
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
    }
    ,[]);
    return (
        <div className="postPage">
            <Header/>
            <div className="post">
                <h2 className="title">{post.title}</h2>
                <h5 className="author">{post.author}</h5>
                <time className="date">&nbsp;Created At: {post.createdAt}&nbsp;&nbsp;Updated At: {post.updatedAt}&nbsp;</time>
                <div className="content" dangerouslySetInnerHTML={{__html:post.content}}></div>
            </div>
            <div className="comment">
                <h3>Your Answer</h3>
            </div>
            <Footer/>
        </div>
    )
}