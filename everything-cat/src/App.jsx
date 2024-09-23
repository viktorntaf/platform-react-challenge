import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import CatImageList from './components/dashboard/CatImageList.jsx';
import BreedList from './components/breeds/BreedList.jsx';
import Favourites from './components/favourites/Favourites.jsx';
import CatImageModal from './components/modals/CatImageModal.jsx';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar className=".MuiToolbar-root">
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Cat App
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/breeds">Breeds</Button>
                <Button color="inherit" component={Link} to="/favourites">Favourites</Button>
            </Toolbar>
        </AppBar>
    );
};

const App = () => {
    const location = useLocation();

    // Check if the current path includes '/image/' to hide the navbar for the modal route
    const isModalRoute = location.pathname.startsWith('/image/');

    return (
        <div>
            {/* Render the navigation bar unless it's the modal route */}
            {!isModalRoute && <Navbar />}
            <Routes>
                <Route path="/" element={<CatImageList />} />
                <Route path="/image/:id" element={<CatImageModal />} />
                <Route path="/breeds" element={<BreedList />} />
                <Route path="/favourites" element={<Favourites />} />
            </Routes>
        </div>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;
