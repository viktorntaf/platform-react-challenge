import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCatInfo } from '../../api';
import Modal from 'react-modal';
import CatBreedInfo from '../catInfo/CatBreedInfo.jsx';

/**
 * A modal for showing a selected cat breed info and image.
 *
 * @returns {Element}
 * @constructor
 */
const CatImageModal = () => {
    const { id } = useParams(); // Get the image ID from the URL
    const navigate = useNavigate();
    const {
        data: catData,
        isLoading,
        error
    } = useQuery({
        queryKey: [`cat_${id}`],
        queryFn: () => fetchCatInfo(id)
    });
    const [isModalOpen, setIsModalOpen] = useState(true);

    const closeModal = () => {
        setIsModalOpen(false);
        navigate('/breeds'); // Close the modal and navigate back to the main page
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading cat image</div>;

    return (
        <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
            {catData && <CatBreedInfo catData={catData} />}
        </Modal>
    );
};

export default CatImageModal;
