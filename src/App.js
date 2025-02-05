import React, { useState, useRef } from 'react';
import {
  FileUp, Download, CloudUpload, Check, Settings, Shield, Zap
} from 'lucide-react';
import HeroSection from './HeroSection';

const apiurl = 'https://drawio-to-java-production.up.railway.app';

const Stepper = ({ currentStep }) => {
  const steps = [
    "Sélectionner le fichier",
    "Convertir",
    "Télécharger"
  ];

  return (
    <div className="flex justify-center items-center w-full mb-4 md:mb-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-xl">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center
                ${index <= currentStep
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-500'
                } transition-all duration-300`}
              >
                {index < currentStep ? <Check /> : index + 1}
              </div>
              <span
                className={`mt-2 text-xs md:text-sm font-medium text-center
                ${index <= currentStep ? 'text-blue-600' : 'text-gray-500'}`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`hidden md:block w-16 h-1 mx-4
                ${index < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ServiceDetails = () => {
  const features = [
    {
      icon: <Zap className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />,
      title: "Conversion Rapide",
      description: "Transformez vos diagrammes DrawIO en code Java en quelques secondes"
    },
    {
      icon: <Settings className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />,
      title: "Génération Automatique",
      description: "Générez automatiquement des classes Java basées sur vos modèles UML"
    },
    {
      icon: <Shield className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />,
      title: "Code de Qualité",
      description: "Production de code propre, structuré et conforme aux meilleures pratiques"
    }
  ];

  return (
    <section className="bg-gray-50 py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Pourquoi utiliser DrawIO Converter ?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Simplifiez votre processus de développement en transformant vos diagrammes UML en code Java prêt à l'emploi
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className="ml-3 md:ml-4 text-lg md:text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
              </div>
              <p className="text-sm md:text-base text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const App = () => {
  const [file, setFile] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [convertedFile, setConvertedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const mainContentRef = useRef(null);

  const scrollToMainContent = () => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFileSelect = (selectedFile) => {
    if (selectedFile.name.endsWith('.drawio')) {
      setFile(selectedFile);
      setConvertedFile(null);
      setCurrentStep(1);
    } else {
      alert('Veuillez sélectionner un fichier DrawIO valide');
    }
  };

  const handleConvert = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${apiurl}/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setTimeout(() => {
          setConvertedFile(data);
          setCurrentStep(2);
          setIsLoading(false);
        }, 1000);
      } else {
        alert("Erreur lors de la conversion");
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue lors de la conversion");
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    window.location.href = `${apiurl}/download`;
  };

  const triggerFileInput = () => {
    inputRef.current.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection onStartClick={scrollToMainContent} />

      <div ref={mainContentRef} id="main-content">
        <section className="max-w-4xl mx-auto mt-2 py-8 md:py-16 px-4">
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl p-6 md:p-10">
            <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6 md:mb-8">
              Convertissez vos diagrammes DrawIO en Java
            </h1>

            <Stepper currentStep={currentStep} />

            <div className="mb-4 md:mb-6">
              <input
                type="file"
                ref={inputRef}
                onChange={(e) => handleFileSelect(e.target.files[0])}
                accept=".drawio"
                className="hidden"
              />
              <div
                onClick={triggerFileInput}
                className="w-full p-4 md:p-8 border-2 border-dashed rounded-xl md:rounded-2xl
                bg-gray-50 hover:bg-blue-50 cursor-pointer
                flex flex-col items-center justify-center
                transition-colors duration-300"
              >
                <CloudUpload className="h-12 w-12 md:h-16 md:w-16 text-blue-600 mb-4" />
                <p className="text-center text-base md:text-lg font-medium mb-2">
                  Cliquez pour sélectionner un fichier DrawIO
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  Formats acceptés : .drawio
                </p>
              </div>
            </div>

            {file && (
              <div className="mt-4 md:mt-6 bg-blue-50 p-3 md:p-4 rounded-lg flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
                <div className="flex items-center">
                  <FileUp className="h-5 w-5 md:h-6 md:w-6 text-blue-600 mr-3 md:mr-4" />
                  <span className="text-sm md:text-base font-medium">{file.name}</span>
                </div>
                <button
                  onClick={handleConvert}
                  className="w-full md:w-auto bg-blue-600 text-white px-4 md:px-6 py-2 rounded-lg
                  hover:bg-blue-700 transition-colors text-sm md:text-base"
                >
                  Convertir
                </button>
              </div>
            )}

            {isLoading && (
              <div className="mt-4 md:mt-6 text-center text-lg md:text-xl font-medium text-blue-600">
                <div className="animate-spin h-8 w-8 md:h-10 md:w-10 border-4 border-t-4 border-blue-600 rounded-full mx-auto mb-3 md:mb-4"></div>
                Conversion en cours...
              </div>
            )}

            {convertedFile && (
              <div className="mt-4 md:mt-6 bg-green-50 p-3 md:p-4 rounded-lg flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
                <div className="flex items-center">
                  <Download className="h-5 w-5 md:h-6 md:w-6 text-green-600 mr-3 md:mr-4" />
                  <span className="text-sm md:text-base font-medium">
                    {convertedFile.filename || 'Converted Files.zip'}
                  </span>
                </div>
                <button
                  onClick={handleDownload}
                  className="w-full md:w-auto bg-green-600 text-white px-4 md:px-6 py-2 rounded-lg
                  hover:bg-green-700 transition-colors text-sm md:text-base"
                >
                  Télécharger
                </button>
              </div>
            )}
          </div>
        </section>

        <ServiceDetails />
      </div>

      <footer className="bg-gray-900 text-white py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm md:text-base">
          <p>&copy; 2024 DrawIO Converter. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
