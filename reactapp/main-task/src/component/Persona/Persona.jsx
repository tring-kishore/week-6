import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import logo from '../../tringapps-copy-2.png';
import './Persona.css';
import '../InitialPage/InitailPage.css';
import { useQuery } from '@apollo/client';
import { PERSONA_QUERY } from './api/PersonaAPI'; // Import the query

const Persona = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(UserContext);

  // Fetch personas for the current user
  const { loading, error, data } = useQuery(PERSONA_QUERY, {
    variables: { user_Id: currentUser.id }, // Pass the current user's ID
  });

  // Debugging: Log fetched data
  console.log('Fetched Personas:', data);

  // Handle loading and error states
  if (loading) return <p>Loading personas...</p>;
  if (error) return <p>Error fetching personas: {error.message}</p>;

  // Extract personas from the query result
  const userPersonas = data?.allPersonas?.nodes || [];

  const goToAddPersonaPage = () => {
    navigate('/Persona/AddPersona');
  };

  const goToEditPersona = (personaId) => {
    navigate(`/Persona/EditPersona/${personaId}`);
  };

  const goToHomePage = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header>
        <div className="header">
          <img src={logo} className='logo' alt="logo" />
          <button className='logout-btn' onClick={goToHomePage}>Logout</button>
        </div>
      </header>

      <div className='main-content'>
        <div className='outer-class'>
          <div className='add-persona-btn'>
            <button className='btn-persona' onClick={goToAddPersonaPage}>Add Persona</button>
          </div>
          <div className="card-list">
            <div className="row">
              {/* Add Persona Card */}
              <div className="card" onClick={goToAddPersonaPage} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                <h3>Add Persona</h3>
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
              </div>

              {/* Display Persona Cards */}
              {userPersonas.length === 0 ? (
                <p>No personas found for the current user.</p>
              ) : (
                userPersonas.map((persona) => (
                  <div className="card" key={persona.id} onClick={() => goToEditPersona(persona.id)}>
                    <div className='section-1'>
                      <img
                        src={persona.image || 'default-image-url'} // Fallback for missing image
                        style={{ height: '150px', width: '300px', objectFit: 'cover' }}
                        alt="Persona"
                      />
                    </div>
                    <div className="section-2">
                      <div className="content">
                        <h5>{persona.name}</h5>
                        <p>{persona.quote}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Persona;