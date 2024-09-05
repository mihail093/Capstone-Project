import React, { useState } from 'react';
import { Rating } from 'flowbite-react';

const RatingComponent = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (starIndex) => {
    const newRating = starIndex + 1;
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div className="flex items-center space-x-1">
        <Rating>
            {[...Array(5)].map((_, index) => (
                <Rating.Star
                key={index}
                filled={index < rating}
                onClick={() => handleStarClick(index)}
                className="cursor-pointer"
                />
            ))}
        </Rating>
    </div>
  );
};

export default RatingComponent;