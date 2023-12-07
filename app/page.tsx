'use client'

import Image from 'next/image'
import styles from './page.module.scss'
import ProjectEntry from './components/ProjectEntry'
import data from './data/projects.json';
import { FollowMouseWithTitle } from './components/FollowMouseWithTitle';
import WebGLCanvas from './components/WebGL/WebGLCanvas';
import { useState } from 'react';
import Marquee from 'react-fast-marquee';
import HamburgerNavigation from '@components/HamburgerNavigation';


export interface Title {
  state: boolean;
  copy: string
}

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
      </section>
      <div className={styles.content_container}>
        <Marquee>
            <h2>REACTJS (HOOKS + REDUX) | WEBGL | IOS DEVELOPMENT | GRAPHQL &amp; APOLLO | ES6 JAVASCRIPT | DESIGN AND UX | 3D MODELLING | </h2>
        </Marquee>
        <section className={styles.content_container__inner}>
          <h2>Creative Developer</h2>
          {projectData?.map((project) => (
            <ProjectEntry setTitle={setTitle} projectData={project}/>
          ))}
        </section>
      </div>
    </main>
  )
}
