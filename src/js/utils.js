// /**
//  * Preloads images specified by the CSS selector.
//  * @function
//  * @param {string} [selector='img'] - CSS selector for target images.
//  * @returns {Promise} - Resolves when all specified images are loaded.
//  */
// import imagesLoaded from "imagesloaded";
// const preloadImages = (selector = 'img') => {
//   return new Promise((resolve) => {
//       // The imagesLoaded library is used to ensure all images (including backgrounds) are fully loaded.
//       imagesLoaded(document.querySelectorAll(selector), {background: true}, resolve);
//   });
// };

// // Exporting utility functions for use in other modules.
// export {
//   preloadImages
// };
export function preloadImages(selector) {
  const els = document.querySelectorAll(selector);
  const urls = Array.from(els).map(el => {
    const bg = window.getComputedStyle(el).backgroundImage;
    return bg.slice(5, -2);
  });
  const promises = urls.map(
    url => new Promise(resolve => {
      const img = new Image();
      img.onload = resolve;
      img.src = url;
    })
  );
  return Promise.all(promises);
}
