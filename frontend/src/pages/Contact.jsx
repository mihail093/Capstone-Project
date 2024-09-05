import React from 'react';
import { Button, Popover, Card } from "flowbite-react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold text-myGreen mb-4">Contattaci</h1>
      <p className="text-lg mb-8">
        Grazie per il tuo interesse in La Sughera! Siamo sempre felici di aiutarti con qualsiasi domanda o richiesta.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <div className="flex flex-col items-center">
            <FaMapMarkerAlt className="text-4xl text-myGreen mb-4" />
            <h2 className="text-xl font-semibold mb-2">Visita il Nostro Vivaio</h2>
            <p className="mb-4">Via Cavour 115, 34070 Capriva Del Friuli GO</p>
            <Popover
              trigger="hover"
              content={
                <div className="p-3">
                  <h3 className="font-semibold mb-2">Orari di Apertura</h3>
                  <ul className="text-sm">
                    <li>Lunedì - Venerdì: 9:00 - 18:00</li>
                    <li>Sabato: 9:00 - 13:00</li>
                    <li>Domenica: Chiuso</li>
                  </ul>
                </div>
              }
            >
              <Button color="primary" size="sm">
                <FaClock className="mr-2" />
                Orari di Apertura
              </Button>
            </Popover>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col items-center">
            <div className="flex space-x-4 mb-4">
              <FaPhone className="text-4xl text-myGreen" />
              <FaEnvelope className="text-4xl text-myGreen" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Contattaci</h2>
            <p className="mb-2">Telefono: +39 3703471833</p>
            <p className="mb-4">Email: info@lasughera.it</p>
            <p className="text-sm">
              Risponderemo alle tue chiamate durante gli orari di apertura e alle email entro 24 ore.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}