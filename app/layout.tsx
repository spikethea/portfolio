import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import HamburgerNavigation from '@components/HamburgerNavigation';
import data from './data/projects.json';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QUINCEGR - Web Portfolio',
  description: 'Custom Web portfolio created by myself, using Typescript, WebGL, and NextJS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const projectData = data.projects;

  return (
    <html lang="en">
      <body className={inter.className}>{children}
      <HamburgerNavigation/>
        <footer className={inter.className}>
          <h1>QUINCEGR</h1>
          <h4>Portfolio created using NextJS and Typescript</h4>
          <br />
          <h4>Projects</h4>
          <div className='index'>
            {projectData.map((project, id)=> 
              <a id={`project-index-${id}`} href={`/projects/${project.name}`}>{project.tagName}</a>
            )}
          </div>
          <p className='copyright'>© Quince Gore-Rodney. All rights reserved</p>
        </footer>
      </body>
    </html>
  )
}
