import { useState, useEffect} from 'react';
import '../styles/styles.css';
import '../styles/index.css';

import {useContext} from "react";
import {UserContext} from "../UserContext.jsx";
import Post from '../components/Post';
import Header from './Header';
import Footer from '../components/Footer';

export default function IndexPage() {
	const [posts, setPosts] = useState([]);
	const {userInfo, setUserInfo} = useContext(UserContext);
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach(
				(value, index)=>{
					if(value.isIntersecting){
						value.target.classList.add("isViewed");
					}else{
						value.target.classList.remove("isViewed");
					}
					
				}
			);
		},
		{
			threshold: 0.1,
		}
	);
	useEffect(()=>{
		observer.observe(document.querySelector(".welcomeMessage"));
		observer.observe(document.querySelector(".aboutUsHeader"));
		observer.observe(document.querySelector(".aboutUsContent"));
		observer.observe(document.querySelector(".questions"));

		
		async function getPosts(){
			const response = await fetch("http://localhost:4000/post",{
				method: "GET",
			})
			
			const postListJSON = await response.json();
			setPosts(postListJSON);
		}
		async function getUsername(){
			const response = await fetch("http://localhost:4000/post",{
				method: "GET",
			})
			
			const postListJSON = await response.json();
			setPosts(postListJSON);
		}
		getPosts();
	},[]);
	return (
		<>
			<Header/>
			<main className="indexPage">
				<div className="background">
					<h1 className="welcomeMessage">{"Welcome".concat((userInfo.username)?", ".concat(userInfo.username):"")}</h1>
				</div>
				<div className="aboutUs">
					<h2 className="aboutUsHeader">About Us</h2>
					<p className="aboutUsContent">
						&emsp;&emsp;Welcome to HurdleOver, your go-to forum for all things Minecraft and block-style Blender creations!
						This vibrant community is dedicated to enthusiasts, creators, and problem-solvers who are passionate about crafting stunning blocky worlds, whether in Minecraft’s pixelated universe or through the limitless possibilities of Blender’s 3D modeling. Here, you can ask questions, share tips, and troubleshoot challenges related to building intricate structures, designing custom block-style models, or mastering Blender techniques for Minecraft-inspired art.
						From beginner builders to seasoned 3D artists, HurdleOver is a space to connect, learn, and inspire each other in the art of block-based creativity.
						Join us to overcome hurdles, exchange ideas, and bring your pixel-perfect visions to life!
					</p>
				</div>
				<div className="faq">
					<div className="questions">
						<span>
							<p className="question">
								1. How to use?
							</p>
							<p className="answer">
								Wihout an account you can nagivate all the posts in the forum section. But you still cannot create posts nor comment under any posts.
								After creating account and logging in, you can create a new post on the top right corner, choosing the right category and fill in the info/image/video link, submit it and you are good to go.
							</p>
						</span>
						<span>
							<p className="question">
								2. How do I change my username?
							</p>
							<p className="answer">
								Click on yout current username on the top right corner, you will be directed into the setting section.
							</p>
						</span>
						<span>
							<p className="question">
								3. Why you do not allow inserting image?
							</p>
							<p className="answer">
								Image are tedious and requiring large space for storage. I do not have money to buy a server for image storage.
							</p>
						</span>
					</div>
					
				</div>
				<Footer/>
			</main>
		</>
  	)
}