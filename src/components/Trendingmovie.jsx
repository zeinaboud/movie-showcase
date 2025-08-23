import React from 'react'
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger);
const Trendingmovie = ({ movie: { poster_url }, index }) => {
  
  useGSAP(() => {
        let t1 = gsap.timeline({
            scrollTrigger: {
                trigger: '.img-grid',
                start: 'top 80%'
            }
        });
        t1.fromTo('#image-grid', {
            opacity: 0,
            y:50,
            duration: 0.6,
            ease:'power2.out'
        }, {
          duration: 1,
            opacity: 1,
            y:0
        })
    },[])
return (
  <>
    
    <div id='image-grid' className='min-w-[230px] flex flex-row items-center'>
      <p className='  text-nowrap text-9xl font-bold
       bg-linear-to-r from-[#c11f30] to-[#1B1F86] bg-clip-text text-transparent
      '>{index + 1}</p>
          <img
            className='img-grid w-[127px] h-[163px] rounded-lg object-cover -ml-3.5'
            src={poster_url} alt="" 
          />
        </div>
    </>
  )
}

export default Trendingmovie