// src/Tiptap.tsx
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react';
import Placeholder from "@tiptap/extension-placeholder";
import Document from '@tiptap/extension-document'
import Image from "@tiptap/extension-image"
import Dropcursor from '@tiptap/extension-dropcursor'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import StarterKit from "@tiptap/starter-kit";
import "../styles/tiptap.css"

import Header from "./Header";
import Footer from "./Footer";
import Tiptap from "../components/Tiptap";

import "../styles/createPostPage.css"
import "../styles/tiptap.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePostPage(){
    // Local Variables
    const [title,setTitle] = useState("");
    const [category,setCategory] = useState("");
    const [summary,setSummary] = useState("");
    //
    const nagivate = useNavigate();
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Write something …',
            }),
            Document,
            Paragraph,
            Text,
            Image,
            Dropcursor
        ]
    });

    async function onSaveDraft(event){
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
            headers: {'Content-Type':'application/json'}
        });
        if(response.status==200){
            nagivate("/forum");
        }
    }
    return (
        <>
            <Header/>
            <main className="createPostPage">
                <form onSubmit={onSaveDraft} encType="multipart/form-data"> 
                    <h2>Create New Post</h2>
                    <input required type="text" id="title" placeholder="Title" onChange={event=>setTitle(event.target.value)}></input>
                    <select required name="dropdown" id="category" defaultValue="none" onChange={event=>setCategory(event.target.value)}>
                        <option value="none" disabled>Select your category</option>
                        <option value="modelling">Modelling</option>
                        <option value="lighting">Lighting</option>
                        <option value="texturing">Texturing</option>
                        <option value="animating">Animating</option>
                    </select>
                    <input required type="text" id="summary" placeholder="Summary (10-50 words)" onChange={event=>setSummary(event.target.value)}></input>
                    <Tiptap editor={editor}/>
                    <button>Post</button>
                </form>
            </main>
            <Footer/>
        </>
    );
}