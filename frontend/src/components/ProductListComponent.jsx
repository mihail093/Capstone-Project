import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'flowbite-react';

export default function ProductListComponent({ products, onEdit, onDelete }) {
    return (
        <Table>
            <Table.Body className="divide-y">
                {products.map((product) => (
                    <Table.Row key={product._id}>
                        <Table.Cell>
                            <Link to={`/product/details/${product._id}`}>{product.name}</Link>
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