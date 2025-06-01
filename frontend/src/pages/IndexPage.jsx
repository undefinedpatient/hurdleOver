import { useState } from 'react';
import '../styles/styles.css';
import '../styles/index.css';
import Post from './Post';
import Header from './Header';
import Footer from './Footer';

export default function IndexPage() {
	return (
		<>
			<Header/>
			<main className="indexPage">
				<div className="background">
					<h1>Welcome</h1>
				</div>
				<div className="aboutUs">
					<h2>About Us</h2>
						<p>
							&emsp;&emsp;Welcome to HurdleOver, your go-to forum for all things Minecraft and block-style Blender creations!
							This vibrant community is dedicated to enthusiasts, creators, and problem-solvers who are passionate about crafting stunning blocky worlds, whether in Minecraft’s pixelated universe or through the limitless possibilities of Blender’s 3D modeling. Here, you can ask questions, share tips, and troubleshoot challenges related to building intricate structures, designing custom block-style models, or mastering Blender techniques for Minecraft-inspired art.
							From beginner builders to seasoned 3D artists, HurdleOver is a space to connect, learn, and inspire each other in the art of block-based creativity.
							Join us to overcome hurdles, exchange ideas, and bring your pixel-perfect visions to life!
						</p>
				</div>
				<div className="postEntries">
					<Post/>
					<Post/>
					<Post/>
					<Post/>
				</div>
				<Footer/>
			</main>
		</>
  	)
}