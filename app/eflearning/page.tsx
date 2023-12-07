'use client'

import ProjectImage from '@components/ProjectImage';
import '/app/globals.scss'
import { useEffect, useRef, useState } from 'react';

export default function Efl() {

  const articleRef = useRef<HTMLDivElement>(null);
  const [articleTop, setArticleTop] = useState(0);

  const articleSticky = (event) => {
    const { scrollY } = window;
    console.log(scrollY, articleTop);

    if (articleTop === 0) {
      setArticleTop(articleRef.current?.getBoundingClientRect().top + scrollY)
    }

    if (!articleTop || !articleRef.current) return;

    if (scrollY > articleTop) {
      articleRef.current.classList.add('sticky');
    } else {
      articleRef.current.classList.remove('sticky');
      console.log('articlesticky remove ' + window.scrollY)
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-black">
        <section className="main">
          <div style={{maxHeight: '100vh', overflow: 'hidden'}} className='hero-section'>
            <video muted autoPlay loop playsInline style={{width: '100%', height: '100%', objectFit: 'fill'}} src="/efl.mp4"></video>
            <h1>EFL</h1>
            <a href='#main-content' className='scroll-down' aria-label="scroll down"></a>
          </div>
          <div
          className='content-container'>
            <div id='main-content' className='article-container'>
              <article ref={articleRef}>
                <h4>England Football Learning</h4>
                <ul className={"project__tags "}>
                  <li>Vanilla JS</li>
                  <li>Webpack</li>
                  <li>SCSS</li>
                  <li>Responsive</li>
                </ul>
                <h5>For our Client The FA I led the development as a Front-End Developer to 
                  build the UI for the new England Football Learning Website, a CMS for England
                  Football coaching. Built using the Fractal UI framework + ES6 Javascript 
                  (with webpack) and SCSS, it greatly improved upon the existing B2C experience, 
                  and it has won Cognizant UK's Project of the Year in the Communications Sector.</h5>
              </article>
            </div>
            <div className='image-grid'>
            <ProjectImage HowManySpaces={2}/>
            <ProjectImage/>
            <ProjectImage/>
            <ProjectImage/>
            <ProjectImage/>
            <ProjectImage/>
            <ProjectImage isTall/>
            <ProjectImage/>
            <ProjectImage/>
            <ProjectImage/>
            <ProjectImage/>
          </div>
          </div>
        </section>
      </div>
    </main>
  );
}