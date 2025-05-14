import { useEffect } from "react";
import gsap from "gsap";
import imagesLoaded from "imagesloaded";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import "./App.css";
import ImageAnimation from "./components/ImageAnimation";



function App() {
  // useEffect(() => {
  //   //document.documentElement.className = "js";

  //   // Initialize Lenis for smooth scrolling
  //   const lenis = new Lenis({ lerp: 0.1 });

  //   function raf(time) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }
  //   requestAnimationFrame(raf);

  //   // GSAP animations inside the useEffect hook
  //   //gsap.to(".panel", { opacity: 1, duration: 1 });

  //   // GSAP ScrollTrigger setup
  //   gsap.registerPlugin(ScrollTrigger);

  //   gsap.from(".grid_item", {
  //     scrollTrigger: {
  //       trigger: ".grid_item",
  //       start: "top 80%", // Trigger animation when element reaches 80% of viewport height
  //       end: "top 30%", // End the animation when it reaches 30%
  //       scrub: true, // Makes the animation progress as the user scrolls
  //     },
  //     opacity: 0, // Example animation (fade in)
  //     y: 100, // Move the element from 100px below its position
  //     duration: 1,
  //   });

  //   // Ensure the images are loaded before initializing animations
  //   const gridElement = document.querySelector(".grid_item");

  //   if (gridElement) {
  //     imagesLoaded(gridElement, () => {
  //       console.log("All images are loaded!");

  //       // Run your GSAP animations after images are loaded
  //       gsap.from(".grid_item", {
  //         opacity: 0,
  //         y: 100,
  //         duration: 1,
  //       });
  //     });
  //   }

  //   // Cleanup function to destroy Lenis on component unmount
  //   return () => {
  //     lenis.destroy();
  //     ScrollTrigger.kill();
  //   };
  // }, []);

  return (
    <>
      {/* <main>
        <div className="grid">
          <figure className="grid__item" role="img" aria-labelledby="caption1">
            <div className="grid__item-image bg-[url('img1.webp')]"></div>
            <figcaption className="grid__item-caption" id="caption1">
              <h3>Drift — A04</h3>
              <p>Model: Amelia Hart</p>
            </figcaption>
          </figure>
        </div>
        
          <figure className="panel" role="img" aria-labelledby="caption">
          <div className="panel__img bg-[url('img1.webp')]"></div>
          <figcaption className="panel__content" id="caption">
            <h3>murmur—207</h3>
            <p>
              Beneath the soft static of this lies a fragmented recollection of
              motion—faded pulses echoing through time-warped layers of light
              and silence. A stillness wrapped in artifact.
            </p>
            <button
              type="button"
              className="panel__close"
              aria-label="Close preview"
            >
              Close
            </button>
          </figcaption>
        </figure>
        
        
      </main> */}
      <ImageAnimation />
      
    </>
  );
}

export default App;
