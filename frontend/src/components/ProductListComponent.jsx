import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Card } from 'flowbite-react';
import SearchBar from './SearchBar';

export default function ProductListComponent({ products, onEdit, onDelete }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (value) => {
        setSearchTerm(value.toLowerCase());
    };

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );

    return (
        <div className="container mx-auto px-4">
            <div className="mb-4">
                <SearchBar 
                    searchTerm={searchTerm} 
                    onSearchChange={handleSearchChange} 
                    placeholder="Cerca il prodotto" 
                    className="w-full md:w-1/2 lg:w-1/3"
                />
            </div>

            {/* Vista tabella per schermi più grandi */}
            <div className="hidden md:block">
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Nome</Table.HeadCell>
                        <Table.HeadCell>Prezzo</Table.HeadCell>
                        <Table.HeadCell>Categoria</Table.HeadCell>
                        <Table.HeadCell>Azioni</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {filteredProducts.map((product) => (
                            <Table.Row key={product._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    <Link to={`/product/details/${product._id}`} className="hover:underline">{product.name}</Link>
                                </Table.Cell>
                                <Table.Cell>{product.price} €</Table.Cell>
                                <Table.Cell>{product.category}</Table.Cell>
                                <Table.Cell>
                                    <div className="flex space-x-2">
                                        <Button size="xs" color="primary" onClick={() => onEdit(product)}>Modifica</Button>
                                        <Button size="xs" color="failure" onClick={() => onDelete(product._id)}>Elimina</Button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>

            {/* Vista a schede per dispositivi mobili */}
            <div className="md:hidden space-y-2">
                {filteredProducts.map((product) => (
                    <Card key={product._id}>
                        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            <Link to={`/product/details/${product._id}`} className="hover:underline">{product.name}</Link>
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">Prezzo: {product.price} €</p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">Categoria: {product.category}</p>
                        <div className="flex justify-end space-x-2 mt-2">
                            <Button size="xs" color="primary" onClick={() => onEdit(product)}>Modifica</Button>
                            <Button size="xs" color="failure" onClick={() => onDelete(product._id)}>Elimina</Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}