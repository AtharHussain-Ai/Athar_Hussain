const lenis = new Lenis()

lenis.on('scroll', (e) => {
  console.log(e)
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)


//loader

gsap.registerPlugin(ScrollTrigger);


const btnHamburguer = document.querySelector(".btn-hamburguer")
const menuBar = document.querySelector('.menu-bar')

window.addEventListener("scroll", (event) => {
    var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight)
    
    const appearMoment = 0.05977165883143049;
    if (scrollPercentage >= appearMoment) {
        btnHamburguer.style.opacity = "1";
        btnHamburguer.style.scale = "1";
    }
    else {
        btnHamburguer.style.opacity = 0;
        btnHamburguer.style.scale = 0;
    }

})

const menuIcon = document.querySelector('.menu-icon');
const html = document.querySelector('html');

btnHamburguer.addEventListener("click", (event) => {
    menuBar.classList.toggle("menu-bar-right")
    menuIcon.classList.toggle('change')
    html.classList.toggle("stop-scrolling")
});

const setVisible = (elementOrSelector, visible) =>
  (typeof elementOrSelector === 'string'
    ? document.querySelector(elementOrSelector)
    : elementOrSelector
  ).style.display = visible ? 'block' : 'none';



magnets = document.querySelectorAll(".magnetic")

magnets.forEach((magnet) => {
    if(window.innerWidth > 540) {
        magnet.addEventListener("mousemove", function(e) {
            const position = magnet.getBoundingClientRect();

            const x = e.pageX - window.scrollX - position.left-position.width/2
            const y = e.pageY - window.scrollY - position.top-position.height/2;

            magnet.style.transform = "translate(" + x * 0.3 + "px, "+ y * 0.5 + "px)";
            magnet.style.transition = "all 0s linear";
            magnet.classList.remove("shake")
            
        })
        magnet.addEventListener("mouseleave", function(e) {
            magnet.style.transition = "all 0.2s cubic-bezier(0, 0, 0.72, 0.21";
            magnet.style.transform = "translate(0px, 0px)";

        })
    }
});



// Audio

let soundWave = document.querySelector('.soundwave'),
    audio = document.querySelector('.audio');

soundWave.addEventListener('click', () => {
    soundWave.classList.toggle('paused');
    audio.paused ? audio.play() : audio.pause();
});

window.onfocus = function() {
    soundWave.classList.contains('paused') ? audio.pause() : audio.play();
};

window.onblur = function() {
    audio.pause();
};














//loader
function loader() {
  document.body.classList.add("no-scroll"); // Disable scrolling and fix position

  const loafer = document.querySelector('.loafer');
  const progressed = document.querySelector('.progressed');
  let count = { value: 0 };

  gsap.to(count, {
    value: 100,
    duration: 5,
    ease: "power4.out",
    onUpdate: () => {
      loafer.textContent = `${Math.floor(count.value)}%`;
      progressed.style.width = `calc(${count.value}% - 5%)`;
    },
    onComplete: () => {
      gsap.to('.hyperloader', {
        y: '-100%',
        opacity: 0,
        duration: 1.5,
        ease: "power2.in",
        onComplete: () => {
          document.querySelector('.hyperloader').style.display = "none";
          document.body.classList.remove("no-scroll"); // Re-enable scrolling
          homescreen(); // Call homescreen function after loader animation completes
        }
      });
    }
  });
}


loader();

// Homescreen animation function

