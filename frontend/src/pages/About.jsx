import React from 'react';
import vivaio from '../assets/vivaio.jpeg';


export default function About() {
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-dancingScript font-bold text-myGreen mb-3 text-center">BENVENUTI NEL MIO VIVAIO</h1>
      <p className="text-xl font-accent text-myGreen text-center mx-auto mb-6">
        Che tu sia un appassionato di giardinaggio o un professionista del verde, a La Sughera troverai un'ampia selezione di piante
        e un supporto qualificato per realizzare le tue idee. 
      </p>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-9">
        <div className="w-full md:w-1/2">
          <img 
            src={vivaio} 
            alt="La nostra azienda" 
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-title font-semibold text-myGreen mb-4">La Nostra Storia</h2>
          <p className="text-lg mb-4">
            La Sughera è un vivaio di eccellenza situato nel cuore del Collio Friulano, un territorio ricco di bellezza naturale e 
            tradizione agricola. Da anni, ci dedichiamo con passione alla coltivazione di piante di alta qualità, selezionando con 
            cura le varietà che meglio esprimono la ricchezza del nostro territorio. Il nostro vivaio prende il nome dalla maestosa 
            quercia da sughero, simbolo di forza e longevità, valori che riflettono il nostro impegno nel coltivare piante robuste, 
            adatte a durare nel tempo e a valorizzare qualsiasi spazio verde. Le colline del Collio Friulano, con il loro clima 
            favorevole e il terreno fertile, offrono condizioni ideali per la crescita di una vasta gamma di specie, 
            dalle piante ornamentali agli alberi da frutto, fino agli arbusti e alle piante aromatiche.
          </p>
          <p className="text-lg">
            A La Sughera, la sostenibilità è al centro del nostro lavoro. Coltiviamo le nostre piante con metodi rispettosi 
            dell'ambiente, utilizzando tecniche naturali per garantire la salute delle piante e la loro perfetta integrazione nei 
            paesaggi locali. Crediamo nella bellezza della natura e nella sua capacità di trasformare gli spazi in oasi di 
            tranquillità e benessere. Il nostro team di esperti, è sempre disponibile per offrirti consulenze personalizzate e 
            guidarti nella scelta delle piante più adatte al tuo giardino o progetto paesaggistico.
          </p>
        </div>
      </div>
      <div className="max-w-[60em] px-4 sm:px-6 lg:px-8 mx-auto text-xl text-myGreen text-center mt-4">
        <p>
        Vieni a trovarci a La Sughera, nel meraviglioso scenario del Collio Friulano, e scopri la nostra passione per le piante e 
        la natura.
        </p>
        <p className="text-3xl font-dancingScript">
          Siamo qui per aiutarti a creare spazi verdi unici, che riflettano la bellezza e l'armonia del nostro territorio.
        </p>
      </div>
    </div>
  )
}
