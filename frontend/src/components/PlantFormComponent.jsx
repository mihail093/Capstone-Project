import React from 'react';
import { Button, Label, TextInput } from "flowbite-react";

export default function PlantFormComponent({ habitat, setHabitat}) {

    return (
        <form className="flex max-w-4xl flex-col gap-4 px-8 py-6">
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="name" value="Nome" />
                </div>
                <TextInput id="name" type="text" placeholder="Inserisci il nome della pianta" required shadow />
            </div>
            <div>
                <div className="mb-2 block">
                <Label htmlFor="scientificName" value="Nome scientifico" />
                </div>
                <TextInput id="scientificName" type="text" placeholder="Inserisci il nome scientifico" required shadow />
            </div>
            <div>
                <div className="mb-2 block">
                <Label htmlFor="image" value="Immagine di copertina" />
                </div>
                <TextInput id="image" type="text" placeholder="Inserisci un'immagine di copertina" required shadow />
            </div>
            <div>
                <div className="mb-2 block">
                <Label htmlFor="description" value="Descrizione" />
                </div>
                <TextInput id="description" type="text" placeholder="Inserisci una descrizione" required shadow />
            </div>
            <div>
                <div className="mb-2 block">
                <Label htmlFor="price" value="Prezzo" />
                </div>
                <TextInput id="price" type="number" placeholder="Inserisci il prezzo" required shadow />
            </div>
            <div>
                <div className="mb-2 block">
                <Label htmlFor="careInstructionsLight" value="Luce" />
                </div>
                <TextInput id="careInstructionsLight" type="text" placeholder="Luce ottimale" required shadow />
            </div>
            <div>
                <div className="mb-2 block">
                <Label htmlFor="careInstructionsWater" value="Acqua" />
                </div>
                <TextInput id="careInstructionsWater" type="text" placeholder="Quanta acqua?" required shadow />
            </div>
            <div>
                <div className="mb-2 block">
                <Label htmlFor="careInstructionsSoil" value="Terreno" />
                </div>
                <TextInput id="careInstructionsSoil" type="text" placeholder="Terreno ottimale (facoltativo)" shadow />
            </div>
            <div>
                <div className="mb-2 block">
                <Label htmlFor="careInstructionsTemperature" value="Temperatura" />
                </div>
                <TextInput id="careInstructionsTemperature" type="text" placeholder="Temperatura ottimale (facoltativo)" shadow />
            </div>
            <div>
                <div className="mb-2 block">
                <Label htmlFor="habitat" value="Habitat" />
                </div>
                <TextInput id="habitat" type="text" defaultValue={'indoor'} value={habitat} disabled shadow />
                <Button 
                    className='bg-myGreen hover:!bg-myLightGreen mt-2' 
                    type="button" 
                    onClick={() => setHabitat(habitat === 'indoor' ? 'outdoor' : 'indoor')}>
                        Cambia habitat
                </Button>
            </div>
            <div>
                <div className="mb-2 block">
                <Label htmlFor="inStock" value="In Stock" />
                </div>
                <TextInput id="inStock" type="number" min={0} shadow />
            </div>
            <Button className='bg-myGreen hover:!bg-myLightGreen' type="submit">Crea</Button>
        </form>
    )
}
