import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'flowbite-react';

export default function ProductListComponent({ products, onEdit, onDelete }) {
    return (
        <Table>
            <Table.Head>
                <Table.HeadCell>Nome</Table.HeadCell>
                <Table.HeadCell>Prezzo</Table.HeadCell>
                <Table.HeadCell>Categoria</Table.HeadCell>
                <Table.HeadCell>Azioni</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {products.map((product) => (
                    <Table.Row key={product._id}>
                        <Table.Cell>
                            <Link 
                                to={`/product/details/${product._id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {product.name}
                            </Link>
                        </Table.Cell>
                        <Table.Cell>{product.price}</Table.Cell>
                        <Table.Cell>{product.category}</Table.Cell>
                        <Table.Cell>
                            <Button size='xs' color="primary" className='my-1' onClick={() => onEdit(product)}>Modifica</Button>
                            <Button size='xs' color="primary" className='my-1' onClick={() => onDelete(product._id)}>Elimina</Button>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
}