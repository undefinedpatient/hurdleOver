// src/Tiptap.tsx
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react';
import "../styles/tiptap.css"
// Require an editor as an input
export default function Tiptap({ editor }){
    function onAddURLClicked(event){
        event.preventDefault();
        const url = window.prompt('URL');
        if(url===null){
            return;
        }
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return
        }
        try {
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
        } catch (e) {
            alert(e.message);
        }
    }

    return (
        <div className="editor">
            <div className="buttonBar">
                <button
                    onClick={(event) => {
                        event.preventDefault();
                        editor.chain().focus().toggleHeading({ level: 1 }).run();
                    }}
                    className={editor.isActive('heading', { level: 1 }) ? 'active' : ''}>
                    H1
                </button>
                <button
                    onClick={(event) => {
                        event.preventDefault();
                        editor.chain().focus().toggleHeading({ level: 2 }).run();
                    }}
                    className={editor.isActive('heading', { level: 2 }) ? 'active' : ''}>
                    H2
                </button>
                <button
                    onClick={(event) => {
                        event.preventDefault();
                        editor.chain().focus().toggleHeading({ level: 3 }).run();
                    }}
                    className={editor.isActive('heading', { level: 3 }) ? 'active' : ''}>
                    H3
                </button>
                <button 
                    onClick={(event) => {
                        event.preventDefault();
                        editor.chain().focus().toggleBold().run();
                    }}
                    className={editor.isActive('bold') ? 'active' : ''}>
                    Bold
                </button>
                <button 
                    onClick={(event) => {
                        event.preventDefault();
                        editor.chain().focus().toggleStrike().run();
                    }} 
                    className={editor.isActive('strike') ? 'active' : ''}>
                    Strike
                </button>
                <button
                    onClick={(event) => {
                        event.preventDefault();
                        editor.chain().focus().toggleItalic().run();
                    }}
                    className={editor.isActive('italic') ? 'active' : ''}>
                    Italic
                </button>
                <button 
                    onClick={(event) => {
                        event.preventDefault();
                        editor.chain().focus().toggleHighlight().run();
                    }}
                    className={editor.isActive('highlight') ? 'active' : ''}>
                    Highlight
                </button>
                <button onClick={onAddURLClicked} className={editor.isActive('link') ? 'active' : ''}>URL Link</button>
                <button 
                    onClick={(event)=>{
                        event.preventDefault();
                        editor.chain().clearContent().run();
                        
                    }
                }>
                    Clear
                </button>
            </div>
            <EditorContent editor={editor} id="editor"/>
        </div>
    );
}