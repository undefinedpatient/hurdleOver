import Header from "./Header";
import Footer from "./Footer";
import Tiptap from "../components/Tiptap";
import "../styles/createPostPage.css"
import "../styles/tiptap.css"

export default function CreatePostPage(){
    

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
                    <Tiptap/>
                    <input type="file" accept="image/*"></input>
                    <span className="buttonContainer">
                        <button type="submit">Save as Draft</button>
                        <button type="submit">Post</button>
                    </span>
                </form>
            </main>
            <Footer/>
        </>
    );
}