import { useState } from "react";

import "../styles/styles.css";
import "../styles/forum.css";

import Post from "./Post"
import Header from "./Header";
import Footer from "./Footer";
export default function ForumPage(){
    return(
        <main className="forumPage">
            <Header/>
            <h1>Forum</h1>
            <div className="postEntries">
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
            </div>
            <Footer/>
        </main>
    );
}