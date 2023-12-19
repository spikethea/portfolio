'use client'

import React, { useRef, useState, useEffect } from 'react';
import { useIntersectionObserver } from 'usehooks-ts'

const MOBILE_BREAKPOINT = 820;

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1
}

interface ProjectImageData {
    id: number,
    src: string,
    caption?: string,
    isTall: boolean,
    howManySpaces: number
}

interface projectImageProps {
    imageData: ProjectImageData
}

const ProjectImage = ({imageData}: projectImageProps) => {
    const containerRef = useRef(null);
    const entry = useIntersectionObserver(containerRef, {
        threshold: imageData.isTall ? 0.3 : 0.9
    })
    // const [isVisible, setIsVisible] = useState(false);

    // const callbackFunction = (entries: Array<IntersectionObserverEntry>) => {
    //     const [entry] = entries;
    //     setIsVisible(entry.isIntersecting);
    // }

    const determineClassName = () => {
        let gridSpaces = '';
        let tall = '';

        if (imageData.howManySpaces) {
            gridSpaces = ` span-${imageData.howManySpaces}`;
        }

        if (imageData.isTall) {
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
            <img className="bg-image" src={imageData.src}/>
            {/* <h3>England Football Learning</h3> */}
            {imageData.caption ? <p className={entry?.isIntersecting ? '': 'hidden'}>{imageData.caption}</p>: null}
        </section>
    )
}

export default ProjectImage