function homescreen() {
  // Make homescreen items visible
  gsap.set(".nav-links li, .branding, .note-home h3, .resume-btn, .glass-text h1", { visibility: "visible" });

  // GSAP animation for nav items
  gsap.from(".nav-links li", {
    duration: 0.4,
    opacity: 0,
    x: -15,
    stagger: 0.1,
    ease: "power1.out"
  });
  

 // Alternating scroll-triggered animation for #denis element
 gsap.to("#denis", {
  scrollTrigger: {
    trigger: "#back",
    start: "top top",
    end: "bottom top",
    scrub: true,
    toggleActions: "play reverse play reverse", // Alternates on scroll up/down
  },
  x: () => window.innerWidth - document.querySelector("#denis").offsetWidth, // Moves fully left and right
  duration: 10, // Adjust duration as needed for smooth movement
  ease: "power1.inOut",
});
// Infinite marquee animation for #denis
gsap.to("#denis h1", {
  xPercent: -50, // move text to left infinitely
  repeat: -1, // infinite loop
  ease: "none", // constant speed
  duration: 20, // adjust speed by changing duration
});

  
  // Branding animation
  gsap.from(".branding", {
    duration: 0.9,
    opacity: 0,
    scale: 0.7,
    ease: "power1.out",
    delay: 0.4
  });

  // GSAP reveal animation for note-home, resume-btn, and glass-text
  gsap.timeline()
    .from(".note-home h3", {
      opacity: 0,
      y: 50, 
      duration: 1,
      ease: "power2.out"
    })
    .from(".resume-btn", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out"
    }, "-=0.5")
    .from(".glass-text h1", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out"
    }, "-=0.5");
}


gsap.registerPlugin(ScrollTrigger);

// Parallax Effect on Background Image (Smooth Motion)
gsap.to(".image-container", {
  backgroundPosition: "50% 5%", 
  ease: "none",
  scrollTrigger: {
    trigger: "#page2",
    start: "top bottom",
    end: "bottom top",
    scrub: 2, // Slightly reduced for smoother sync
    anticipatePin: 1,
  },
});


function page6() {
  // Split text into span elements for each letter in #page6 > h1
  let clutter = "";
  const heading = document.querySelector("#page6 > h1");

  if (heading) {
    heading.textContent.split("").forEach(function (dets) {
      clutter += `<span>${dets}</span>`;
    });
    heading.innerHTML = clutter; // Replace content of h1 with the spans

    // GSAP animation for text in #page6
    gsap.to("#page6 > h1 > span", {
      scrollTrigger: {
        trigger: "#page6",   // Trigger the animation when #page6 is in view
        start: "top 100%",     // Animation starts when the top of page6 is 80% into the viewport
        end: "bottom 50%",    // Animation ends when the bottom of page6 goes off-screen
        scrub: 0.5,           // Smooth scroll-triggered animation       // Debug markers for ScrollTrigger
      },
      stagger: 0.05,         // Delay between each letter animation
      opacity: 1,            // Make text fully visible
      color: "#000",         // Change text color to white
      ease: "power2.out",    // Smooth easing for the animation
      onStart: () => console.log('Page 6 text animation started'),
    });
  } else {
    console.error("Page 6 heading not found!");
  }
}

page6()

function canvas() {
  gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger if not already registered
  
  const canvas = document.querySelector("#page9 > canvas");
  if (!canvas) {
    console.error("Canvas element not found");
    return;
  }
  
  const context = canvas.getContext("2d");
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });
  
  function files(index) {
    const data = `
      assets/Heart/heart1.png
      assets/Heart/heart2.png
      assets/Heart/heart3.png
      assets/Heart/heart4.png
      assets/Heart/heart5.png
      assets/Heart/heart6.png
      assets/Heart/heart7.png
      assets/Heart/heart8.png
      assets/Heart/heart9.png
      assets/Heart/heart10.png
      assets/Heart/heart11.png
      assets/Heart/heart12.png
      assets/Heart/heart13.png
      assets/Heart/heart14.png
      assets/Heart/heart15.png
      assets/Heart/heart16.png
      assets/Heart/heart17.png
      assets/Heart/heart18.png
      assets/Heart/heart19.png
      assets/Heart/heart20.png
      assets/Heart/heart21.png
      assets/Heart/heart22.png
      assets/Heart/heart23.png
      assets/Heart/heart24.png
      assets/Heart/heart25.png
      assets/Heart/heart26.png
    `;
    return data.trim().split("\n")[index].trim(); // Ensure paths are trimmed
  }
  
  const frameCount = 26;
  const images = [];
  const imageSeq = { frame: 0 };
  
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    img.onerror = () => console.error(`Error loading image: ${img.src}`);
    images.push(img);
  }
  
  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    repeat: -1,
    duration: 0.8,
    scrollTrigger: {
      trigger: "#page9",
      start: "-200% top",
    },
    onUpdate: render,
  });
  
  images[0].onload = render;
  
  function render() {
    if (images[imageSeq.frame].complete) {
      scaleImage(images[imageSeq.frame], context);
    }
  }
  
  function scaleImage(img, ctx) {
    const canvas = ctx.canvas;
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.min(hRatio, vRatio);
    const centerShiftX = (canvas.width - img.width * ratio) / 2;
    const centerShiftY = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height, centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
  }

  ScrollTrigger.create({
    trigger: "#page9",
    start: "-200% top",
  });
}
canvas();


