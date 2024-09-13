import React from 'react';
import vivaio from '../assets/serra.jpg';

export default function About() {
  return (
    <div className="bg-gradient-to-b from-myLightBeige to-myBeige min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-dancingScript font-bold text-myGreen mb-6 text-center">
          Benvenuti nel Nostro Vivaio
        </h1>
        
        <p className="text-2xl font-accent text-myGreen text-center mx-auto mb-12 max-w-2xl">
          Che tu sia un appassionato di giardinaggio o un professionista del verde, a La Sughera troverai un'ampia selezione di piante
          e un supporto qualificato per realizzare le tue idee.
        </p>

        <div className="flex flex-col lg:flex-row items-center gap-16 mb-16">
          <div className="w-full lg:w-1/2 transition-transform duration-300 hover:scale-105">
            <img 
              src={vivaio} 
              alt="La nostra azienda" 
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
          
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-title font-semibold text-myGreen mb-6">La Nostra Storia</h2>
            <p className="text-lg mb-6 leading-relaxed">
              La Sughera è un vivaio di eccellenza situato nel cuore del Collio Friulano, un territorio ricco di bellezza naturale e 
              tradizione agricola. Da anni, ci dedichiamo con passione alla coltivazione di piante di alta qualità, selezionando con 
              cura le varietà che meglio esprimono la ricchezza del nostro territorio.
            </p>
            <p className="text-lg leading-relaxed">
              A La Sughera, la sostenibilità è al centro del nostro lavoro. Coltiviamo le nostre piante con metodi rispettosi 
              dell'ambiente, utilizzando tecniche naturali per garantire la salute delle piante e la loro perfetta integrazione nei 
              paesaggi locali.
            </p>
          </div>
        </div>

        <div className="bg-myLightBeige text-black p-12 rounded-lg shadow-xl">
          <p className="text-2xl text-center mb-6">
            Vieni a trovarci a La Sughera, nel meraviglioso scenario del Collio Friulano, e scopri la nostra passione per le piante e 
            la natura.
          </p>
          <p className="text-4xl font-dancingScript text-center">
            Siamo qui per aiutarti a creare spazi verdi unici, che riflettano la bellezza e l'armonia del nostro territorio.
          </p>
        </div>
      </div>
    </div>
  );
}