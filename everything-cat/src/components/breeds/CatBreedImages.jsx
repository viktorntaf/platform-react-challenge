import {useQuery} from '@tanstack/react-query';
import {fetchPaginatedCatImages} from '../../api';
import {Box, ButtonBase, Card, CardMedia, Grid2} from "@mui/material";
import {useNavigate} from "react-router-dom";

/**
 * Component for showing images of cats for a selected breed.
 * @param breedId
 * @returns {Element}
 * @constructor
 */
const CatBreedImages = ({ breedId }) => {

    const {
        data: catBreedImages,
        isFetching
    } = useQuery({
        queryKey: [`breed_${breedId}`],
        queryFn: () => fetchPaginatedCatImages(null,{
            breed_ids: breedId
        })

    });
    const navigate = useNavigate();

    if (isFetching) {
        return <div>Loading...</div>
    }
    // There is an api error. It does not return all the breed images just one.
    return (
        <Box>
            <Grid2 container spacing={6}>
                {
                    catBreedImages.data.map((catImage) => (
                        <Grid2 key={catImage.id}>
                            <ButtonBase onClick={() => navigate(`/image/${catImage.id}`)} style={{ width: '100%' }}>
                                <Card sx={{ cursor: 'pointer', textDecoration: 'none' }}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={catImage.url}
                                        alt={`Cat ${catImage.id}`}
                                    />
                                </Card>
                            </ButtonBase>
                        </Grid2>
                    )
                )}
            </Grid2>
        </Box>
    );
};

export default CatBreedImages;
