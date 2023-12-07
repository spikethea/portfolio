'use client'
import React, {useState, useEffect, useRef} from 'react';
import styles from '../page.module.scss'
import { Title } from '../page';

interface FollowMouseWithTitleProps {
  title: Title
}

const useMousePosition = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
  
    useEffect(() => {
      const setFromEvent = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
    };
      window.addEventListener("mousemove", setFromEvent);
      return () => {
        window.removeEventListener("mousemove", setFromEvent);
      };
    }, []);
  
    return position;
};

export const FollowMouseWithTitle = ({title}: FollowMouseWithTitleProps) => {

    const position = useMousePosition();
    const cursor = useRef<HTMLDivElement>(null);

    function moveCursor() {
      if (cursor.current !== null) {
        cursor.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
      }
    }

    useEffect(() => {
      moveCursor();
    }, [position.x])

    return (
      <div
        ref={cursor}
        style={{display: `${title.state ? 'flex' : 'none'}`}}
        className={styles.floating_title}>
          {title.copy}
      </div>
    )
  }