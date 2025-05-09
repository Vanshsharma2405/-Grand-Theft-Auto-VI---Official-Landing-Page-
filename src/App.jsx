// Import necessary libraries and components
import React from "react";
import { useState } from "react";
import gsap from "gsap"; // GSAP for animations
import { useGSAP } from "@gsap/react"; // React hook for GSAP
import "remixicon/fonts/remixicon.css"; // Icon library
import Lenis from "lenis"; // Smooth scroll library

function App() {
  // Initialize Lenis for smooth scrolling
  const lenis = new Lenis();

  // Function to handle smooth scrolling using requestAnimationFrame
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  // Start the smooth scroll animation
  requestAnimationFrame(raf);

  // State to control when to show main content
  let [showContent, setShowContent] = useState(false);
  
  // GSAP animation for the initial mask reveal effect
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(".vi-mask-group", {
      duration: 2,
      rotate: 20,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    })
      .to(".vi-mask-group", {
        scale: 10,
        duration: 2,
        delay: -1.9,
        ease: "Expo.easeInOut",
        transformOrigin: "50% 50%",
        opacity: 0,
        onUpdate: function () {
          if (this.progress() > 0.8) {
            setShowContent(true);
            this.kill();
          }
        },
      })
      .to(".svg", {
        opacity: 0,
        duration: 0.5,
        onComplete: function () {
          document.querySelector(".svg").remove();
        },
      });
  });

  // GSAP animations for the main content after reveal
  useGSAP(() => {
    if(!showContent) return;

    // Animation for landing section
    gsap.to(".landing", {
      scale:1,
      rotate:0,
      duration: 1,
      ease: "Expo.easeInOut",
      delay:"-1s",
    })

    // Parallax effect on mouse move
    const main = document.querySelector(".main");
    const tl = gsap.timeline();
    main?.addEventListener("mousemove", (e) => {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".imagesdiv .text", {
        x: `${xMove * 0.5}%`,
      });
      gsap.to(".sky", {
        x: xMove,
      });
      gsap.to(".bg", {
        x: -xMove,
      });
    });

    // Animations for various elements
    gsap.from(".logogta", {
      y:100,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: "Power4.out",
    });
    gsap.from(".girlbg", {
      y:120,
      x: 100,
      translateOrigin:"20% 70%",
      duration: 1,
      delay: 0.3,
      ease: "Power4.out",
    });
    gsap.from(".text", {
      y:120,
      x: 200,
      translateOrigin:"20% 70%",
      rotate: 20,
      duration: 1,
      delay: 0.5,
      ease: "Power4.out",
    });
  }, [showContent]);

  // Button hover effect and click handler
  const gtaBtn = document.getElementsByClassName("GTAbtn");
  function gtaBtnHover() {
    window.location.href =
      "https://www.rockstargames.com/newswire/article/3928aaa9471o3a/grand-theft-auto-vi-watch-trailer-2-now";
    gsap.from(gtaBtn, {
      scale: 0.9,
      duration: 0.1,
      ease: "Power4.out",
    });
  }
  return (
    <>
      {/* Initial SVG mask animation */}
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="GTAArtDeco"
                  fontWeight="900"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.webp"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {/* Main content shown after animation */}
      {showContent && (
        <div className="main w-full select-none overflow-hidden ">
          {/* Landing section with navbar and background elements */}
          <div className="landing relative w-full h-screen bg-black rotate-[-10deg] scale-[1.5]" >
            <nav className="navbar absolute top-0 left-0  z-[9] w-full py-9 px-8">
              <div className="logo flex gap-7 ">
                <div className="lines flex flex-col gap-[3px]">
                  <div className="line w-9 h-1 bg-white"></div>
                  <div className="line w-7 h-1 bg-white"></div>
                  <div className="line w-3 h-1 bg-white"></div>
                </div>
                <h1 className="text-2xl -mt-[11px] item-center text-white">
                  Rockstar
                </h1>
              </div>
            </nav>
            <div className="imagesdiv relative w-full h-screen overflow-hidden">
              <img
                className="sky absolute scale-[1.3] top-0 left-0 w-full h-full object-cover "
                src="./sky.webp"
                alt=""
              />
              <img
                className="bg scale-[1.1] absolute top-0 left-0 w-full h-full object-cover "
                src="./bg.webp"
                alt=""
              />
              <div className="text text-white absolute top-1/15 left-1/3 -translate-x-1/2 flex flex-col gap-3 leading-none items-center">
                <h1 className="text-[6rem] -ml-30">grand</h1>
                <h1 className="text-[6rem] ml-41">theft</h1>
                <h1 className="text-[6rem] -ml-60">auto</h1>
              </div>
              <img
                className="girlbg absolute bottom-[-68.5%] w-[50%] left-1/4 -translate-x-1/2 object-cover  "
                src="./girlbg.webp"
                alt=""
              />
              <img
                className="logogta absolute h-30 w-22 top-[55%] left-[65%]  -translate-x-1/2 -translate-y-1/2"
                src="./logo18.webp"
                alt=""
              />
            </div>
            <div className="btmbar flex flex-row items-center text-white text-xl absolute w-full py-8 px-8 bottom-0  bg-gradient-to-transparent">
              <div className="flex gap-4 items-center">
                <i className=" text-2xl ri-arrow-down-line"></i>
                <div className="font-[Helvetica_Now_Display] text-[1.1rem]">
                  Scroll Down
                </div>
              </div>
              <img
                className="absolute h-[40px] top-1/4  left-[45%] -translate-x-1/2 -translate-y-1/2 "
                src="./ps5.webp"
                alt=""
              />
            </div>
          <div class="absolute -bottom-5 left-0 w-full h-20 bg-gradient-to-t from-black/90 to-transparent pointer-events-none z-10"></div>
          </div>
          <div className="w-full h-screen bg-black flex items-center justify-center ">
            <div className="conatiner w-full h-[80%] flex ">
              <div className="limag w-1/2  h-full relative">
                <img
                  className="absolute left-1/10 -translate-x-1/2 -translate-y-1/2"
                  src="./imag.webp"
                  alt=""
                />
              </div>
              <div className="rg text-white">
                <h1 className="text-8xl">Still Running, </h1>
                <h1 className="text-8xl">Not Hunting</h1>
                <p className="text-3xl py-5 font-extrabold bg-gradient-to-b from-pink-500 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-md">
                  Watch Trailer 2
                </p>
                <p className="text-1xl w-[80%] font-[GTAArtDeco] pt-2 ">
                  GTA VI introduces a stunning open world with improved
                  graphics, deeper storylines, dynamic weather, and immersive
                  gameplay set in a vibrant Vice City.
                </p>
                <p className="text-1xl w-[80%] font-[GTAArtDeco] pt-4 ">
                  Players experience high-speed chases, complex heists, and
                  evolving character arcs in GTA VI, delivering Rockstar’s most
                  ambitious and expansive game ever released.
                </p>

                <button
                  onClick={gtaBtnHover}
                  className="GTAbtn p-2 bg-yellow-400 text-black text-4xl mt-2 cursor-pointer"
                >
                  Watch Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
