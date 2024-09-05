import React, { useState, useEffect } from 'react';
import { Button, Label, Textarea } from "flowbite-react";
import { Link } from 'react-router-dom';
import RatingComponent from './RatingComponent';
import { useAuth } from '../utils/AuthContext';
import { productApi } from '../services/api';

export default function ProductCommentAreaComponent({ productId }) {
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchComments();
    }, [productId]);

    const fetchComments = async () => {
        setIsLoading(true);
        try {
          const response = await productApi.getComments(productId);
          if (Array.isArray(response.data)) {
            setComments(response.data);
          } else {
            console.error('Unexpected response format:', response);
            setError('Formato di risposta inatteso');
          }
        } catch (err) {
          console.error('Errore nel caricamento dei commenti:', err);
          setError('Errore nel caricamento dei commenti');
        } finally {
          setIsLoading(false);
        }
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };
    
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await productApi.addComment(productId, { text: comment, rating });
            setComment('');
            setRating(0);
            fetchComments();
        } catch (err) {
        console.error('Errore nell\'invio del commento:', err);
        setError('Errore nell\'invio del commento');
        } finally {
        setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div>Caricamento in corso...</div>;
    }

  return (
    <div className='p-8 rounded-lg shadow-lg'>
      {user ? (
        <>
          <form onSubmit={handleSubmit} className="flex max-w-4xl flex-col gap-4 px-8 py-6">
            <div>
              <Label htmlFor='comment' value='Commento' />
              <Textarea
                id='comment'
                name='comment'
                placeholder="Lascia un commento per questo prodotto"
                required 
                shadow
                value={comment}
                onChange={handleCommentChange}
              />
            </div>
            <div>
              <p>Lascia una Valutazione</p>
              <RatingComponent onRatingChange={handleRatingChange} />
            </div>
            <Button color="primary" size="sm" type="submit" className='w-40' disabled={isLoading}>
              {isLoading ? 'Invio...' : 'Invia Recensione'}
            </Button>
          </form>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Commenti</h3>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-100 rounded">
                  <p>{comment.text}</p>
                  <p>Valutazione: {comment.rating}/5</p>
                  <p className="text-sm text-gray-600">Utente: {comment.user?.username || 'Anonimo'}</p>
                </div>
              ))
            ) : (
              <p>Nessun commento disponibile.</p>
            )}
          </div>
        </>
      ) : (
        <div>
          <Link to="/login">Accedi</Link>
          {" / "}
          <Link to="/register">Registrati</Link>
          <p>Per lasciare una recensione e vedere commenti e recensioni</p>
        </div>
      )}
    </div>
  )
}
