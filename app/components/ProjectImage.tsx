'use client'

import React, { useRef, useState, useEffect } from 'react';
import { useIntersectionObserver } from 'usehooks-ts'

const MOBILE_BREAKPOINT = 820;

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1
}

interface projectImageProps {
    HowManySpaces?: number,
    isTall?: boolean
}

const ProjectImage = ({ HowManySpaces, isTall}: projectImageProps) => {
    const containerRef = useRef(null);
    const entry = useIntersectionObserver(containerRef, {
        threshold: 0.9
    })
    // const [isVisible, setIsVisible] = useState(false);

    // const callbackFunction = (entries: Array<IntersectionObserverEntry>) => {
    //     const [entry] = entries;
    //     setIsVisible(entry.isIntersecting);
    // }

    const determineClassName = () => {
        let gridSpaces = '';
        let tall = '';

        if (HowManySpaces) {
            gridSpaces = ` span-${HowManySpaces}`;
        }

        if (isTall) {
            tall = ' tall';
        }

        let resultantClass = `project${gridSpaces}${tall}`;

        return resultantClass;
    }

    // useEffect(()=> {
    //     const observer = new IntersectionObserver(callbackFunction, options);

    //     if (containerRef.current && window.innerWidth > MOBILE_BREAKPOINT) {
    //         observer.observe(containerRef.current);
    //     }

    //     return () => {
    //         if(containerRef.current) {
    //             observer.unobserve(containerRef.current);
    //         } 
    //     }
    // }, [containerRef, options])

    // useEffect(()=> {

    // }, []);

    return (
        <section ref={containerRef} className={determineClassName()}>
            <img className="bg-image" src={`/efl1.jpg`}/>
            {/* <h3>England Football Learning</h3> */}
            <p className={entry?.isIntersecting ? '': 'hidden'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Cras at dolor eu tellus vestibulum porta. Nunc efficitur,
                orci in fermentum auctor, nibh sapien iaculis orci, eget 
                ultricies diam nisl id mi. </p>
        </section>
    )
}

export default ProjectImage