// src/Tiptap.tsx
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react';
import Placeholder from "@tiptap/extension-placeholder";

import StarterKit from "@tiptap/starter-kit";
import "../styles/tiptap.css"

export default function Tiptap(){
    const editor = useEditor({
    extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Write something …',
            })
        ]
    });
    function onBoldClick(event){
        event.preventDefault();
        editor.chain().focus().toggleBold().run();
    }
    function onItalicClick(event){
        event.preventDefault();
        editor.chain().focus().toggleItalic().run();
    }
    function onStrikeClick(event){
        event.preventDefault();
        editor.chain().focus().toggleStrike().run();
    }
    function onClearFormatClick(event){
        event.preventDefault();
        editor.chain().selectAll().unsetBold().unsetStrike().unsetItalic().run();
    }




    return (
    <div className="editor">
        <div className="buttonBar">
            <button onClick={onBoldClick}>Bold</button>
            <button onClick={onStrikeClick}>Strike</button>
            <button onClick={onItalicClick}>Italic</button>
            <button onClick={onClearFormatClick}>Clear Format</button>
        </div>
        <EditorContent editor={editor}/>

    </div>
    );
}
        // <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
        // <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>