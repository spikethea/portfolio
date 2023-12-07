'use client'

import React, { MouseEvent, RefObject, useEffect, useRef, useState } from 'react';
import styles from '../page.module.scss'
import { Title } from '../page';
import Link from 'next/link';
import { useIntersectionObserver } from 'usehooks-ts'

export interface projectProps {
  projectData: projectData;
  setTitle: React.Dispatch<React.SetStateAction<Title>>
}

export interface projectData {
  id:      number;
  name:    string;
  tagName: string;
  video:   Video;
  images:  Image[];
}


export interface Image {
  id: number,
  name: string;
  src:  string;
  xPos: number,
  yPos: number
}

export interface Video {
  name: string;
  alt:  string;
  src:  string;
}

const ProjectEntry = ({projectData, setTitle}: projectProps) => {

  const [video, setVideo] = useState();
  const [images, setImages] = useState(projectData.thumbnail_images);
  const imagesRef = useRef([]);
  const titleRef = useRef();

  function rotateCard(e:MouseEvent<Element, MouseEvent>) {
    const THRESHOLD = 15;
    const { clientX, clientY, currentTarget } = e;
    const card = currentTarget as HTMLElement;

    if (!currentTarget) return;
    const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget as HTMLElement;
  
    const horizontal = (clientX - offsetLeft) / clientWidth;
    const vertical = (clientY) / clientHeight;
    const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
    const rotateY = (vertical * THRESHOLD - THRESHOLD / 2).toFixed(2);
  
    if (card) {
      card.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`;
    }
  }

  const OnProjectHover = (event: MouseEvent, data: projectData, ref: RefObject<HTMLVideoElement>) => {
    const self = event.target as HTMLElement;
    if (!self) return;

    const video = ref.current;

    setTitle(prev => ({
      ...prev,
      state: true,
      copy: data.name
    }));

    if (video && video.paused) {
      video.play();
    }
    //triggerImageAnimation(self);
  }



  const OnProjectLeave = (event: MouseEvent, ref: RefObject<HTMLElement>, videoRef: RefObject<HTMLVideoElement>) => {

    const element = ref.current;
    if (!element) return;

    const video = videoRef.current;
    if (!video) return;

    setTitle(prev => ({
      ...prev,
      state: false,
    }));

    if (self) {
      element.style.transform = `perspective(${element.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
    }

    if (video && !video.paused) {
      video.pause();
      video.currentTime = 0;
    }
    //triggerImageShow(self)
  }

  const triggerImageShow = (self: HTMLElement) => {
    const imagesArray = self.querySelectorAll('img');
    const video = self.querySelector<HTMLVideoElement>('video');

    for (let i = 0; i < imagesArray.length; i++) {
      imagesArray[i].style.display = 'block';
      imagesArray[i].style.visibility = 'visible';
    }

    if (video && !video.paused) {
      video.pause();
    }
  }

  // const triggerImageAnimation = (self: HTMLElement) => {
  //   const imagesArray = self.querySelectorAll('img');
  //   const video = self.querySelector<HTMLVideoElement>('video');

  //   for (let i = 0; i < imagesArray.length; i++) {
  //     setTimeout(() => {
  //       imagesArray[i].style.visibility = 'hidden';
  //     }, (i+1)*700);
  //   }

  //   setTimeout(() => {
  //     if (video) video.play();
  //     for (let i = 0; i < imagesArray.length; i++) {
  //       imagesArray[i].style.display = 'none';
  //     }
  //   }, (imagesArray.length+1)*700);
  // }

  const createMedia = () => {
    const ref = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const entry = useIntersectionObserver(ref, {
      threshold: 0.9
    });

    useEffect(()=> {
      
    }, [entry?.isIntersecting]);

    
    if (projectData) {
      const project = projectData
      const imageArray = project.thumbnail_images;
      return (
        <Link href={`/projects/${projectData.name}`}>
        <figure
        ref={ref}
        onMouseMove={(e) => rotateCard(e)}
        onMouseOver={(e) => OnProjectHover(e, projectData, videoRef)}
        onMouseOut={(e) => OnProjectLeave(e, ref, videoRef)}
        >
          <div className={`${styles.mobile_title} ${entry?.isIntersecting ? '' : `${styles.hidden}`}`}>{projectData.name}</div>  
          <video 
            muted 
            playsInline
            loop
            ref={videoRef}
            src={project.video.src}
          ></video>
          {images.map((image, index: number) => {

            const {yPos, xPos} = image
            
            return (
              <img
              key={index}
              id={`${projectData.name}-image-${index}`}
              data-index={`${image.name}-${index}`}
              style={{bottom: `${yPos}%`, left: `${xPos}%`}}
              className={styles.rnib2} 
              src={image.src} 
              alt={image.name}
              />
            )
          })}
        </figure>
        </Link>
      )
    }
  }

    return (
        <article>
            {createMedia()}
          </article>
    )
}

export default ProjectEntry