import React, { useEffect } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { Box, Button, ButtonBase, CircularProgress, Grid2 } from '@mui/material';
import { fetchPaginatedCatImages } from '../../api';
import { useNavigate } from "react-router-dom";
import CatClickableImage from "./CatClickableImage.jsx";
import GenericLoader from "../global/GenericLoader.jsx";

/**
 * Component for rendering random cat images.
 * Each image is clickable and shows a modal with the cat's breed info.
 * User can progressively load more random cat images.
 *
 * @returns {Element}
 * @constructor
 */
const CatImageList = () => {
    const queryClient = useQueryClient(); // Get the query client
    // UseInfiniteQuery for paginated fetching
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
        isLoading,
    } = useInfiniteQuery({
        queryKey: ['cats'],
        queryFn: ({ pageParam = 1 }) => fetchPaginatedCatImages(1, {
            limit: 10,
            page: pageParam,
        }),
        getNextPageParam: (lastPage) => lastPage.nextPage, // Define next page number
        refetchOnWindowFocus: false,
    });

    const navigate = useNavigate();

    // UseEffect to remove previous cache and refetch the first page
    useEffect(() => {
        queryClient.removeQueries(['cats']);
        refetch(); // Refetch the first page
    }, [queryClient, refetch]);

    return (
        <Box sx={{ backgroundColor: 'white', minHeight: '100vh', padding: 3 }}>
            {/* Show generic loader on first load */}
            {isLoading ? (
                <GenericLoader />
            ) : (
                <>
                    <Grid2 container spacing={6}>
                        {/* Flatten pages and map through all loaded cat images */}
                        {data?.pages.flatMap((page) =>
                            page.data.map((cat) => (
                                <Grid2 xs={12} sm={6} md={4} key={cat.id}>
                                    <ButtonBase
                                        onClick={() => navigate(`/image/${cat.id}`)}
                                        sx={{ width: '100%' }}
                                    >
                                        <CatClickableImage cat={cat} />
                                    </ButtonBase>
                                </Grid2>
                            ))
                        )}
                    </Grid2>
                    <Box textAlign="center" marginTop={3}>
                        {/* Load More Button with spinner on click */}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => fetchNextPage()}
                            disabled={!hasNextPage || isFetchingNextPage}
                            sx={{ color: 'white' }}
                            startIcon={isFetchingNextPage && <CircularProgress color="inherit" size={20} />}
                        >
                            {isFetchingNextPage ? 'Loading more cats...' : 'Load More'}
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default CatImageList;
