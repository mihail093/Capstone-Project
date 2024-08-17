import React from 'react';
import WelcomeComponent from '../components/WelcomeComponent';
import { Carousel, Card } from 'flowbite-react';
import CarouselComponent from '../components/CarouselComponent';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon} from '@heroicons/react/24/solid';
import fiori from '../assets/fiori.png';

// Creo un array di oggetti per gestire le Card
const cardData = [
  {
    title: "Piante da Interno",
    imgAlt: "Piante da interno",
    imgSrc: fiori,
    items: [
      "Piante da appartamento",
      "Piante per ufficio",
      "Piante purificatrici d'aria"
    ]
  },
  {
    title: "Piante da Esterno",
    imgAlt: "Piante da esterno",
    imgSrc: fiori,
    items: [
      "Piante da giardino",
      "Piante da balcone e terrazzo",
      "Rampicanti"
    ]
  },
  {
    title: "Piante Grasse e Succulente",
    imgAlt: "Piante grasse e succulente",
    imgSrc: fiori,
    items: [
      "Cactus",
      "Succulente da interno",
      "Succulente da esterno"
    ]
  },
  {
    title: "Piante Fiorite",
    imgAlt: "Piante fiorite",
    imgSrc: fiori,
    items: [
      "Orchidee",
      "Piante annuali",
      "Piante perenni"
    ]
  },
  {
    title: "Altri Prodotti",
    imgAlt: "Prodotti giardinaggio",
    imgSrc: fiori,
    items: [
      "Semi",
      "Terriccio",
      "Atrezzi",
      "Altro"
    ]
  }
];

export default function Home() {
  // Creo due costanti customLeftControl e customRightControl che contengono le icone importate
  // queste le utilizzo per personalizzare leftControl e rightControl del Carousel
  const customLeftControl = (
    <div className='hidden md:block'>
      <ArrowLeftCircleIcon className="h-10 w-10 text-myGreen" />
    </div>
  );
  const customRightControl = (
    <div className='hidden md:block'>
      <ArrowRightCircleIcon className="h-10 w-10 text-myGreen" />
    </div>
  );
//#CarouselComponent: fare funzione che prende le immagini dei primi 16 prodotti con valutazioni più alte
// fare 4 variabili dove inserire in ogniuna 4 immagini -> passare le 4 variabili ai 4 CarouselComponent
  return (
    <>
      <WelcomeComponent />
      <div className="max-w-[60em] px-4 sm:px-6 lg:px-8 mx-auto">
        <Carousel slide={false} leftControl={customLeftControl} rightControl={customRightControl} className="h-[20em]">
          <CarouselComponent />
          <CarouselComponent />
          <CarouselComponent />
          <CarouselComponent />
        </Carousel>
        <div className='grid grid-cols-2 m-12 gap-2'>
          {cardData.map((card, index) => (
              <Card key={index} className="max-w-sm hover:border-2 hover:border-myGreen" imgAlt={card.imgAlt} imgSrc={card.imgSrc}>
                <h5 className="text-2xl font-title tracking-tight text-gray-900 dark:text-white">{card.title}</h5>
                <p className="text-gray-700 dark:text-gray-400">
                  <ul>
                    {card.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </p>
              </Card>
            ))}
        </div>
      </div>
    </>
  )
}
