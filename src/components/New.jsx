import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { preloadImages } from "../js/utils";
function getBottomLeft(rect) {
  return { x: rect.left, y: rect.top + rect.height };
}

function getBottomRight(rect) {
  return { x: rect.left + rect.width, y: rect.top + rect.height };
}

function getBottomCenter(rect) {
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height };
}

function generatePath(
  startRect,
  endRect,
  steps,
  anchor = "top-left",
  motion = "sine",
  amplitude = 40,
  frequency = Math.PI
) {
  const path = [];
  const full = steps + 2;

  let getAnchor = (rect) => getBottomLeft(rect);
  if (anchor === "bottom-right") getAnchor = getBottomRight;
  if (anchor === "bottom-center") getAnchor = getBottomCenter;

  const start = getAnchor(startRect);
  const end = getAnchor(endRect);

  for (let i = 1; i <= steps; i++) {
    const t = i / (full - 1);

    const w = 10 + (endRect.width - 10) * t;
    const h = 10 + (endRect.height - 10) * t;

    let cx = start.x + (end.x - start.x) * t;
    let cy = start.y + (end.y - start.y) * t;

    if (motion === "sine") cy += Math.sin(t * frequency) * amplitude;

    if (anchor === "bottom-left") {
      path.push({ left: cx, top: cy - h, width: w, height: h });
    } else if (anchor === "bottom-right") {
      path.push({ left: cx - w, top: cy - h, width: w, height: h });
    } else {
      // center bottom
      path.push({ left: cx - w / 2, top: cy - h, width: w, height: h });
    }
  }
  return path;
}

const New = () => {
  const images = [
    "img1.webp",
    "img2.webp",
    "img3.webp",
    "img4.webp",
    "img5.webp",
  ];
  const gridRef = useRef();
  const panelRef = useRef();
  const panelImgRef = useRef();

  const [selected, setSelected] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    preloadImages(".grid__item-image").then(() =>
      document.body.classList.remove("loading")
    );
  }, []);

  const handleClick = (e, idx) => {
    if (isAnimating) return;
    setIsAnimating(true);
    const item = e.currentTarget;
    const img = item.querySelector(".grid__item-image");
    setSelected(images[idx]);

    requestAnimationFrame(() => {
      const startRect = img.getBoundingClientRect();
      const endRect = panelImgRef.current.getBoundingClientRect();

      const anchor =
        idx === 0
          ? "top-left"
          : idx === images.length - 1
          ? "bottom-right"
          : "bottom-center";

      const path = generatePath(startRect, endRect, 6, anchor);

      // one-time grid fade-out
      gsap.to(gridRef.current.children, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        stagger: 0.05,
      });

      // movers animation (single-run)
      path.forEach((step, i) => {
        const mover = document.createElement("div");
        mover.className = "mover";
        Object.assign(mover.style, {
          position: "fixed",
          left: `${step.left}px`,
          top: `${step.top}px`,
          width: `${step.width}px`,
          height: `${step.height}px`,
          backgroundImage: `url(${images[idx]})`,
          backgroundSize: "cover",
          clipPath: "inset(100% 0% 0% 0%)",
          zIndex: 999,
        });
        document.body.appendChild(mover);

        gsap
          .timeline({ delay: i * 0.05 })
          .to(mover, {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 0.4,
            ease: "sine.in",
          })
          .to(mover, {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 0.4,
            ease: "sine.out",
            delay: 0.1,
          })
          .then(() => mover.remove());
      });

      // panel reveal (one-time)
      gsap
        .fromTo(
          panelImgRef.current,
          { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 0.8,
            ease: "expo",
            delay: 0.35,
          }
        )
        .then(() => setIsAnimating(false));
    });
  };

  const closePanel = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // reverse panel reveal
    gsap
      .to(panelImgRef.current, {
        clipPath: "inset(100% 0% 0% 0%)",
        opacity: 0,
        duration: 0.5,
        ease: "expo",
      })
      .then(() => {
        setSelected(null);
        // bring grid back
        gsap.to(gridRef.current.children, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          stagger: 0.05,
        });
        setIsAnimating(false);
      });
  };

  return (
    <div className="app">
      <div ref={gridRef} className="grid">
        {images.map((src, i) => (
          <div
            key={i}
            className="grid__item"
            onClick={(e) => handleClick(e, i)}
          >
            <div
              className="grid__item-image"
              style={{ backgroundImage: `url(${src})` }}
            />
          </div>
        ))}
      </div>
      {selected && (
        <div ref={panelRef} className="panel">
          <button className="panel__close" onClick={closePanel}>
            ✕
          </button>
          <div
            ref={panelImgRef}
            className="panel__image"
            style={{ backgroundImage: `url(${selected})` }}
          />
        </div>
      )}
    </div>
  );
};

export default New;
