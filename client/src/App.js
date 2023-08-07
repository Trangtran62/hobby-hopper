import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
    return (
        <GoogleOAuthProvider clientId="221648142758-b3ede9fff8l0ekekgo93nb6s7gcbgjec.apps.googleusercontent.com">
            <BrowserRouter>
                <Container maxWidth='lg'> 
                    <Navbar />
                    <Routes>
                        <Route path="/" exact element={<Navigate to="/posts" replace />} />
                        <Route path="/posts" exact element={<Home />} />
                        <Route path="posts/:id" element={<PostDetails />} />
                        <Route path="/auth" exact element={<Auth />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
}

export default App;
