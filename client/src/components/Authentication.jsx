import React, { useState } from 'react';
import RegistrationForm from "./userSignup.jsx";
import Login from "./userLogin.jsx";

function Authentication() {
    const [isRegistering, setIsRegistering] = useState(false);

    const toggleForm = () => {
        setIsRegistering(!isRegistering);
    };

    return (
        <div>
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>

            {isRegistering ? (
                <RegistrationForm/>
            ) : (
                <Login/>
            )}
            {
                isRegistering ? <>
                    <p>Already registed ?</p>
                    <button onClick={toggleForm}>Login</button>
                </>:<>
                    <p>Not registed ?</p>
                    <button onClick={toggleForm}>Register</button>
                </>
            }

        </div>
    );
}

export default Authentication;