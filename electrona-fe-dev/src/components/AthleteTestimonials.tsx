import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Testimonial {
  id: number;
  name: string;
  discipline: string;
  achievement: string;
  quote: string;
  image: string;
  theme: 'orange' | 'cyan';
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sagar',
    discipline: 'Boxer • State Medalist',
    achievement: 'All India University Participant',
    quote: "I'm a boxer and a state medalist who has also represented at the All India University level. I tried the supplement and it tasted balanced, not overly sweet or bitter. Mixed with the recommended amount of water, it worked well during both training sessions and matches. I felt refreshed, hydrated and ready to perform.",
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&auto=format&fit=crop&q=80',
    theme: 'orange'
  },
  {
    id: 2,
    name: 'Abhishek',
    discipline: 'Basketball Player',
    achievement: 'Gym Enthusiast',
    quote: "I play basketball and train in the gym regularly. Electrona had a pleasant taste without excessive sweetness and mixed smoothly with water. Compared to traditional hydration products, it felt lighter, cleaner and more enjoyable during workouts.",
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    theme: 'cyan'
  }
];

export default function AthleteTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotation cycle every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); 

    return () => clearInterval(timer);
  }, []);

  const currentTestimonial = testimonials[activeIndex];
  const activeColor = currentTestimonial.theme === 'orange' ? '#FF6B00' : '#00CBDD';

  const cardVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
    },
    exit: { 
      opacity: 0, 
      y: -15,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };

  return (
    <section 
      className="relative bg-[#050505] py-16 md:py-24 px-6 md:px-12 lg:px-24 border-b border-white/5 overflow-hidden" 
      id="testimonials-section"
    >
      {/* Background soft ambient wash */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full filter blur-[120px] opacity-[0.06] pointer-events-none transition-all duration-1000 ease-in-out"
        style={{
          background: `radial-gradient(circle, ${activeColor} 0%, transparent 70%)`
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10 w-full">
        
        {/* Simple & Elegant SaaS Header Layout */}
        <div className="flex flex-col items-center text-center space-y-3 mb-12 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase font-sans">
            ATHLETE STORIES
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed font-sans font-normal">
            Trusted by active athletes who balance intense training strain with optimal hydration.
          </p>
        </div>

        {/* Testimonials Viewer Panel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="min-h-[460px] md:min-h-[340px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeIndex}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full relative overflow-hidden rounded-3xl bg-zinc-900/30 border border-white/5 backdrop-blur-md p-6 md:p-10 transition-shadow duration-300 shadow-xl hover:shadow-2xl hover:border-white/10"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  
                  {/* LEFT IMAGE CHANNEL */}
                  <div className="col-span-1 md:col-span-4 flex justify-center">
                    <div className="relative w-full max-w-[240px] md:max-w-full aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 group shadow-md">
                      <motion.img 
                        src={currentTestimonial.image} 
                        alt={currentTestimonial.name}
                        className="w-full h-full object-cover select-none"
                        referrerPolicy="no-referrer"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* RIGHT TEXT DESCRIPTION */}
                  <div className="col-span-1 md:col-span-8 text-left flex flex-col justify-between h-full space-y-6">
                    
                    {/* The Quote Block */}
                    <div className="space-y-4">
                      {/* Quote Text */}
                      <div 
                        className="pl-4 border-l-2 py-1 transition-colors duration-500" 
                        style={{ borderColor: activeColor }}
                      >
                        <p className="text-neutral-200 text-base md:text-lg font-normal leading-relaxed font-sans">
                          “{currentTestimonial.quote}”
                        </p>
                      </div>
                    </div>

                    {/* Profile Information Block */}
                    <div className="pt-4 border-t border-white/5 space-y-1">
                      <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-none">
                        {currentTestimonial.name}
                      </h4>
                      
                      <div className="flex flex-wrap gap-x-2 gap-y-1 items-center text-xs md:text-sm text-zinc-400">
                        <span className="font-medium text-zinc-300">{currentTestimonial.discipline}</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-700 hidden sm:inline-block" />
                        <span className="text-zinc-500">{currentTestimonial.achievement}</span>
                      </div>
                    </div>

                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Aesthetic Indicator Dots */}
          <div className="flex items-center justify-center gap-2.5 mt-8 select-none">
            {testimonials.map((t, idx) => {
              const themeColor = t.theme === 'orange' ? '#FF6B00' : '#00CBDD';
              const isSelected = activeIndex === idx;
              return (
                <button 
                  key={t.id}
                  onClick={() => {
                    setActiveIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    isSelected ? 'w-8' : 'w-2 bg-zinc-800 hover:bg-zinc-700'
                  }`}
                  style={{
                    backgroundColor: isSelected ? themeColor : undefined
                  }}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
