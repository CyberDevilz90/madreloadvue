import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: '',
    token: localStorage.getItem('token') || '',
    status: '',
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    authStatus: (state) => state.status,
    getUser: (state) => state.user,
  },
  actions: {
    auth_request() {
      this.status = 'loading';
    },
    auth_success({ token, user }) {
      this.status = 'success';
      this.token = token;
      this.user = user;
    },
    auth_error() {
      this.status = 'error';
    },
    async register(user) {
      this.auth_request();
      try {
        const response = await axios.post('http://127.0.0.1:5000/user/register', {
          name: user.name,
          email: user.email,
          password: user.password,
          telp: user.telp,
        });
        const token = response.data.token;
        const userData = response.data.data;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.auth_success({ token, user: userData });
        return response;
      } catch (error) {
        this.auth_error();
        localStorage.removeItem('token');
        throw error;
      }
    },
    async login(user) {
      this.auth_request();
      try {
        const response = await axios.post('http://127.0.0.1:5000/user/login', {
          email: user.email,
          password: user.password,
        });
        const token = response.data.token;
        const userData = response.data.info;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.auth_success({ token, user: userData });
        return response;
      } catch (error) {
        this.auth_error();
        localStorage.removeItem('token');
        throw error;
      }
    },
    async fetchUserByToken() {
      this.auth_request();
      try {
        const response = await axios.get('http://127.0.0.1:5000/user/get_user_by_token', {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });
        const userData = response.data.data;
        this.user = { ...this.user, ...userData }; // Merge new user data with existing state
        this.status = 'success';
        return response;
      } catch (error) {
        this.auth_error();
        throw error;
      }
    },
    logout() {
      this.status = '';
      this.token = '';
      this.user = {};
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    },
  },
});
