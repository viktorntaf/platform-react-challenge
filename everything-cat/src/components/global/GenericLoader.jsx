import {Box, CircularProgress} from "@mui/material";
import React from "react";

/**
 * A simple generic loader with a spinner
 *
 * @returns {React.JSX.Element}
 * @constructor
 */
const GenericLoader = () => (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress color="primary" />
    </Box>
)

export default GenericLoader;