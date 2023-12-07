'use client'

import Image from 'next/image'
import styles from './page.module.scss'
import ProjectEntry from './components/ProjectEntry'
import data from './data/projects.json';
import { FollowMouseWithTitle } from './components/FollowMouseWithTitle';
import WebGLCanvas from './components/WebGL/WebGLCanvas';
import { useState } from 'react';
import Marquee from 'react-fast-marquee';


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


  return (
    <main className={styles.main}>
      <FollowMouseWithTitle title={title}/>
      <section className={styles.hero_section}>
        <WebGLCanvas/>
        {/* <img src="/palm_tree.png" alt="Render of Palm Tree" /> */}
        <h1>QuinceGR</h1>
        <h3 className={styles.in_development}>Note: This Portfolio is in still in development. Come back to see more changes soon.</h3>
      </section>
      <div className={styles.content_container}>
        <Marquee>
            <h2>REACTJS (HOOKS + REDUX) | WEBGL | IOS DEVELOPMENT | GRAPHQL &amp; APOLLO | ES6 JAVASCRIPT | DESIGN AND UX | 3D MODELLING | </h2>
        </Marquee>
        <section className={styles.content_container__inner}>
          <h2>Creative Developer</h2>
          {projectData?.map((project, id) => (
            <ProjectEntry key={id} setTitle={setTitle} projectData={project}/>
          ))}
        </section>
      </div>
    </main>
  )
}
