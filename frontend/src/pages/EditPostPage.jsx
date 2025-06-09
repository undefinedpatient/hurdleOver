// src/Tiptap.tsx
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

import "../styles/createPostPage.css";
import "../styles/tiptap.css";

import Header from "./Header";
import Footer from "../components/Footer.jsx";
import Tiptap from "../components/Tiptap";


import { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {UserContext} from "../UserContext.jsx";
import { useEffect } from 'react';

export default function EditPostPage(){
    // Local Variables
    const [title,setTitle] = useState("");
    const [category,setCategory] = useState("");
    const [summary,setSummary] = useState("");
    //
    const params = useParams();
    const nagivate = useNavigate();
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
        ],
        content: ""
    });
    // Fetch the post info upon refresh
    useEffect(()=>{
        async function setPostInfo(){
            const response = await fetch("http://localhost:4000/post/".concat(params.id), {
                method: "GET",
                credentials: "include"
            });
            const postInfo = await response.json();
            setTitle(postInfo.title);
            setCategory(postInfo.category);
            setSummary(postInfo.summary);
            editor.commands.setContent(postInfo.content);
        }
        setPostInfo();
    },[]);

    async function onCreatePost(event){
        event.preventDefault();
        const data = new FormData();
        data.set("title", title);
        data.set("summary", summary);
        data.set("category", category);
        data.set("content", editor.getHTML());
        const response = await fetch("http://localhost:4000/post", {
            method: "POST",
            body: JSON.stringify({
                title:title,
                summary:summary,
                category:category,
                content: editor.getHTML()
            }),
            headers: {'Content-Type':'application/json'},
            credentials: "include"
        });
        if(response.status==200){
            nagivate("/forum");
        }
    }
    async function onDeletePost(event){
        event.preventDefault();
        const response = await fetch("http://localhost:4000/deletepost/".concat(params.id), {
            method: "DELETE",
            credentials: "include"
        });
        if(response.status==200){
            nagivate("/forum");
        }
    }
    return (
        <>
            <Header/>
            <main className="createPostPage">
                <form onSubmit={onCreatePost} encType="multipart/form-data"> 
                    <h2>Edit Post</h2>
                    <input required type="text" id="title" placeholder="Title" defaultValue={title} onChange={event=>setTitle(event.target.value)}></input>
                    <select required name="dropdown" id="category" defaultValue={category} onChange={event=>setCategory(event.target.value)}>
                        <option value="none" disabled>Select your category</option>
                        <option value="modelling">Modelling</option>
                        <option value="lighting">Lighting</option>
                        <option value="texturing">Texturing</option>
                        <option value="animating">Animating</option>
                    </select>
                    <input required type="text" id="summary" defaultValue={summary} placeholder="Summary (max 120 characters)" onChange={event=>setSummary(event.target.value) } maxLength={120}></input>
                    <Tiptap editor={editor}/>
                    <button type="submit">Update</button>
                    <button type="submit" onClick={onDeletePost}>Delete</button>
                </form>
            </main>
            <Footer/>
        </>
    );
}