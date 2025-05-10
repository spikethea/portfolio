'use client'
import '../globals.scss';
import data from '../data/projects.json';
import { Fragment, useState, MouseEvent, useRef, useEffect } from "react";

const DropDownMenu = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const listRef = useRef<HTMLElement>(null);

    useEffect(()=> {
        const list = listRef.current;
        if (list === null) return;

        if (!list.classList.contains('hidden')) {
            list.classList.add('hidden');
        } else {
            list.classList.remove('hidden');
        }
        
    }, [isExpanded])

    return (
        <div className="drop-down">
            <header onClick={()=> setIsExpanded(!isExpanded)} aria-expanded={isExpanded}>
                <span>Projects</span>
                <img src="/images/svg/down-chevron.svg" alt="down chevron"/>
            </header>
            <ul ref={listRef}>
                {data.projects.map((project, id) => (
                    <li key={id}>
                        <a href={`/projects/${project.name}`}>{project.tagName}</a>
                    </li>
                ))}
            </ul>
        </div>
        
    )
}

const HamburgerNavigation = () => {

    const [isHidden, setHidden] = useState(true);

    const toggleNavigation = (e: MouseEvent<HTMLButtonElement>) => {
        const element = e.target;
        setHidden((prevState) => !prevState);
        setTimeout(() => {

        },50)
    }

    return (
        <Fragment>
        <button 
        onClick={toggleNavigation} 
        aria-expanded={isHidden ? false : true}
        
        className={`hamburger_cta ${!isHidden ? 'close': null}`}
        >
          <img src="/images/svg/rectangle.svg"/>
          <img src="/images/svg/rectangle.svg"/>
        </button>
        <nav role="navigation" className={`${isHidden ? 'hidden': null}`}>
          <ul className="links">
            <li><a href="/">Home</a></li>
            <DropDownMenu/>
            <li><a href="/contact-me">Contact</a></li>
          </ul>
          <ul className="social-media">
            <li>
                <a href="https://www.linkedin.com/in/quince-gore-rodney-41b3081b6/">
                    <img src="/images/svg/linkedin.svg"/>
                </a>
            </li>
            <li>
                <a href="https://www.youtube.com/channel/UCNzbjdOHAKSBD-3XRIy2QgA/featured">
                    <img src="/images/svg/youtube.svg"/>
                </a>
            </li>
            <li>
                <a href="mailto: quince.gorerodney@hotmail.com">
                    <img src="/images/svg/email.svg"/>
                </a>
            </li>
            <li>
                <a href="https://github.com/spikethea">
                    <img src="/images/svg/github.svg"/>
                </a>
            </li>
            <li>
                <a href="https://www.artstation.com/spikethea">
                    <img src="/images/svg/artstation.svg"/>
                </a>
            </li>
          </ul>
        </nav>
        </Fragment>
    )
}

export default HamburgerNavigation;