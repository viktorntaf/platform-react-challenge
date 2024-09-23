import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCatBreeds } from '../../api';
import Modal from 'react-modal';
import CatBreedImages from './CatBreedImages.jsx';
import { Box, Typography, Link } from '@mui/material';

/**
 * Component for showing a list of all cat breeds.
 * Each breed is clickable and opens a modal with cat pictures of the selected breed.
 *
 * @returns {Element}
 * @constructor
 */
const BreedList = () => {
    const { data: breeds } = useQuery({
        queryKey: ['breeds'],
        queryFn: () => fetchCatBreeds(),
    });

    const [selectedBreed, setSelectedBreed] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBreedClick = async (breedId) => {
        setSelectedBreed(breedId);
        setIsModalOpen(true);
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Cat Breeds
            </Typography>

            {/* Flexbox Layout to display breeds side by side */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {breeds && breeds.map((breed) => (
                    <Link
                        key={breed.id}
                        component="button"
                        variant="body1"
                        onClick={() => handleBreedClick(breed.id)}
                        sx={{
                            cursor: 'pointer',
                            display: 'inline-block',
                            padding: '10px',
                            backgroundColor: '#f0f0f0',
                            borderRadius: '5px',
                            transition: 'background-color 0.3s',
                            '&:hover': {
                                backgroundColor: '#e0e0e0',
                            }
                        }}
                    >
                        {breed.name}
                    </Link>
                ))}
            </Box>

            {/* Modal for breed images */}
            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                {selectedBreed && <CatBreedImages breedId={selectedBreed} />}
            </Modal>
        </Box>
    );
};

export default BreedList;
