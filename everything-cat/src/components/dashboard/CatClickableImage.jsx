import {useState} from 'react';
import {Card, CardMedia, Skeleton} from '@mui/material';

/**
 * Component for displaying a clickable cat image.
 *
 * @param cat
 * @returns {React.JSX.Element}
 * @constructor
 */
const CatClickableImage = ({ cat }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <>
            <Card
                sx={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.05)',
                    },
                }}
            >
                {!loaded && (
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={300} // or the height of your image
                    />
                )}
                <CardMedia
                    component="img"
                    height="200"
                    image={cat.url}
                    alt={`Cat ${cat.id}`}
                    sx={{
                        transition: 'opacity 0.3s ease-in-out',
                        '&:hover': {
                            opacity: 0.8,
                        },
                    }}
                    onLoad={() => setLoaded(true)}
                />
            </Card>
        </>
    );
}

export default CatClickableImage;
