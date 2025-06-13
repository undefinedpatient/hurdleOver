import { useContext, useEffect, useState } from 'react';

import Post from "../components/Post.jsx"
import Header from "./Header.jsx";
import Footer from "../components/Footer.jsx";

import "../styles/styles.css";
import "../styles/forumPage.css";

export default function ForumPage(){
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState("");
    const [order, setOrder] = useState("ascending");
    useEffect(()=>{
        async function getPosts(){
            const response = await fetch("http://localhost:4000/post?" + new URLSearchParams({
                order: order,
                category: category
            }).toString(),{
                method: "GET",
            })
            
            const postListJSON = await response.json();
            setPosts(postListJSON);
        }
        getPosts();
    },[order, category]);
    
    return(
        <>
            <Header/>
            <main className="forumPage">
                <h1>Forum</h1>
                <div className="filterAndSort">
                    <form className="filterAndSortSectionForm" action="">
                        <select required name="dropdown" id="category" defaultValue="ascending" onChange={event=>setOrder(event.target.value)}>
                            <option value="ascending">Ascending</option>
                            <option value="descending">Descending</option>
                        </select>
                        <select name="dropdown" id="category" defaultValue="" onChange={event=>setCategory(event.target.value)}>
                            <option value="">No Specific Category</option>
                            <option value="modelling">Modelling</option>
                            <option value="lighting">Lighting</option>
                            <option value="animating">Animating</option>
                            <option value="texturing">Texturing</option>
                        </select>
                    </form>
                </div>
                <div className="postEntries">
                    {
                        (posts.length>0)? posts.map((post)=>{
                            return <Post _id={post._id} title={post.title} username={post.userId.username} summary={post.summary} category={post.category} updatedAt={post.updatedAt} commentCount={post.commentCount}/>
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