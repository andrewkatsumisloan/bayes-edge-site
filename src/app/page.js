"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const ModelViewer = dynamic(() => import("./components/ModelViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-[#1c1c1c]">
      <div className="bg-black/20 backdrop-blur-md px-6 py-4 rounded-2xl shadow-[inset_0px_0.5px_0px_rgba(255,255,255,0.3)] border border-white/10">
        <p className="mono text-white/60 text-sm tracking-wide">
          INITIALIZING_SCENE();
        </p>
      </div>
    </div>
  ),
});

function PurchaseModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xl"
        onClick={onClose}
      ></div>
      <div className="relative z-10 w-[90%] sm:w-[80%] max-w-3xl bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 shadow-[inset_0px_0.5px_0px_rgba(255,255,255,0.3)]">
        <div className="p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white mono text-sm"
          >
            EXIT();
          </button>

          <h3 className="mono text-2xl sm:text-3xl font-medium tracking-tighter text-white mb-2">
            TYCHO_1.0 // DEVELOPER_EDITION
          </h3>
          <p className="text-white/60 text-xs sm:text-sm tracking-widest tech-text mb-6">
            EARLY_ACCESS_DEVELOPMENT_PLATFORM
          </p>

          <div className="space-y-6">
            <div className="bg-black/20 rounded-2xl p-6 border border-white/10">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="mono text-2xl sm:text-3xl text-white">
                  $3,000
                </span>
                <span className="text-white/60 text-xs tracking-wider">
                  USD
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-white/80 text-sm tracking-wide tech-text">
                  Get early access to our development platform and be part of
                  shaping the future of robotics.
                </p>
                <p className="text-white/60 text-xs tracking-wide tech-text">
                  Note: This is an early development platform intended for
                  researchers and developers.
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <div className="text-white/60 mono text-xs">{">"}</div>
                  <p className="text-white/80 text-sm tracking-wide tech-text">
                    Complete Tycho 1.0 robotic system with dual-arm
                    configuration
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-white/60 mono text-xs">{">"}</div>
                  <p className="text-white/80 text-sm tracking-wide tech-text">
                    Full SDK access, open sourced and free to use
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-white/60 mono text-xs">{">"}</div>
                  <p className="text-white/80 text-sm tracking-wide tech-text">
                    Direct developer support and regular firmware updates
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-white/60 mono text-xs">{">"}</div>
                  <p className="text-white/80 text-sm tracking-wide tech-text">
                    Early access to future features and development roadmap
                  </p>
                </div>
              </div>

              <a
                href="mailto:sales@bayesedge.com"
                className="block w-full mono bg-white/10 hover:bg-white/15 backdrop-blur-md px-6 py-3 rounded-xl font-medium text-white border border-white/10 shadow-[inset_0px_0.5px_0px_rgba(255,255,255,0.3)] transition-all text-sm tracking-wider text-center"
              >
                CONTACT_SALES();
              </a>
            </div>

            <div className="text-white/40 text-xs tracking-wide tech-text text-center">
              Limited availability. Shipping and handling not included.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [showFooter, setShowFooter] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const modelUrl = "/models/tycho.gltf"; // You'll need to add your GLTF file to the public/models directory

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setShowFooter(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      <PurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
      />

      {/* Hero Section */}
      <div className="relative h-screen overflow-y-auto overflow-x-hidden">
        <ModelViewer modelUrl={modelUrl} />

        {/* Header */}
        <div className="absolute top-4 sm:top-6 left-0 right-0 z-10">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="bg-black/20 backdrop-blur-md px-4 sm:px-8 py-4 sm:py-5 rounded-2xl shadow-[inset_0px_0.5px_0px_rgba(255,255,255,0.3)] border border-white/10">
              <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
                <div className="flex items-center gap-3 sm:gap-8 w-full sm:w-auto">
                  <h1 className="mono text-xl sm:text-2xl font-medium tracking-tighter text-white mix-blend-plus-lighter">
                    BAYES_EDGE
                  </h1>
                  <div className="h-6 w-px bg-white/10"></div>
                  <p className="text-white/60 text-xs sm:text-sm tracking-widest tech-text">
                    ROBOTICS DIVISION
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => {
                      document
                        .getElementById("about")
                        .scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-white/80 hover:text-white transition-colors text-xs sm:text-sm tracking-wider mono px-4"
                  >
                    ABOUT
                  </button>
                  <div className="h-4 w-px bg-white/10"></div>
                  <button
                    onClick={() => {
                      document
                        .getElementById("contact")
                        .scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-white/80 hover:text-white transition-colors text-xs sm:text-sm tracking-wider mono px-4"
                  >
                    CONTACT
                  </button>
                  <div className="h-4 w-px bg-white/10"></div>
                  <button
                    onClick={() => setShowPurchaseModal(true)}
                    className="mono bg-white/10 hover:bg-white/15 px-4 py-1.5 rounded-full text-white border border-white/10 shadow-[inset_0px_0.5px_0px_rgba(255,255,255,0.3)] transition-all text-xs sm:text-sm tracking-wider mx-4"
                  >
                    PURCHASE();
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#1c1c1c] via-[#1c1c1c]/80 to-transparent pb-8 sm:pb-28 pt-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mx-auto sm:mx-0">
              <div className="mono text-white/60 text-xs sm:text-sm tracking-widest mb-1">
                // INTRODUCING
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-1 sm:mb-2 text-white tracking-tighter tech-text">
                TYCHO_1.0
              </h2>
              <p className="text-base sm:text-lg md:text-xl mb-3 sm:mb-6 text-white/80 tracking-wide tech-text leading-relaxed">
                just two arms and some wheels
              </p>
              <button className="mono bg-black/20 backdrop-blur-md px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium text-white border border-white/10 shadow-[inset_0px_0.5px_0px_rgba(255,255,255,0.3)] hover:bg-black/30 transition-all text-xs sm:text-sm tracking-wider">
                INITIALIZE_DEMO();
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`fixed bottom-4 sm:bottom-8 inset-x-0 z-10 transition-opacity duration-300 ${
            showFooter ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="container mx-auto px-4 sm:px-6">
            <div className="bg-black/20 backdrop-blur-md px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl shadow-[inset_0px_0.5px_0px_rgba(255,255,255,0.3)] border border-white/10 max-w-fit mx-auto">
              <p className="mono text-white/40 text-xs sm:text-sm tracking-wide">
                © 2024 BAYES_EDGE_ROBOTICS // ALL_RIGHTS_RESERVED
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="bg-[#1c1c1c] py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mono text-white/60 text-xs sm:text-sm tracking-widest mb-3">
              // ABOUT_TYCHO_1.0
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-white tracking-tighter tech-text">
              ADVANCING_ROBOTICS_DEVELOPMENT
            </h2>

            <div className="space-y-8">
              <div className="bg-black/20 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-[inset_0px_0.5px_0px_rgba(255,255,255,0.3)]">
                <h3 className="mono text-lg sm:text-xl font-medium tracking-tighter text-white mb-4">
                  PLATFORM_OVERVIEW
                </h3>
                <p className="text-white/80 text-base sm:text-lg tracking-wide tech-text leading-relaxed mb-6">
                  Tycho 1.0 represents our first iteration in advanced robotics
                  development. Built with a focus on versatility and precision,
                  it features a dual-arm configuration mounted on a mobile base
                  platform.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="text-white/60 mono text-xs">{">"}</div>
                    <p className="text-white/80 text-sm tracking-wide tech-text">
                      Dual-arm system with advanced kinematics for complex
                      manipulation tasks
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-white/60 mono text-xs">{">"}</div>
                    <p className="text-white/80 text-sm tracking-wide tech-text">
                      Mobile base platform enabling flexible deployment and
                      navigation
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-white/60 mono text-xs">{">"}</div>
                    <p className="text-white/80 text-sm tracking-wide tech-text">
                      Open-source control system with modular architecture for
                      custom development
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-black/20 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-[inset_0px_0.5px_0px_rgba(255,255,255,0.3)]">
                <h3 className="mono text-lg sm:text-xl font-medium tracking-tighter text-white mb-4">
                  DEVELOPMENT_FOCUS
                </h3>
                <p className="text-white/80 text-base sm:text-lg tracking-wide tech-text leading-relaxed">
                  As a development platform, Tycho 1.0 is designed to push the
                  boundaries of robotic capabilities. Our focus is on creating a
                  versatile system that can serve as a foundation for research
                  and innovation in robotics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="bg-[#1c1c1c] py-20 sm:py-32 border-t border-white/10"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mono text-white/60 text-xs sm:text-sm tracking-widest mb-3">
              // CONTACT_US
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-white tracking-tighter tech-text">
              GET_IN_TOUCH
            </h2>

            <div className="bg-black/20 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-[inset_0px_0.5px_0px_rgba(255,255,255,0.3)]">
              <p className="text-white/80 text-base sm:text-lg tracking-wide tech-text leading-relaxed mb-8">
                Interested in Tycho 1.0 or want to learn more about our robotics
                development platform? Our team is ready to assist you with any
                questions about capabilities, implementation, or potential
                collaborations.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="text-white/60 mono text-xs">{">"}</div>
                  <p className="text-white/80 text-sm tracking-wide tech-text">
                    Email:{" "}
                    <a
                      href="mailto:developers@bayesedge.com"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      developers@bayesedge.com
                    </a>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-white/60 mono text-xs">{">"}</div>
                  <p className="text-white/80 text-sm tracking-wide tech-text">
                    Response Time: Within 24-48 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
