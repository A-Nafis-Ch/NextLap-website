import { GoogleLogin } from '@react-oauth/google';
import api from './api';

export default function Login() {
  const handleSuccess = async (response) => {
    // Send the Google token to your Django 'dj-rest-auth' endpoint
    const res = await api.post('auth/google/', {
      access_token: response.credential,
    });
    localStorage.setItem('token', res.data.key); // Save the login session
    window.location.reload(); 
  };

  return <GoogleLogin onSuccess={handleSuccess} />;
}