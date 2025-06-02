// src/Tiptap.tsx
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react';
import "../styles/tiptap.css"
// Require an editor as an input
export default function Tiptap({ editor }){
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
    function onAddImageClick(event){
        event.preventDefault();
        const url = window.prompt('URL');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }
    function onClearClick(event){
        event.preventDefault();
        editor.chain().clearContent().run();
    }
    return (
        <div className="editor">
            <div className="buttonBar">
                <button onClick={onBoldClick}>Bold</button>
                <button onClick={onStrikeClick}>Strike</button>
                <button onClick={onItalicClick}>Italic</button>
                <button onClick={onAddImageClick}>Add Image</button>
                <button onClick={onClearClick}>Clear</button>
            </div>
            <EditorContent editor={editor} id="editor"/>

        </div>
    );
}