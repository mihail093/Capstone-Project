import React from 'react';
import { Link } from 'react-router-dom';

export function Carousel1({ group1 }) {
  console.log(group1);
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-2 mt-6'>
      <Link to={`/plant/details/${group1.plantIds[0]}`}>
        <img
          className='w-[8em] h-[8em] mx-auto hover:scale-110 transition-all duration-280' 
          src={group1.imagesGroup1[0]} 
          alt='pianta' 
        />
      </Link>
      <Link to={`/plant/details/${group1.plantIds[1]}`}>
        <img
          className='w-[8em] h-[8em] mx-auto hover:scale-110 transition-all duration-280' 
          src={group1.imagesGroup1[1]} 
          alt='pianta' 
        />
      </Link>
      <Link to={`/plant/details/${group1.plantIds[2]}`}>
        <img
          className='w-[8em] h-[8em] mx-auto hover:scale-110 transition-all duration-280' 
          src={group1.imagesGroup1[2]} 
          alt='pianta' 
        />
      </Link>
      <Link to={`/plant/details/${group1.plantIds[3]}`}>
        <img
          className='w-[8em] h-[8em] mx-auto hover:scale-110 transition-all duration-280' 
          src={group1.imagesGroup1[3]} 
          alt='pianta' 
        />
      </Link>
    </div>
  )
}

export function Carousel2({ group2 }) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-2 mt-6'>
      <Link to={`/plant/details/${group2.plantIds[0]}`}>
        <img
          className='w-[8em] h-[8em] mx-auto hover:scale-110 transition-all duration-280' 
          src={group2.imagesGroup2[0]} 
          alt='pianta' 
        />
      </Link>
      <Link to={`/plant/details/${group2.plantIds[1]}`}>
        <img
          className='w-[8em] h-[8em] mx-auto hover:scale-110 transition-all duration-280' 
          src={group2.imagesGroup2[1]} 
          alt='pianta' 
        />
      </Link>
      <Link to={`/plant/details/${group2.plantIds[2]}`}>
        <img
          className='w-[8em] h-[8em] mx-auto hover:scale-110 transition-all duration-280' 
          src={group2.imagesGroup2[2]} 
          alt='pianta' 
        />
      </Link>
      <Link to={`/plant/details/${group2.plantIds[3]}`}>
        <img
          className='w-[8em] h-[8em] mx-auto hover:scale-110 transition-all duration-280' 
          src={group2.imagesGroup2[3]} 
          alt='pianta' 
        />
      </Link>
    </div>
  )
}

export function Carousel3({ group3 }) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-2 mt-6'>
      <Link to={`/plant/details/${group3.plantIds[0]}`}>
        <img
          className='w-[8em] h-[8em] mx-auto hover:scale-110 transition-all duration-280' 
          src={group3.imagesGroup3[0]} 
          alt='pianta' 
        />
      </Link>
      <Link to={`/plant/details/${group3.plantIds[1]}`}>
        <img
          className='w-[8em] h-[8em] mx-auto hover:scale-110 transition-all duration-280' 
          src={group3.imagesGroup3[1]} 
          alt='pianta' 
        />
      </Link>
      <Link to={`/plant/details/${group3.plantIds[2]}`}>
        <img
          className='w-[8em] h-[8em] mx-auto hover:scale-110 transition-all duration-280' 
          src={group3.imagesGroup3[2]} 
          alt='pianta' 
        />
      </Link>
      <Link to={`/plant/details/${group3.plantIds[3]}`}>
        <img
          className='w-[8em] h-[8em] mx-auto hover:scale-110 transition-all duration-280' 
          src={group3.imagesGroup3[3]} 
          alt='pianta' 
        />
      </Link>
    </div>
  )
}