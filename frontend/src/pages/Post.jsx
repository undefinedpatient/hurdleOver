import { useState } from 'react';
import {format} from "date-fns";
import '../styles/styles.css';
import '../styles/index.css';
import iconModelling from '../assets/cube.svg';
import iconTexturing from '../assets/texture.svg';
import iconLighting from '../assets/lighting.svg';
import iconAnimating from '../assets/keyframes.svg';
function Post({title, author, summary, category, updatedAt}){
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
        <>
            <div className="post">
                <img src = {getCategorlURL(category)}></img>
                <div>
                    <h5>{title}</h5>
                    <p>
                        <a href = "" className="author">{author}</a>
                        <time>&nbsp;{format(new Date(updatedAt), "Pp")}&nbsp;</time>
                    </p>
                    <p>Category: {String(category).charAt(0).toUpperCase().concat(String(category).slice(1))}</p>
                    <p>{summary}</p>
                </div>
            </div>
        </>
    );
}

export default Post