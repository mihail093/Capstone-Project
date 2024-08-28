import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WelcomeComponent from '../components/WelcomeComponent';
import { Carousel, Card } from 'flowbite-react';
import CarouselComponent from '../components/CarouselComponent';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import { productApi, plantApi } from '../services/api';

export default function Home({ setCategoryFromHome }) {
  const [productImage, setProductImage] = useState('');
  const [habitatImages, setHabitatImages] = useState([]);
  const [categoryImages, setCategoryImages] = useState([]);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    fetchPlants();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (habitatImages.length > 0 && categoryImages.length > 0 && productImage) {
      setCardData([
        {
          title: "Piante da Interno",
          imgAlt: "Pianta da interno",
          imgSrc: habitatImages[0],
          category: "indoor",
          items: [
            "Piante da appartamento",
            "Piante per ufficio",
            "Piante purificatrici d'aria"
          ]
        },
        {
          title: "Piante da Esterno",
          imgAlt: "Pianta da esterno",
          imgSrc: habitatImages[1],
          category: "outdoor",
          items: [
            "Piante da giardino",
            "Piante da balcone e terrazzo",
            "Rampicanti",
            "Piante da siepe"
          ]
        },
        {
          title: "Piante Succulenti e Resistenti",
          imgAlt: "Pianta succulente",
          imgSrc: categoryImages[0],
          category: "succulentiResistenti",
          items: [
            "Cactus",
            "Succulente",
            "Piante grasse",
            "Piante xerofite (resistenti alla siccità)"
          ]
        },
        {
          title: "Piante Speciali",
          imgAlt: "Pianta",
          imgSrc: categoryImages[1],
          category: "speciali",
          items: [
            "Bonsai",
            "Orchidee",
            "Tropicali",
            "Piante acquatiche"
          ]
        },
        {
          title: "Piante Utili",
          imgAlt: "Pianta",
          imgSrc: categoryImages[2],
          category: "utili",
          items: [
            "Aromatiche",
            "Medicinali",
            "Da frutto",
            "Ortaggi"
          ]
        },
        {
          title: "Piante Stagionali e Perenni",
          imgAlt: "Pianta",
          imgSrc: categoryImages[3],
          category: "stagionaliPerenni",
          items: [
            "Annuali",
            "Perenni",
            "Bulbose"
          ]
        },
        {
          title: "Altri Prodotti",
          imgAlt: "Prodotto giardinaggio",
          imgSrc: productImage,
          category: "altriProdotti",
          items: [
            "Semi",
            "Terriccio",
            "Atrezzi",
            "Altro"
          ]
        }
      ]);
    }
  }, [habitatImages, categoryImages, productImage]);

  const fetchPlants = async () => {
    try {
      const response = await plantApi.getAll();
      const dataResponse = response.data;
      const indoorPlant = dataResponse.find(data => data.habitat === 'indoor');
      const outdoorPlant = dataResponse.find(data => data.habitat === 'outdoor');
      const succulentPlant = dataResponse.find(data => data.category === 'succulentiResistenti');
      const specialPlant = dataResponse.find(data => data.category === 'speciali');
      const usefulPlant = dataResponse.find(data => data.category === 'utili');
      const seasonalAndPerennialPlant = dataResponse.find(data => data.category === 'stagionaliPerenni');
    
      if (indoorPlant && outdoorPlant) {
        setHabitatImages([indoorPlant.image, outdoorPlant.image]);
      }
      if (succulentPlant && specialPlant && usefulPlant && seasonalAndPerennialPlant) {
        setCategoryImages([succulentPlant.image, specialPlant.image, usefulPlant.image, seasonalAndPerennialPlant.image]);
      }
    } catch (error) {
      console.error('Errore nel recupero delle piante:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await productApi.getAll();
      if (response.data.length > 0) {
        setProductImage(response.data[0].image);
      }
    } catch (error) {
      console.error('Errore nel recupero dei prodotti:', error);
    }
  };

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
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 m-12'>
          {cardData.map((card, index) => (
            <Link to={'/pricing'} key={index}>
              <Card
                className="h-full hover:border-2 hover:border-myGreen" 
                onClick={() => setCategoryFromHome(card.category)}
              >
                <img  className="w-full h-48 object-contain" src={card.imgSrc} alt={card.imgAlt} />
                <h5 className="text-2xl font-title tracking-tight text-gray-900">{card.title}</h5>
                <p className="text-gray-700">
                  <ul>
                    {card.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}