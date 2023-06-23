import React from "react";
import App from '../App';

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

const Rutas = () => {
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
        </Routes>
    </BrowserRouter>
}