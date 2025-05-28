import { useState } from 'react';
import './styles/styles.css';
import './styles/index.css';
import icon from './assets/cube.svg';

function Post(){
    return (
        <>
            <div className="post">
                <img src = {icon}></img>
                <div>
                    <h5>One of Europe’s top AI researchers raised a $13M seed to crack els</h5>
                    <p>
                        <a href = "" className="author">Patient</a>
                        <time> 2025-06-06</time>
                    </p>
                    <p>From OpenAIs 4o to Stable Diffusion, AI foundation models that create realistic images from a text prompt are now plentiful. In contrast, foundation models capable of generating full, coherent 3D online environments from a text prompt are only just emerging.</p>
                </div>
            </div>
        </>
    );
}

export default Post