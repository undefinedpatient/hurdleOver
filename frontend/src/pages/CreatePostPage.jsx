// src/Tiptap.tsx
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react';
import Placeholder from "@tiptap/extension-placeholder";
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import StarterKit from "@tiptap/starter-kit";
import "../styles/tiptap.css"

import Header from "./Header";
import Footer from "./Footer";
import Tiptap from "../components/Tiptap";

import "../styles/createPostPage.css"
import "../styles/tiptap.css"

export default function CreatePostPage(){
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Write something …',
            }),
            Document,
            Paragraph,
            Text
        ]
    });
    function onSaveDraft(event){
        event.preventDefault();
        let text = editor.getHTML();
        console.log(text);
    }
    return (
        <>
            <Header/>
            <main className="createPostPage">
                <form>
                    <h2>Create New Post</h2>
                    <input type="text" id="title" placeholder="Title"></input>
                    <select name="dropdown">
                        <option value="option1">Modelling</option>
                        <option value="option2">Lighting</option>
                        <option value="option3">Texturing</option>
                        <option value="option4">Animating</option>
                    </select>
                    <input type="text" id="summary" placeholder="Summary (10-50 words)"></input>
                    <Tiptap editor={editor}/>
                    <input type="file" accept="image/*"></input>
                    <span className="buttonContainer">
                        <button type="submit" id="onSaveDraft" onClick={onSaveDraft}>Save Draft</button>
                        <button type="submit">Post</button>
                    </span>
                </form>
            </main>
            <Footer/>
        </>
    );
}