import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]); // Store all users
    const [currentUser, setCurrentUser] = useState(null); // Track the current logged-in user
    const [personas, setPersonas] = useState([]); // Store personas for the current user

    // Load all users from localStorage on initial render
    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
    }, []);

    // Load personas for the current user from localStorage
    useEffect(() => {
        if (currentUser) {
            const storedPersonas = JSON.parse(localStorage.getItem(`personas_${currentUser}`)) || [];
            setPersonas(storedPersonas);
        } else {
            setPersonas([]); // Clear personas if no user is logged in
        }
    }, [currentUser]);

    // Save personas to localStorage whenever they change
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem(`personas_${currentUser}`, JSON.stringify(personas));
        }
    }, [personas, currentUser]);

    // Add a new user
    const addUser = (user) => {
        const newUser = { ...user, id: Date.now() }; // Add a unique ID to the user
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers)); // Save all users to localStorage
    };

    // Check user credentials and set the current user
    const checkUser = (email, password) => {
        const user = users.find((user) => user.email === email && user.password === password);
        if (user) {
            setCurrentUser(user.id); // Set the current user ID
            localStorage.setItem('currentUser', user.id); // Save current user ID to localStorage
            return true;
        }
        return false;
    };

    // Add a persona for the current user
    const addPersona = (persona) => {
        const newPersona = { ...persona, id: Date.now(), userId: currentUser }; // Associate persona with the current user
        setPersonas((prevPersonas) => [...prevPersonas, newPersona]);
    };

    // Edit a persona
    const editPersona = (index, newPersona) => {
        setPersonas((prevPersonas) => {
            const updatedPersonas = [...prevPersonas];
            updatedPersonas[index] = { ...newPersona, userId: currentUser }; // Ensure the persona belongs to the current user
            return updatedPersonas;
        });
    };

    // Delete a persona
    const deletePersona = (personaId) => {
        setPersonas((prevPersonas) =>
            prevPersonas.filter((persona) => persona.id !== personaId && persona.userId === currentUser)
        );
    };

    // Logout the current user
    const logout = () => {
        setCurrentUser(null); // Reset the current user
        localStorage.removeItem('currentUser'); // Remove current user ID from localStorage
    };

    const login = (user) =>{
        setCurrentUser(user);
    }

    return (
        <UserContext.Provider
            value={{
                users,
                addUser,
                checkUser,
                personas,
                addPersona,
                editPersona,
                deletePersona,
                currentUser,
                logout,
                login,
            
            }}
        >
            {children}
        </UserContext.Provider>
    );
};