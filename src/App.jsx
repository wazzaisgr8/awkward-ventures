import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TruthHover = ({ corporate, reality }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative cursor-help py-4 border-b border-black/10 dark:border-white/10 group overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
    >
      <div className="flex justify-between items-center transition-opacity duration-300">
        <span className={`text-xl md:text-2xl font-medium tracking-tight transition-all duration-500 ${isHovered ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
          {corporate}
        </span>
        <div className={`absolute left-0 right-0 transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="text-xl md:text-2xl italic text-[#A2D149] font-mono">
            // {reality}
          </span>
        </div>
      </div>
    </div>
  );
};

const Section = ({ children, className = "" }) => (
  <section className={`min-h-screen flex flex-col justify-center px-6 md:px-24 py-20 ${className}`}>
    {children}
  </section>
);

const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  
  const words = ["Growth", "Design", "Scaling", "Starting"];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] } }
  };

  const truths = [
    { corporate: "Scaling at Speed", reality: "Breaking things faster than you can fix them." },
    { corporate: "Strategic Pivot", reality: "We realized the first idea wasn't going to work." },
    { corporate: "Disruptive Innovation", reality: "Making people uncomfortable by changing the status quo." },
    { corporate: "Synergy", reality: "Admitting we actually need each other to survive." },
    { corporate: "Fail Fast", reality: "It hurts, it's expensive, and it's the only way to learn." }
  ];

  const services = [
    { title: "Venture Incubation", desc: "Turning 'bad' ideas into viable markets." },
    { title: "Radical Leadership", desc: "Stripping away the ego to build resilient teams." },
    { title: "DEI as Strategy", desc: "Not a checklist. A competitive advantage." },
    { title: "Operational Friction", desc: "Finding the bottlenecks that everyone is ignoring." }
  ];

  return (
    <div className="bg-[#F9F9F9] text-[#111111] selection:bg-[#A2D149] selection:text-black font-sans scroll-smooth">
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <line x1="10%" y1="0" x2="10%" y2="100%" stroke="black" strokeWidth="1" />
          <line x1="90%" y1="0" x2="90%" y2="100%" stroke="black" strokeWidth="1" />
          <circle cx="50%" cy="50%" r="40%" fill="none" stroke="black" strokeWidth="0.5" strokeDasharray="10 20" />
        </svg>
      </div>

      <nav className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-start z-50 mix-blend-difference text-white">
        <div className="font-bold text-lg tracking-tighter">AWKWARD VENTURES</div>
        <div className="text-sm font-mono tracking-widest uppercase rotate-90 origin-right translate-y-12">
          EST. 2026
        </div>
      </nav>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <Section className="items-center text-center">
          <motion.div 
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
            className="max-w-4xl"
          >
            <motion.div variants={itemVariants} className="text-5xl md:text-8xl font-bold tracking-tight leading-[0.9] mb-8 flex flex-col md:flex-row items-center justify-center md:gap-x-4">
              <div className="relative h-[1.2em] flex items-center justify-center overflow-visible">
                {/* Hidden placeholder text to ensure the container always takes up the width 
                  of the longest word ("Starting"), preventing the sentence from jumping.
                */}
                <span className="opacity-0 invisible whitespace-nowrap" aria-hidden="true">
                  Starting
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[wordIndex]}
                    initial={{ y: "60%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-60%", opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute whitespace-nowrap left-0 right-0 text-center"
                  >
                    {words[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="whitespace-nowrap">is <span className="text-[#A2D149] italic">awkward.</span></span>
            </motion.div>
            <motion.p variants={itemVariants} className="text-xl md:text-3xl font-light mb-4">
              Success is rarely linear.
            </motion.p>
            <motion.p variants={itemVariants} className="text-xl md:text-3xl font-light opacity-60">
              We’re here for the messy parts.
            </motion.p>
          </motion.div>
        </Section>

        {/* TRUTH SECTION */}
        <Section className="bg-white">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-24">
              <h2 className="text-sm font-mono uppercase tracking-widest text-[#A2D149] mb-4">01 // The Reality</h2>
              <p className="text-2xl font-medium max-w-xs">
                We trade in honesty. Hover to reveal the truth behind the jargon.
              </p>
            </div>
            <div className="md:col-span-8 md:col-start-6">
              {truths.map((t, idx) => (
                <TruthHover key={idx} corporate={t.corporate} reality={t.reality} />
              ))}
            </div>
          </div>
        </Section>

        {/* PHILOSOPHY SECTION */}
        <Section className="bg-[#111111] text-white">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <h2 className="text-sm font-mono uppercase tracking-widest text-[#A2D149] mb-8">02 // Philosophy</h2>
              <p className="text-3xl md:text-5xl font-bold leading-tight mb-12">
                Most consultancies sell you a polished version of the future. <br/>
                <span className="opacity-40">We prefer the raw version of the present.</span>
              </p>
            </div>
            <div className="md:col-span-5 md:mt-40 space-y-8 text-lg font-light leading-relaxed opacity-80">
              <p>
                Awkward Ventures was built on the belief that the most valuable insights live in the gaps—the uncomfortable conversations and non-scalable ideas.
              </p>
              <p>
                We don't just advise; we incubate the friction required for real innovation. 
              </p>
              <p className="text-[#A2D149] font-medium italic">
                Because if it isn't a little awkward, you probably aren't growing.
              </p>
            </div>
          </div>
        </Section>

        {/* SERVICES SECTION */}
        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
              <h2 className="text-sm font-mono uppercase tracking-widest text-[#A2D149] mb-12">03 // Focus</h2>
              <div className="space-y-16">
                {services.map((s, idx) => (
                  <div key={idx} className={idx % 2 !== 0 ? 'md:pl-12' : ''}>
                    <h3 className="text-3xl font-bold mb-2">{s.title}</h3>
                    <p className="text-xl opacity-60 max-w-sm">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
               <svg viewBox="0 0 200 200" className="w-full max-w-md opacity-20">
                  <path d="M10,10 L190,190 M10,190 L190,10" stroke="currentColor" strokeWidth="0.5" fill="none" />
                  <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" fill="none" />
                  <rect x="40" y="40" width="120" height="120" stroke="currentColor" strokeWidth="0.5" fill="none" transform="rotate(45 100 100)" />
               </svg>
            </div>
          </div>
        </Section>

        {/* CTA SECTION */}
        <Section className="bg-white items-center text-center overflow-hidden">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="group"
          >
            <a 
              href="mailto:hello@awkward.ventures" 
              className="text-4xl md:text-7xl font-bold tracking-tighter hover:text-[#A2D149] transition-colors duration-300"
            >
              Start the awkward conversation.
              <span className="block h-1 w-0 group-hover:w-full bg-[#A2D149] transition-all duration-500 mt-2 mx-auto"></span>
            </a>
          </motion.div>
          <div className="mt-24 text-sm font-mono opacity-30">
            &copy; {new Date().getFullYear()} AWKWARD VENTURES &mdash; NO FLUFF.
          </div>
        </Section>
      </main>

      {/* Custom Cursor / Noise Layer */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.015] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
};

export default App;