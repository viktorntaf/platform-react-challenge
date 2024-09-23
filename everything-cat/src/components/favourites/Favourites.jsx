import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchFavourites, removeFavourite } from '../../api';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * Component for showing the user's favourit cat images.
 *
 * @returns {Element}
 * @constructor
 */
const Favourites = () => {
    const { data: favouriteCats, refetch } = useQuery({
        queryKey: [`cat_favourites`],
        queryFn: () => fetchFavourites(),
    });

    const { mutate } = useMutation({
        mutationFn: (favouriteId) => removeFavourite(favouriteId),
        onSuccess: () => refetch(), // Refetch the favorites on success
    });

    return (
        <Box sx={{ padding: '20px' }}>
            <h1>Your Favourite Cats</h1>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {favouriteCats?.map((fav) => (
                    <Box
                        key={fav.id}
                        sx={{
                            position: 'relative',
                            width: '200px',
                            height: '200px',
                            overflow: 'hidden',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                            '&:hover .overlay': {
                                opacity: 1,
                            },
                        }}
                    >
                        <img
                            src={fav.image.url}
                            alt="Favourite Cat"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        {/* Overlay for Remove Button */}
                        <Box
                            className="overlay"
                            sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                opacity: 0,
                                transition: 'opacity 0.3s ease-in-out',
                            }}
                        >
                            <IconButton
                                onClick={() => mutate(fav.id)}
                                sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 0, 0, 0.8)',
                                    },
                                }}
                            >
                                <DeleteIcon color="error" />
                            </IconButton>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Favourites;
