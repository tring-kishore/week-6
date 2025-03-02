import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from './component/LogIn/LogIn';
import InitailPage from './component/InitialPage/InitailPage';
import SignUp from './component/SignUp/SignUp';
import Persona from './component/Persona/Persona';
import AddPersona from './component/AddPrsona/AddPersona';
import { UserProvider } from './UserContext';
import EditPersona from './component/EditPersona/EditPersona';

function App() {
    return (
        <BrowserRouter>
            <UserProvider>
                <Routes>
                    <Route path="/" element={<InitailPage />} />
                    <Route path="/LogIn" element={<LogIn />} />
                    <Route path="/SignUp" element={<SignUp />} />
                    <Route path="/Persona" element={<Persona />} />
                    <Route path="/Persona/AddPersona" element={<AddPersona />} />
                    <Route path='/Persona/EditPersona/:index' element={<EditPersona />} />
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;