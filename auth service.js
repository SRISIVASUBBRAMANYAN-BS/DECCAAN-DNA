import axios from 'axios';
import jwtDecode from 'jwt-decode';

class AuthService {
  async login(username, password) {
    try {
      const response = await axios.post('https://your-auth-api-url.com/api/v1/login', {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      return token;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async register(username, password, email) {
    try {
      const response = await axios.post('https://your-auth-api-url.com/api/v1/register', {
        username,
        password,
        email,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      return token;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async logout() {
    localStorage.removeItem('token');
  }

  async getToken() {
    return localStorage.getItem('token');
  }

  async getDecodedToken() {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    } else {
      return null;
    }
  }

  async isAuthenticated() {
    const token = this.getToken();
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  async authorize(role) {
    const decodedToken = this.getDecodedToken();
    if (decodedToken && decodedToken.role === role) {
      return true;
    } else {
      return false;
    }
  }
}

export default AuthService;
