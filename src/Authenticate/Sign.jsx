import React, { useState } from "react";
import * as Components from './Components';
import "./Sign.css";
import { useNavigate } from 'react-router-dom';

function Sign({ onLogin }) {
    const navigate = useNavigate();
    const [signIn, toggle] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = async () => {
        try {
            const response = await fetch('http://localhost:8001/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
    
                // Prefix the token with 'Bearer ' before saving it
                const tokenWithBearer = `Bearer ${data.token}`;
                localStorage.setItem('token', tokenWithBearer);
    
                onLogin(data.token);
                navigate('/home'); 
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
            }
        } catch (error) {
            console.error('Error signing in:', error);
            setError('An error occurred while signing in. Please try again.');
        }
    };
    

    const handleSignUp = async () => {
        try {
            const response = await fetch('http://localhost:8001/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                onLogin(data.token);
                navigate('/home'); 
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
            }
        } catch (error) {
            console.error('Error signing up:', error);
            setError('An error occurred while signing up. Please try again.');
        }
    };

    return (
        <Components.Container>
            <Components.SignUpContainer signinIn={signIn}>
                <Components.Form>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
                    <Components.Input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                    <Components.Input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                    <Components.Button onClick={handleSignUp}>Sign Up</Components.Button>
                </Components.Form>
            </Components.SignUpContainer>

            <Components.SignInContainer signinIn={signIn}>
                <Components.Form>
                    <Components.Title>Sign in</Components.Title>
                    <Components.Input type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} /> {/* Changed to use username instead of email */}
                    <Components.Input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                    <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                    <Components.Button onClick={handleSignIn}>Sign In</Components.Button>
                    {error && <p>{error}</p>}
                </Components.Form>
            </Components.SignInContainer>

            <Components.OverlayContainer signinIn={signIn}>
                <Components.Overlay signinIn={signIn}>
                    <Components.LeftOverlayPanel signinIn={signIn}>
                        <Components.Title>Welcome Back!</Components.Title>
                        <Components.Paragraph>
                            To keep connected with us please login with your personal info
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(true)}>
                            Sign In
                        </Components.GhostButton>
                    </Components.LeftOverlayPanel>

                    <Components.RightOverlayPanel signinIn={signIn}>
                        <Components.Title>Hello, Friend!</Components.Title>
                        <Components.Paragraph>
                            Enter Your personal details and start journey with us
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(false)}>
                            Sign Up
                        </Components.GhostButton>
                    </Components.RightOverlayPanel>
                </Components.Overlay>
            </Components.OverlayContainer>
        </Components.Container>
    );
}

export default Sign;
