import React from 'react'
import { useGSAP} from '@gsap/react'
import { useRef } from 'react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(SplitText);
const Header = () => {
        const titleRef = useRef();
        useGSAP(() => {
                let split = SplitText.create(titleRef.current, { type: "words, chars" });
                gsap.from(split.chars, {
                duration: 1, 
                y: 100,         // animate from 100px below
                autoAlpha: 0,   // fade in from opacity: 0 and visibility: hidden
                stagger: 0.05,  // 0.05 seconds between each
                });
        },[])

        return (
        <header id='#split' className='lg:flex items-center justify-center gap-2'>
                
                <img src="./hero-img.png" alt="" />
                <div>
                        <h1
                                ref={titleRef}>Find Movies
                                You’ll Love Without the Hassle
                        </h1>
                </div>
        </header>
)
}

export default Header