import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {isCatFavourite, markCatAsFavourite} from '../../api';
import {CardMedia, Checkbox, FormControlLabel, Typography, Box} from "@mui/material";
import BreedInfo from "./BreedInfo.jsx";

/**
 * Component for showing the selected cat's info and image.
 *
 * @param catData
 * @returns {Element}
 * @constructor
 */
const CatBreedInfo = ({ catData }) => {
    const [isFavourite, setIsFavourite] = useState(false);

    const {
        data: catIsFavourite,
        isFetched: catIsFavouriteIsFetched,
    } = useQuery({
        queryKey: [`cat_${catData.id}_favourite`],
        queryFn: () => isCatFavourite(catData.id),
    });

    useEffect(() => {
        if (catIsFavourite) {
            setIsFavourite(Boolean(catIsFavourite.length));
        }
    }, [catIsFavourite]);

    // Mutation to update the favorite status
    const { mutate, isPending: catWasMarkedAsFavouriteLoading } = useMutation({
        mutationFn: () => markCatAsFavourite(catData.id),
        onSuccess: () => setIsFavourite(true) // Mark the cat as favorite on success
    });

    // Handle checkbox change
    const handleCheckboxChange = () => {
        if (!isFavourite) {
            mutate(); // Trigger the mutation when marking as favorite
        }
        setIsFavourite(!isFavourite);
    };

    return (
        <Box sx={{ padding: '20px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            {/* Image container */}
            <Box sx={{ marginBottom: '20px' }}>
                <CardMedia
                    component="img"
                    image={catData?.url}
                    alt="Cat"
                    sx={{
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                    }}
                />
            </Box>

            {/* Breed info or fallback text */}
            {catData?.breeds && catData?.breeds.length ? (
                <BreedInfo breeds={catData.breeds} />
            ) : (
                <Typography variant="h6" gutterBottom>
                    No breed information available
                </Typography>
            )}
            {/* Favorite toggle */}
            {(!catIsFavouriteIsFetched || catWasMarkedAsFavouriteLoading) ? null : (
                <form>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isFavourite}
                                onChange={handleCheckboxChange}
                                color="primary"
                            />
                        }
                        label="Mark as Favorite"
                    />
                </form>
            )}
        </Box>
    );
};

export default CatBreedInfo;
