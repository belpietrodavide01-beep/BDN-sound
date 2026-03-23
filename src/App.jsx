import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Speaker, Zap, Music, ArrowRight, Instagram, MessageCircle, Star } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

gsap.registerPlugin(ScrollTrigger);

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sleek Navbar fading with absolute contrast
      ScrollTrigger.create({
        trigger: ".hero-section",
        start: "bottom top",
        onEnter: () => {
          gsap.to(".navbar", {
            backgroundColor: "rgba(9, 9, 11, 0.98)", // Almost pure solid dark
            backdropFilter: "blur(24px)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.8)",
            duration: 0.4,
            ease: "power2.out"
          });
        },
        onLeaveBack: () => {
          gsap.to(".navbar", {
            backgroundColor: "transparent",
            backdropFilter: "blur(0px)",
            borderBottom: "1px solid transparent",
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
            boxShadow: "none",
            duration: 0.4,
            ease: "power2.out"
          });
        }
      });

      // Advanced Hero Fade with Parallax
      const heroTl = gsap.timeline();
      heroTl.from(".hero-elem", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.1
      });

      // Text reveal for sections (performance optimized)
      gsap.utils.toArray('.reveal-up').forEach(elem => {
        gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: "top 90%", // Trigger slightly earlier to avoid missing it
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      });

      // Dynamic About Us Image Float
      gsap.to(".about-img-1", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: "#about",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to(".about-img-2", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: "#about",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // VERY SPECIFIC FIX FOR SERVICES SECTION:
      // Replaced standard 'from' with 'fromTo' to guarantee opacity strictly goes to 1.0!
      // This prevents the GSAP scroll trigger glitch that caused the 3rd element to stay at 50% opacity.
      gsap.fromTo('.service-card',
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '#services',
            start: "top 80%",
          },
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out"
        }
      );

      // Pricing cards sliding in with extreme precision
      gsap.fromTo('.price-card-left',
        { x: -40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '#packages',
            start: "top 75%",
          },
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          clearProps: "all"
        }
      );

      gsap.fromTo('.price-card-right',
        { x: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '#packages',
            start: "top 75%",
          },
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.15,
          clearProps: "all"
        }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-background text-primary min-h-screen selection:bg-accent/30 selection:text-white font-body relative">

      {/* NAVBAR: Fixed text color and blur logic */}
      <nav className="navbar fixed top-0 w-full z-[100] flex items-center justify-between px-6 md:px-12 py-6 transition-all text-white">
        <div className="font-heading font-bold tracking-tight text-2xl flex items-center gap-1">
          BDN<span className="text-accent font-regular text-[0.9em]">sound</span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-heading text-[15px] font-medium text-white/80">
          <a href="#about" className="hover:text-white transition-colors uppercase tracking-widest text-[13px]">Chi Siamo</a>
          <a href="#services" className="hover:text-white transition-colors uppercase tracking-widest text-[13px]">Servizi</a>
          <a href="#contact" className="hover:text-white transition-colors uppercase tracking-widest text-[13px]">Contatti</a>
        </div>
        <a href="#contact" className="bg-white text-background px-6 py-2.5 rounded-full font-heading font-semibold text-[15px] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-white/10 btn-magnetic uppercase tracking-wider">
          <span className="relative z-10 block">Prenota ora</span>
        </a>
      </nav>

      {/* HERO SECTION WITH CRYSTAL CLEAR VIDEO */}
      <section className="hero-section relative h-[100dvh] w-full flex flex-col justify-center px-6 md:px-16 overflow-hidden bg-background">

        {/* DOM Order 1: Video is absolutely positioned with no opacity filters. 
            Only a single gradient at the bottom so the top/center is pure raw video. */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-center"
          >
            <source src="/media/bistrot-hero.mp4" type="video/mp4" />
          </video>
          {/* Overlays strictly limited to the bottom half for text readability */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
          {/* Subtle global dark wash so white text stays visible everywhere */}
          <div className="absolute inset-0 bg-black/15"></div>
        </div>

        {/* DOM Order 2: Content Container (relative z-10) */}
        <div className="relative z-10 w-full max-w-5xl mt-20">
          <div className="hero-elem mb-6">
            <span className="inline-flex items-center gap-2 border border-white/20 bg-black/40 backdrop-blur-xl px-4 py-1.5 rounded-full text-[13px] font-heading font-medium tracking-wide text-white uppercase">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-glow"></span>
              House Party / Feste Private / Club Vibes
            </span>
          </div>

          <h1 className="hero-elem font-serif text-6xl md:text-8xl lg:text-[7.5rem] leading-[1.05] text-white tracking-tight drop-shadow-lg">
            Entra nel ritmo<br />
            <span className="serif-accent italic text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400 text-[0.85em]">Feel the vibe</span>
          </h1>

          <p className="hero-elem text-white/90 text-[1.15rem] md:text-xl max-w-2xl mt-8 mb-12 font-light leading-relaxed font-body drop-shadow-md">
            Portiamo house, tech-house e techno direttamente nella tua festa privata. Impianto club-grade, luci sincronizzate e selezione musicale curata per trasformare qualsiasi spazio nel tuo dancefloor personale.
          </p>

          <div className="hero-elem flex flex-wrap gap-4 font-heading">
            <a href="#contact" className="bg-accent text-background px-8 py-4 rounded-full font-bold text-[17px] hover:bg-accent/90 hover:scale-105 hover:shadow-[0_0_40px_rgba(56,189,248,0.4)] transition-all flex items-center gap-2 group duration-300 uppercase tracking-widest">
              Contattaci <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* CHI SIAMO / ABOUT US */}
      <section id="about" className="py-32 px-6 md:px-16 bg-background overflow-hidden relative border-t border-white/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Images Column */}
          <div className="relative h-[650px] w-full reveal-left perspective-[1000px]">
            {/* Main Image */}
            <div className="about-img-1 absolute top-0 left-0 w-[70%] h-[75%] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 z-10 gpu-accel transform-style-3d group">
              <img src="/media/foto1.png" alt="DJ 1" className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-700"></div>
            </div>
            {/* Secondary Image Overlapping */}
            <div className="about-img-2 absolute bottom-0 right-0 w-[65%] h-[65%] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 z-20 gpu-accel transform-style-3d group">
              <img src="/media/foto2.png" alt="DJ 2" className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
              <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-700"></div>
            </div>

            {/* Floating UI Element */}
            <div className="absolute top-1/2 -left-8 bg-[#111115]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl z-30 gpu-accel">
              <div className="font-heading font-bold text-4xl text-white mb-1 drop-shadow-md">100+ <span className="text-accent font-regular text-xl">events</span></div>
              <div className="font-heading text-[14px] font-medium text-white/50 leading-snug uppercase tracking-widest">House party</div>
            </div>
          </div>

          {/* Text Column */}
          <div className="flex flex-col w-full reveal-right">
            <h2 className="font-regular text-accent tracking-widest uppercase text-xs mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-accent"></span> Chi siamo
            </h2>

            <h3 className="font-serif text-5xl md:text-6xl text-white leading-[1.1] mb-8 whitespace-nowrap">
              Più di un semplice <span className="serif-accent italic text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400 pl-2 text-[0.85em]">SET</span>
            </h3>

            <p className="text-white/70 text-lg leading-relaxed font-light font-body mb-6">
              Siamo due DJ specializzati in house, tech-house e techno. Non suoniamo per qualsiasi evento: ci concentriamo esclusivamente su feste private e house party dove possiamo portare l'energia e il sound di un vero club.
            </p>
            <p className="text-white/70 text-lg leading-relaxed font-light font-body mb-10">
              Arriviamo con il nostro impianto completo — casse, luci LED e consolle — e trasformiamo il tuo spazio in un dancefloor. Dalla selezione musicale al mixaggio live, gestiamo tutto noi per garantirti un'esperienza sonora da club senza compromessi.
            </p>

            <div className="flex flex-wrap gap-4 font-heading">
              <span className="bg-[#111115] border border-white/5 shadow-inner shadow-white/5 px-6 py-3 rounded-full text-white/90 font-medium text-[14px] flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent" /> Impianto Club-Grade</span>
              <span className="bg-[#111115] border border-white/5 shadow-inner shadow-white/5 px-6 py-3 rounded-full text-white/90 font-medium text-[14px] flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent" /> Solo House / Techno</span>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS MARQUEE - Infinite Scrolling Testimonials */}
      {/* Replaced the static grid with a pure CSS infinite scrolling flex container */}
      <section id="reviews" className="py-24 bg-[#0a0a0c] border-y border-white/5 relative overflow-hidden flex flex-col items-center">
        <div className="w-full max-w-6xl px-6 md:px-16 text-center mb-16 reveal-up">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Chi ha ballato <span className="serif-accent italic text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400 pl-1 text-[0.85em]">conferma</span></h2>
          <p className="text-white/60 text-lg font-body font-light max-w-xl mx-auto">
            Le parole di chi ha trasformato la propria festa in un vero club.
          </p>
        </div>

        {/* Infinite CSS Marquee Container using Tailwind custom classes */}
        <div className="w-full overflow-hidden flex relative group">

          <div className="flex whitespace-nowrap min-w-full animate-marquee group-hover:hover-pause gap-6 px-3">
            {/* Repeated reviews array to create the infinite loop seamlessly */}
            {[...Array(2)].map((_, arrayIndex) => (
              <div key={arrayIndex} className="flex gap-6">
                <ReviewCard
                  name="Valentina R."
                  event="House Party"
                  text="Non pensavo fosse possibile ricreare l'atmosfera di un club nel mio giardino. Casse potenti, bassi profondi e una selezione house perfetta. I miei ospiti non hanno smesso di ballare."
                />
                <ReviewCard
                  name="Luca D."
                  event="Festa Privata"
                  text="Volevo tech-house e techno per il mio compleanno. Hanno capito subito il mood e hanno tenuto la pista accesa fino alle 4 di notte. Setup pazzesco."
                />
                <ReviewCard
                  name="Sara M."
                  event="House Party in Villa"
                  text="Servizio top. Sono arrivati, hanno montato tutto in un'ora e il sound era da club vero. Luci sincronizzate col beat, un'esperienza incredibile."
                />
                <ReviewCard
                  name="Andrea P."
                  event="After-Party"
                  text="Cercavo qualcuno che suonasse techno vera, non le solite hit commerciali. BDN Sound ha spaccato. Il mio salotto è diventato un underground club."
                />
              </div>
            ))}
          </div>
        </div>

        {/* Edge fade gradients purely physical on the edges without wrapping cards */}
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#0a0a0c] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#0a0a0c] to-transparent z-10 pointer-events-none"></div>
      </section>

      {/* SERVICES REDESIGN - Aggressive, Premium, High Contrast */}
      <section id="services" className="py-32 px-6 md:px-16 bg-background relative border-b border-white/5">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex flex-col text-center mb-16 reveal-up">
            <h2 className="font-serif text-5xl md:text-7xl text-white mb-6">Cosa <span className="serif-accent italic text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400 pl-2 text-[0.85em]">facciamo.</span></h2>
            <p className="text-white/60 text-xl font-body font-light max-w-2xl mx-auto">
              Un unico focus: portare il sound e l'energia del club nella tua festa privata.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <ServiceListCard
              title="House Party DJ Set"
              desc="Sessioni house e tech-house per feste in casa, giardini, terrazze e ville. Selezione musicale curata e mixaggio live per tenere il dancefloor vivo tutta la notte."
            />
            <ServiceListCard
              title="Setup Audio & Luci"
              desc="Portiamo il nostro impianto club-grade ovunque: casse attive,consolle professionale e sistema LED sincronizzato col beat."
            />
            <ServiceListCard
              title="Private Techno Night"
              desc="Per chi vuole un sound più underground. Set techno e minimal dedicati, con atmosfera dark e immersiva. Il tuo spazio diventa un club."
            />
            <ServiceListCard
              title="Consulenza Musicale"
              desc="Ti aiutiamo a scegliere il setup giusto per il tuo spazio: potenza delle casse, disposizione e tipologia di luci in base alla location."
            />
          </div>
        </div>
      </section>

      {/* PACKAGES SECTION */}
      <section id="packages" className="py-32 px-6 md:px-16 bg-[#0a0a0c] relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 reveal-up">
            <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">Due formule. <br className="md:hidden" /><span className="serif-accent italic text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400 text-[0.85em]">Zero sorprese.</span></h2>
            <p className="text-white/60 text-xl max-w-2xl mx-auto font-body font-light">
              Niente agenzie, niente intermediari. Parli direttamente con noi e sai esattamente cosa ottieni.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto relative perspective-[1200px]">

            {/* Solo DJ Card */}
            <div className="price-card-left bg-[#111115] border border-white/5 rounded-[2.5rem] p-8 md:p-12 flex flex-col h-full hover:border-white/20 transition-all duration-500 hover:-translate-y-2 gpu-accel shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors"></div>

              <div className="mb-8 border-b border-white/10 pb-8 relative z-10">
                <h3 className="font-serif text-3xl text-white mb-3">Solo DJ Set</h3>
                <p className="font-body text-white/50 text-[16px] font-medium leading-relaxed">Hai già un impianto audio nella tua location? Arriviamo con la nostra consolle e suoniamo per tutta la serata.</p>
              </div>

              <ul className="space-y-5 mb-12 flex-1 font-heading relative z-10">
                <FeatureItem text="Due DJ alla console" />
                <FeatureItem text="Set fino a 5 ore — house, tech-house, techno" />
                <FeatureItem text="Selezione musicale personalizzata" />
                <FeatureItem text="Consolle e controller nostri" />
              </ul>

              <a href="#contact" className="relative z-10 w-full py-4 text-center rounded-[1rem] bg-white/5 border border-white/10 text-white font-heading font-semibold hover:bg-white/10 transition-all uppercase tracking-widest text-sm">
                Richiedi preventivo
              </a>
            </div>

            {/* Set Completo Card - REMOVED overflow-hidden on the parent to prevent the badge from cropping! */}
            <div className="price-card-right bg-[#111115] border border-accent/30 rounded-[2.5rem] p-8 md:p-12 flex flex-col h-full relative z-10 hover:-translate-y-2 hover:border-accent hover:shadow-[0_0_50px_rgba(56,189,248,0.15)] transition-all duration-500 shadow-2xl group gpu-accel">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-80 group-hover:opacity-100 transition-opacity rounded-t-[2.5rem]"></div>

              {/* Internal glow kept contained explicitly */}
              <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/20 transition-colors"></div>
              </div>

              {/* BADGE: Now fully visible overlapping the border! */}
              <div className="absolute -top-[14px] right-8 bg-accent text-background font-heading font-black text-[11px] uppercase px-5 py-2 rounded-full tracking-widest shadow-[0_0_15px_rgba(56,189,248,0.4)] z-50 transition-transform group-hover:scale-105">
                Il Setup Consigliato
              </div>

              <div className="mb-8 border-b border-white/10 pb-8 relative z-10">
                <h3 className="font-serif text-3xl text-white mb-3 flex items-center gap-3">Full Party Setup</h3>
                <p className="font-body text-white/70 text-[16px] font-medium leading-relaxed">Non hai nessun impianto? Ci pensiamo noi. DJ set + impianto completo, tutto incluso.</p>
              </div>

              <ul className="space-y-5 mb-12 flex-1 font-heading relative z-10">
                <FeatureItem text="Include il DJ Set completo" active={true} />
                <FeatureItem text="Casse attive + subwoofer club-grade" active={true} />
                <FeatureItem text="Luci LED dinamiche sincronizzate" active={true} />
                <FeatureItem text="Montaggio, smontaggio e logistica inclusi" active={true} />
              </ul>

              <a href="#contact" className="relative z-10 w-full py-4 text-center rounded-[1rem] bg-accent text-background font-heading font-bold hover:bg-accent/90 transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] btn-magnetic overflow-hidden uppercase tracking-widest text-sm">
                <span className="relative z-10">Prenota la data</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL AGGRESSIVE CTA CTA */}
      <section id="contact" className="py-40 px-6 bg-background border-t border-white/5 relative overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Pulsing glow background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px] pointer-events-none animate-pulse"></div>

        <div className="relative z-10 reveal-up max-w-3xl">
          <h2 className="font-serif text-5xl md:text-[5.5rem] leading-[1.05] text-white mb-8 tracking-tight whitespace-nowrap">
            Disegna il tuo <span className="serif-accent italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-300 pl-2">Suono</span>
          </h2>
          <p className="text-white/60 text-xl font-body font-light max-w-2xl mx-auto mb-14">
            Le date del weekend si riempiono in fretta. Scrivici su WhatsApp per bloccare la tua serata e decidere insieme il setup perfetto.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto justify-center items-center">
            <a href="https://wa.me/393272506011?text=Ciao!%20Ti%20contatto%20dal%20sito%20BDN%20Sound%20per%20avere%20informazioni%20sui%20vostri%20servizi." className="group bg-[#25D366] text-background px-10 py-5 rounded-full font-heading font-bold text-lg hover:bg-[#20bd5a] hover:scale-105 hover:shadow-[0_0_40px_rgba(37,211,102,0.4)] transition-all flex items-center justify-center gap-3">
              <MessageCircle className="w-6 h-6 group-hover:animate-bounce" /> WhatsApp
            </a>
            <a href="https://instagram.com/" className="bg-[#111115] border border-white/10 text-white px-8 py-5 rounded-full font-heading font-bold text-[17px] hover:bg-white/10 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 shadow-xl">
              <Instagram className="w-5 h-5 text-pink-500" /> Profilo Instagram
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050505] text-white pt-20 pb-10 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-heading font-bold text-3xl tracking-tight">BDN<span className="text-accent font-regular text-[0.9em]">sound</span></div>
          <div className="flex gap-8 text-[15px] font-heading font-medium text-white/50 uppercase tracking-widest">
            <a href="https://instagram.com" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://wa.me/393272506011?text=Ciao!%20Ti%20contatto%20dal%20sito%20BDN%20Sound." className="hover:text-white transition-colors">WhatsApp</a>
            <a href="mailto:info@bdnsound.it" className="hover:text-white transition-colors">Email</a>
          </div>
          <p className="text-[13px] text-white/30 font-heading font-light">&copy; {new Date().getFullYear()} BDN Sound. Brescia. P.iva: In elaborazione.</p>
        </div>
      </footer>
    </div>
  );
}