// Load GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

gsap.from(".heart", {
scrollTrigger: {
  trigger: ".heart",
  start: "top 80%", // Adjust trigger point for starting animation
  toggleActions: "play none none reverse",
},
opacity: 0, // Animate from invisible
y: 50, // Animate from 50px below
duration: 1, // Duration for each line reveal
stagger: 0.2, // Time delay between each line
ease: "power3.out",
});


function page4() {
  gsap.utils.toArray(".elem h1").forEach((line) => {
    gsap.to(line, {
      opacity: 1,
      y: 0,
      color: "#f6f6f6",
      duration: 1.5,  // Extended duration for smooth motion
      ease: "power4.out",  // Softest easing for a natural feel
      stagger: 0.2,  // Smooth flow between lines
      scrollTrigger: {
        trigger: line,
        start: "top 80%",  // Adjusted start point
        end: "top 50%",  // Adjusted end point for smoother effect
        scrub: 1,  // Smooth scrolling effect
        toggleActions: "play none none reverse"  // Trigger play and reverse on scroll
      }
    });
  });
}


page4();



function nepg(){
  const aboutTitleTxt = new SplitType('.about__title', { types: 'chars', });

const about = gsap.timeline({
    scrollTrigger: {
        trigger: '.about',
        start: 'top 60%',
        end: '30% 40%',
        scrub: 0,
    }
})
about
.fromTo('.about__title .char',
  {opacity: 0, transform: 'translate(0px, 120%)'},
  {opacity:1, transform: 'translate(0px, 0%)', stagger: .05 }
)
.fromTo('.about__description',
    {opacity: 0},
    {opacity: 1}
)


let motion = gsap.matchMedia();
motion.add("(min-width: 768px)", () => {

gsap.ticker.lagSmoothing(0);


});



}

nepg()

function footer(){

  gsap.from(".footer_text", {
    opacity: 0,
    y: 20,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: "footer",
        start: "top 90%",
        toggleActions: "play reverse play reverse"
    }
});

// Footer card background animation
gsap.from(".footer_top", {
    backgroundColor: "rgba(0, 0, 0, 0)",
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "footer",
        start: "top 95%",
        toggleActions: "play reverse play reverse"
    }
});

// Footer bottom text animation
gsap.fromTo(".footer_bottom_text", 
    { opacity: 0, y: 50 }, 
    { opacity: 1, y: 0, duration: 1.5, ease: "power3.out",
      scrollTrigger: {
          trigger: ".footer_bottom",
          start: "top 60%",
          toggleActions: "play reverse play reverse"
      }
});

// Card animation effect
gsap.from(".footer_top > div", {
    opacity: 0,
    y: 30,
    duration: 1.2,
    stagger: 0.3,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".footer_top",
        start: "top 90%",
        toggleActions: "play reverse play reverse"
    }
});
}

footer();


document.addEventListener("DOMContentLoaded", function() {
  let footerText = document.querySelector(".footer_bottom_text");
  let originalText = footerText.innerText; // Store original full text

  function updateFooterText() {
      if (window.innerWidth <= 768) {
          let words = originalText.split(" ");
          let firstLetters = words.map(word => word.charAt(0)).join(" ");
          footerText.innerText = firstLetters;
      } else {
          footerText.innerText = originalText; // Restore full text on larger screens
      }
  }

  updateFooterText();
  window.addEventListener("resize", updateFooterText);
});






