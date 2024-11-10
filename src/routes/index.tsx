import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, ProfilePage } from "../pages";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile/:id" element={<ProfilePage />} />
            </Routes>
        </BrowserRouter>
    )
}