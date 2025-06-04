import { useContext, useEffect, useState } from 'react';

import Post from "./Post"
import Header from "./Header";
import Footer from "./Footer";

import "../styles/styles.css";
import "../styles/forumPage.css";

export default function ForumPage(){
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState("");
    useEffect(()=>{
        async function getPosts(){
            const response = await fetch("http://localhost:4000/post",{
                method: "GET",
            })
            
            const postListJSON = await response.json();
            setPosts(postListJSON);
        }
        getPosts();
    },[]);
    return(
        <>
            <Header/>
            <main className="forumPage">
                <h1>Forum</h1>
                <div className="filterAndSort">
                    <form className="filterSection" action="">
                        <input></input>
                        <select required name="dropdown" id="category" defaultValue="none" onChange={event=>setCategory(event.target.value)}>
                            <option value="none" disabled>Select your category</option>
                            <option value="modelling">Modelling</option>
                            <option value="lighting">Lighting</option>
                            <option value="texturing">Texturing</option>
                            <option value="animating">Animating</option>
                        </select>
                        <input type="checkbox"></input>
                        <button>Filter</button>
                    </form>
                    <form className="filterSection" action="">
                        <select required name="dropdown" id="category" defaultValue="ascending" onChange={event=>setCategory(event.target.value)}>
                            <option value="ascending">Ascending</option>
                            <option value="descending">Descending</option>

                        </select>
                        <button>Filter</button>
                    </form>
                </div>
                <div className="postEntries">
                    {(posts.length>0)? posts.map((post)=>{
                        return <Post title={post.title} summary={post.summary} category={post.category} updatedAt={post.updatedAt}/>
                    }
                    ):<div>No posts available Q.Q </div>}
                </div>
                <Footer/>
            </main>
        </>
        
    );
}