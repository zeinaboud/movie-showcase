import React from 'react'
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger);

const MovieCard = ({ movie: { title, poster_path, vote_average, original_language, release_date } }) => {
    
    /* useGSAP(() => {
        gsap.set('img-grid', { opacity: 0, y: 0 }); // Initial state

        gsap.from('#image-grid', {
            scrollTrigger: {
                trigger: '.img-grid',
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
            opacity: 1,
            y: 100,
            duration: 0.6,
            ease: 'power2.out',
        });
    }, []);*/
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
            ease: 'power2.out',
            stagger: 0.2,
        }, {
            opacity: 1,
            y:0
        })
    },[])

    return (
        <>
            <div id="image-grid">
                <img
                    className='img-grid w-full h-auto rounded'
                    src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` :
                        '/no-movie.png'}
                    alt={title}
                />
                <div className='mt-2 font-bold text-white'>
                    <h3>{title}</h3>

                    <div>
                        <div className='flex items-center gap-1'>
                            <img className='w-4 h-4 ' src="/src/assets/img/star.png" />
                            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'} </p>
                            <span className='px-1'>.</span>
                            <p className='uppercase text-red-500'>{original_language}</p>
                            <span className='px-1'>.</span>
                            <p>
                                {release_date ? release_date.split('-')[0] : 'N/A'}
                            </p>
                        </div>

                        
                    </div>

                </div>
            </div>
            
        </>
)
}

export default MovieCard