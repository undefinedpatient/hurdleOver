import { useState } from 'react';
import { Link } from 'react-router-dom';
import {format} from "date-fns";

import '../styles/styles.css';
import '../styles/post.css';

import iconModelling from '../assets/cube.svg';
import iconTexturing from '../assets/texture.svg';
import iconLighting from '../assets/lighting.svg';
import iconAnimating from '../assets/keyframes.svg';
export default function Post({post: {_id, title, username, summary, category, updatedAt, commentCount, upvotes, downvotes, isResolved}}){
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
    return (
        <div>
            <Link to={"/post/"+_id} className="post">
                <img src = {getCategorlURL(category)}></img>
                <div>
                    <h5>{title}</h5>
                    <p>
                        <span className="author">{username}</span>
                        <time>&nbsp;{format(new Date(updatedAt), "Pp")}&nbsp;</time>
                    </p>
                    <p>Category: {String(category).charAt(0).toUpperCase().concat(String(category).slice(1))}</p>
                    <p>{summary}</p>
                    <div className="postData">
                        <span id="commentCount">Comments: {(commentCount!=null&&commentCount!=undefined)?commentCount:0}</span>
                        <span id="upvoteCount">Upvotes: {(upvotes!=null&&upvotes!=undefined)?upvotes:0}</span>
                        <span id="downvoteCount">Downvotes: {(downvotes!=null&&downvotes!=undefined)?downvotes:0}</span>
                    </div>
                    <div className={(isResolved)?"resolved":"notResolved"}>
                        {(isResolved)?"Resolved":"Not Resolved"}
                    </div>
                </div>
            </Link>
        </div>
    );
}