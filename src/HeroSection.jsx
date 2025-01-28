import React, { useRef, useEffect } from 'react';
import { Code, ArrowRight, FileCode, Server, Layers } from 'lucide-react';

const HeroSection = ({ onStartClick }) => {
  const heroContentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroContentRef.current) {
      observer.observe(heroContentRef.current);
    }

    return () => {
      if (heroContentRef.current) {
        observer.unobserve(heroContentRef.current);
      }
    };
  }, []);

  return (
    <section
      className="relative bg-gradient-to-br from-blue-600 to-blue-800 min-h-screen flex items-center justify-center
      text-white overflow-hidden py-8 md:py-16"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 md:w-64 h-32 md:h-64 bg-white rounded-full mix-blend-overlay animate-blob"></div>
        <div className="absolute top-1/2 right-0 w-36 md:w-72 h-36 md:h-72 bg-blue-300 rounded-full mix-blend-overlay animate-blob animation-delay-2000"></div>
      </div>

      <div
        ref={heroContentRef}
        className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center opacity-0 transform translate-y-10 transition-all duration-1000 ease-out"
      >
        <div className="flex justify-center items-center mb-4 md:mb-6">
          <Code className="h-8 w-8 md:h-12 md:w-12 mr-2 md:mr-4 text-white" />
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-['Inter']">
            DrawIO Converter
          </h1>
        </div>

        <p className="text-lg md:text-2xl max-w-4xl mx-auto mb-8 md:mb-12 leading-relaxed opacity-90 font-['Inter'] font-light px-4">
          Transformez instantanément vos diagrammes DrawIO en code Java propre et structuré.
          Simplifiez votre processus de développement avec notre convertisseur intelligent.
        </p>

        <div className="flex justify-center mb-8 md:mb-16 px-4">
          <button
            onClick={onStartClick}
            className="group  flex items-center px-6 md:px-10 py-3 md:py-4 bg-white text-blue-700
            font-semibold rounded-full hover:bg-blue-100 transition-all duration-300
            transform hover:-translate-y-1 hover:shadow-lg text-base md:text-lg w-full md:w-auto items-center"
          >
            Commencer
            <ArrowRight
              className="ml-2 md:ml-3 group-hover:translate-x-1 transition-transform"
              size={20}
            />
          </button>
        </div>

        {/* Features Mini-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto px-4">
          {[
            {
              icon: <FileCode className="text-blue-300" size={24} />,
              title: "Code Automatique",
              description: "Génération instantanée"
            },
            {
              icon: <Server className="text-blue-300" size={24} />,
              title: "Architecture Propre",
              description: "Structure optimisée"
            },
            {
              icon: <Layers className="text-blue-300" size={24} />,
              title: "Multi-Diagrammes",
              description: "Conversion avancée"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 p-4 md:p-6 rounded-xl backdrop-blur-sm flex items-center"
            >
              <div className="mr-3 md:mr-4">
                {feature.icon}
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-base md:text-lg">{feature.title}</h3>
                <p className="text-xs md:text-sm text-blue-100">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-blob {
          animation: blob 15s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
