'use client'

import Image from 'next/image'
import styles from './page.module.scss'
import ProjectEntry from './components/ProjectEntry'
import data from './data/projects.json';
import { FollowMouseWithTitle } from './components/FollowMouseWithTitle';
import WebGLCanvas from './components/WebGL/WebGLCanvas';
import { useState } from 'react';
import Marquee from 'react-fast-marquee';
import tunnel from 'tunnel-rat';


export interface Title {
  state: boolean;
  copy: string
}

// export async function test () {
//   try {
//   const projects = await fetch('https://.../projects').then((res) => res.json())
//   console.log(projects);
// } catch (error) {
//   // TypeError: Failed to fetch
//   console.log('There was an error', error);
// }
// }

// test();




export default function Home() {
  const projectData = data.projects;
  const [title, setTitle] = useState<Title>({
    state: false,
    copy: 'RNIB'
  });

  const ui = tunnel();

  return (
    <main className={styles.main}>
      <ui.Out/>
      <FollowMouseWithTitle title={title}/>
      <section className={styles.hero_section}>
        <WebGLCanvas ui={ui}/>
        {/* <img src="/palm_tree.png" alt="Render of Palm Tree" /> */}
        <h1 onClick={() => document.getElementById('software-developer')?.scrollIntoView()}>QuinceGR</h1>
      </section>
      <div className={styles.content_container}>
        <Marquee>
            <h2> UNITY 3D | REACTJS (HOOKS + REDUX) | WEBGL | AUGMENTED & VIRTUAL REALITY | ES6 JAVASCRIPT | DESIGN AND UX | 3D MODELLING &amp; ANIMATION | </h2>
        </Marquee>
        <section className={styles.content_container__inner}>
          <h2 id="software-developer">Software Developer</h2>
          {projectData?.map((project, id) => (
            <ProjectEntry key={id} setTitle={setTitle} projectData={project}/>
          ))}
        </section>
      </div>
    </main>
  )
}
