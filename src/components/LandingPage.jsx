import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';


const images = [
  'img1.webp',
  'img2.webp',
  'img3.webp',
  'img4.webp',
];

const LandingPage = () => {
  const gridRef = useRef();

  useEffect(() => {
    // const tiles = gridRef.current.querySelectorAll('.tile');

    // const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    images.forEach((img, i) => {
      tl.to(tiles, {
        backgroundImage: `url(${img})`,
        stagger: 0.05,
        duration: 1,
        ease: 'power2.inOut'
      }, i * 1.5);
    });

  }, []);

  return (
    <div className="grid" ref={gridRef}>
      {Array.from({ length: 100 }).map((_, i) => (
        <div className="tile" key={i}></div>
      ))}
    </div>
  );
};

export default LandingPage;
