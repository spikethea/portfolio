'use client'

import ProjectImage from '@components/ProjectImage';
import '/app/globals.scss'
import { useEffect, useRef, useState } from 'react';
import data from '../../data/projects.json';
import { useParams } from 'next/navigation';


export default function Project() {
  const params = useParams();
  const articleRef = useRef<HTMLDivElement>(null);
  const [articleTop, setArticleTop] = useState(0);
  const [footerHeight, setFooterHeight] = useState(328);
  const project = data.projects.find((project) => project.name === params.project);

  const articleSticky = () => {
    const { scrollY } = window;

    if (articleRef.current && articleTop === 0) {
      setArticleTop(articleRef.current.getBoundingClientRect().top + scrollY)
    }

    if (!articleTop || !articleRef.current) return;

    if (scrollY > articleTop &&
      scrollY + articleRef.current.getBoundingClientRect().height < document.body.offsetHeight - footerHeight
      ) {
      articleRef.current.classList.add('sticky');
    } else {
      articleRef.current.classList.remove('sticky');
    }
  }

  useEffect(() => {
    const article = articleRef.current;
    const container = article?.parentElement;
    if (!container ) return;

    if (!article.style.width) {
      container.style.width = `${article.getBoundingClientRect().width}px`;
      container.style.height = `${article.getBoundingClientRect().height}px`;
    }
    window.addEventListener('scroll', articleSticky, { passive: true })
    return () => {
        window.removeEventListener('scroll', articleSticky)
    }
}, [articleSticky])

  if (project) return (
    <main >
      <div>
        <section className="main">
          <div style={{minHeight: '100vh', overflow: 'hidden'}} className='hero-section'>
            <video muted autoPlay loop playsInline style={{width: '100vw', height: '100vh', objectFit: 'cover'}} src={project.video.src}></video>
            <h1>{project.name}</h1>
            <a href='#main-content' className='scroll-down' aria-label="scroll down"></a>
          </div>
          <div
          className='content-container'>
            <div id='main-content' className='article-container'>
              <article ref={articleRef}>
                <h4>{project.tagName}</h4>
                <ul className={"project__tags "}>
                  {project.tags.map((tag, id)=> <li key={id} style={{borderColor: `${tag.hexValue}`}}>{tag.copy}</li>)}
                </ul>
                <h5>{project.subtitle}</h5>
                <p>{project.description}</p>
                {project.url ? <div className='project-link-container'><a className='project-link' href={project.url}>Link to Project</a></div> : null}
              </article>
            </div>
            <div className='image-grid'>
              {project.images.map((image, id)=> <ProjectImage key={id} imageData={image}/>)}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}