// Subcomponents:

function ReviewCard({ name, event, text }) {
  return (
    <div className="bg-[#111115] border border-white/5 rounded-[2rem] p-8 flex flex-col w-[350px] md:w-[400px] hover:bg-[#1a1a20] hover:border-white/10 hover:-translate-y-1 transition-all duration-300 shadow-xl group gpu-accel flex-shrink-0 whitespace-normal text-left">
      <div className="flex text-accent mb-6 gap-1 group-hover:scale-105 transform origin-left transition-transform">
        {[1, 2, 3, 4, 5].map(star => (
          <Star key={star} className="w-4 h-4 fill-current drop-shadow-md" />
        ))}
      </div>
      <p className="font-body text-white/70 leading-relaxed font-light text-[16px] mb-8 flex-1 drop-shadow-sm">
        "{text}"
      </p>
      <div className="flex items-center gap-4 border-t border-white/5 pt-5 mt-auto">
        <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold font-heading text-lg">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="font-heading text-white font-semibold text-[15px] uppercase tracking-wider">{name}</h4>
          <span className="font-body text-white/40 text-[13px] tracking-wide">{event}</span>
        </div>
      </div>
    </div>
  )
}

function ServiceListCard({ title, desc }) {
  return (
    <div className="service-card relative bg-[#0b0b10] border border-[#38bdf8]/30 rounded-[1.5rem] p-6 md:p-8 flex flex-col hover:border-[#38bdf8]/80 transition-all duration-500 group shadow-[0_4px_20px_rgba(0,0,0,0.5)] gpu-accel overflow-hidden cursor-default md:hover:scale-[1.02]">
      {/* Dynamic Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#38bdf8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      <h3 className="font-serif text-2xl md:text-3xl text-white mb-2 relative z-10 group-hover:text-accent transition-colors duration-500 tracking-tight">{title}</h3>
      <p className="font-body text-white/60 leading-relaxed font-light text-[16px] md:text-[17px] relative z-10">{desc}</p>
    </div>
  );
}

function FeatureItem({ text, active = false }) {
  return (
    <li className="flex items-start gap-4">
      <div className={cn("mt-1 rounded-full p-1 border", active ? "bg-accent/20 border-accent/20" : "bg-[#1f1f25] border-white/5")}>
        <CheckCircle2 className={cn("w-4 h-4", active ? "text-accent drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]" : "text-white/30")} />
      </div>
      <span className={cn("text-[16px] font-medium leading-relaxed drop-shadow-sm", active ? "text-white" : "text-white/60")}>{text}</span>
    </li>
  );
}
