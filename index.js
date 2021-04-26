const html = document.documentElement;
const canvas = document.getElementById("guitar");
const ctx = canvas.getContext("2d");

const frameCount = 250;

const preloaded = false;

// Gets local image files
const getImage = frameNumber => {
  return `/assets/${frameNumber.toString().padStart(4, '0')}.jpg`;
};

// Blender exported with these dimensons
canvas.width=1920;
canvas.height=1280;
let numLoaded = 0;
const load = async function loadAllImages() {
    promises = []
    imageNames = []
    images_loaded = []

    for (var i = 1; i <= 250; i++) {
        imageNames.push(`/assets/${i.toString().padStart(4, '0')}.jpg`);
    }

    for (let imageFile of imageNames) {
        promises.push(new Promise(resolve => {
            const img = new Image();
            img.onload = function() {
                numLoaded += 1;
                document.getElementById('loader').style.width = (numLoaded / frameCount * 100) + '%';
                resolve()
            }

            img.src = imageFile;
            images_loaded.push(img);
        }));
    }

    await Promise.all(promises);
    return images_loaded;
};

// let images = [];
// (async() => {
//     images = await load();
//     ctx.drawImage(images[0],0,0);
// })();

const updateImage = frame => {
    ctx.drawImage(images[frame], 0, 0);
  }

// https://css-tricks.com/lets-make-one-of-those-fancy-scrolling-animations-used-on-apple-product-pages/
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(
      frameCount - 1,
      Math.floor(scrollFraction * frameCount)
    );

    requestAnimationFrame(() => {
        if (preloaded) {
            updateImage(frameIndex);
        } else {
            const img = new Image();
            img.onload = function() {
                ctx.drawImage(img, 0, 0);
            }

            img.src = `/assets/${frameIndex.toString().padStart(4, '0')}.jpg`;
        }
    });
});

function checkForLoaded() {
    if (numLoaded == frameCount) {
        document.getElementById('loader').style.transition = "none";
        document.getElementById('loading-bar').style.visibility = "hidden";
        document.getElementById('overlay').style.display = "none";
        document.body.style.overflow = "visible";
    }
}

document.getElementById("loader").addEventListener("transitionend", checkForLoaded);