import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'flowbite-react';

export default function PlantListComponent({ plants, onEdit, onDelete }) {
  return (
    <Table>
        <Table.Head>
            <Table.HeadCell>Nome</Table.HeadCell>
            <Table.HeadCell>Prezzo</Table.HeadCell>
            <Table.HeadCell>Habitat</Table.HeadCell>
            <Table.HeadCell>Azioni</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
            {plants.map((plant) => (
                <Table.Row key={plant._id}>
                    <Table.Cell>
                        <Link 
                            to={`/plant/details/${plant._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {plant.name}
                        </Link>
                    </Table.Cell>
                    <Table.Cell>{plant.price}</Table.Cell>
                    <Table.Cell>{plant.habitat}</Table.Cell>
                    <Table.Cell>
                        <Button size='xs' color="primary" className='my-1' onClick={() => onEdit(plant)}>Modifica</Button>
                        <Button size='xs' color="primary" className='my-1' onClick={() => onDelete(plant._id)}>Elimina</Button>
                    </Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
    </Table>
  )
}
