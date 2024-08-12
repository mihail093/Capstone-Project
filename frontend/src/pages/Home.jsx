import React from 'react';
import WelcomeComponent from '../components/WelcomeComponent';
import { Carousel, Card } from 'flowbite-react';
import CarouselComponent from '../components/CarouselComponent';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon} from '@heroicons/react/24/solid';
import fiori from '../assets/fiori.png';

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
          <Card className="max-w-sm hover:border-2 hover:border-myGreen" imgAlt="Piante da interno" imgSrc={fiori}>
            <h5 className="text-2xl font-title tracking-tight text-gray-900 dark:text-white">Piante da Interno</h5>
            <p className="text-gray-700 dark:text-gray-400">
              <ul>
                <li>Piante da appartamento</li>
                <li>Piante per ufficio</li>
                <li>Piante purificatrici d'aria</li>
              </ul>
            </p>
          </Card>
          <Card className="max-w-sm hover:border-2 hover:border-myGreen" imgAlt="Piante da esterno" imgSrc={fiori}>
            <h5 className="text-2xl font-title tracking-tight text-gray-900 dark:text-white">Piante da Esterno</h5>
            <p className="text-gray-700 dark:text-gray-400">
              <ul>
                <li>Piante da giardino</li>
                <li>Piante da balcone e terrazzo</li>
                <li>Rampicanti</li>
              </ul>
            </p>
          </Card>
          <Card className="max-w-sm hover:border-2 hover:border-myGreen" imgAlt="Piante grasse e succulente" imgSrc={fiori}>
            <h5 className="text-2xl font-title tracking-tight text-gray-900 dark:text-white">Piante Grasse e Succulente</h5>
            <p className="text-gray-700 dark:text-gray-400">
              <ul>
                <li>Cactus</li>
                <li>Succulente da interno</li>
                <li>Succulente da esterno</li>
              </ul>
            </p>
          </Card>
          <Card className="max-w-sm hover:border-2 hover:border-myGreen" imgAlt="Piante fiorite" imgSrc={fiori}>
            <h5 className="text-2xl font-title tracking-tight text-gray-900 dark:text-white">Piante Fiorite</h5>
            <p className="text-gray-700 dark:text-gray-400">
              <ul>
                <li>Orchidee</li>
                <li>Piante annuali</li>
                <li>Piante perenni</li>
              </ul>
            </p>
          </Card>
        </div>
      </div>
    </>
  )
}
