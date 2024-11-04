<template>
  <div class="max-w-md mx-auto mt-20 p-8 bg-gray-900 bg-opacity-75 rounded-lg shadow-lg text-star">
    <h2 class="text-3xl font-bold mb-4 text-nebula">Login</h2>
    <form @submit.prevent="login">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full mb-4 p-2 bg-transparent border border-nebula rounded focus:outline-none text-star placeholder-opacity-50"
        required
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full mb-4 p-2 bg-transparent border border-nebula rounded focus:outline-none text-star placeholder-opacity-50"
        required
      />
      <button class="w-full py-2 mt-2 bg-nebula text-white-900 font-semibold rounded hover:bg-star hover:text-white-800 shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
        Login
      </button>
    </form>
    <p v-if="error" class="mt-4 text-red-500">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserLogin',
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:5001/api/users/login', {
          email: this.email,
          password: this.password,
        }, {
          withCredentials: true // Ensures cookies or tokens are sent and received
        });
        console.log('Login successful:', response.data);
        // Clear any previous error
        this.error = null;
        // Redirect to the home page or dashboard after successful login
        this.$router.push('/home');
      } catch (error) {
        console.error('Login error:', error);
        // Improved error handling: check if there’s a server response
        this.error = error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'Login failed. Please try again.';
      }
    }
  }
};
</script>

<style scoped>
/* Additional styling for the component */
</style>