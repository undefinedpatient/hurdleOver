import { useContext, useEffect, useState } from 'react';

import Post from "../components/Post.jsx"
import Header from "./Header.jsx";
import Footer from "../components/Footer.jsx";

import "../styles/styles.css";
import "../styles/forumPage.css";

export default function ForumPage(){
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState("");
    const [resolveState, setResolvedState] = useState("");
    const [order, setOrder] = useState("ascending");
    useEffect(()=>{
        async function getPosts(){
            const response = await fetch("http://localhost:4000/post?" + new URLSearchParams({
                order: order,
                category: category,
                resolveState: resolveState
            }).toString(),{
                method: "GET",
            })
            
            const postListJSON = await response.json();
            setPosts(postListJSON);
        }
        getPosts();
    },[order, category, resolveState]);
    
    return(
        <>
            <Header/>
            <main className="forumPage">
                <h1>Forum</h1>
                <div className="filterAndSort">
                    <form className="filterAndSortSectionForm" action="">
                        <select required name="dropdown" id="category" defaultValue="ascending" onChange={event=>setOrder(event.target.value)}>
                            <option value="ascending">By Date: Ascending</option>
                            <option value="descending">By Date: Descending</option>
                            <option value="upvote">By votes: Upvotes</option>
                            <option value="downvote">By votes: Downvotes</option>
                        </select>
                        <select name="dropdown" id="category" defaultValue="" onChange={event=>setCategory(event.target.value)}>
                            <option value="">No Specific Category</option>
                            <option value="modelling">Modelling</option>
                            <option value="lighting">Lighting</option>
                            <option value="animating">Animating</option>
                            <option value="texturing">Texturing</option>
                        </select>
                        <select required name="dropdown" id="isResolved" value={resolveState} onChange={(event)=>{
                            setResolvedState(event.target.value);
                        }}>
                            <option value="">No Specific Resolve State</option>
                            <option value={"notResolved"}>Not Resolved</option>
                            <option value={"resolved"}>Resolved</option>
                        </select>
                        
                    </form>
                </div>
                <div className="postEntries">
                    {
                        (posts.length>0)? posts.map((post)=>{
                            return <Post post={post}/>
                        }
                        )
                        :
                        <div>No posts available Q.Q </div>
                    }
                </div>
                <Footer/>
            </main>
        </>
        
    );
}