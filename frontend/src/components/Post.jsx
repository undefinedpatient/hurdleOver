import { useState } from 'react';
import { Link } from 'react-router-dom';
import {format} from "date-fns";

import '../styles/styles.css';
import '../styles/post.css';

import iconModelling from '../assets/cube.svg';
import iconTexturing from '../assets/texture.svg';
import iconLighting from '../assets/lighting.svg';
import iconAnimating from '../assets/keyframes.svg';
// : {_id, title, username, summary, category, updatedAt, commentCount, upvotes, downvotes, isResolved}
export default function Post({post}){
    function getCategorlURL(category){
        switch (category) {
            case "modelling":
                return iconModelling;
            case "lighting":
                return iconLighting;
            case "texturing":
                return iconTexturing;
            case "animating":
                return iconAnimating;
            default:
                return iconModelling;
        }
    }
    console.log(post);
    return (
        <div>
            <Link to={"/post/"+post._id} className="post">
                <img src = {getCategorlURL(post.category)}></img>
                <div>
                    <h5>{post.title}</h5>
                    <p>
                        <span className="author">{post.userId?.username}</span>
                        <time>&nbsp;{format(new Date(post.updatedAt), "Pp")}&nbsp;</time>
                    </p>
                    <p>Category: {String(post.category).charAt(0).toUpperCase().concat(String(post.category).slice(1))}</p>
                    <p>{post.summary}</p>
                    <div className="postData">
                        <span id="commentCount">Comments: {(post.commentCount!=null&&post.commentCount!=undefined)?post.commentCount:0}</span>
                        <span id="upvoteCount">Upvotes: {(post.upvotes!=null&&post.upvotes!=undefined)?post.upvotes:0}</span>
                        <span id="downvoteCount">Downvotes: {(post.downvotes!=null&&post.downvotes!=undefined)?post.downvotes:0}</span>
                    </div>
                    <div className={(post.isResolved)?"resolved":"notResolved"}>
                        {(post.isResolved)?"Resolved":"Not Resolved"}
                    </div>
                </div>
            </Link>
        </div>
    );
}