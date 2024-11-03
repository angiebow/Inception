<template>
  <div class="max-w-md mx-auto mt-20 p-8 bg-gray-900 bg-opacity-75 rounded-lg shadow-lg text-star">
    <h2 class="text-3xl font-bold mb-4 text-nebula">Register</h2>
    <form @submit.prevent="register">
      <input
        v-model="username"
        type="text"
        placeholder="Username"
        class="w-full mb-4 p-2 bg-transparent border border-nebula rounded focus:outline-none text-star placeholder-opacity-50"
        required
      />
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
        Register
      </button>
    </form>
    <p v-if="error" class="mt-4 text-red-500">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserRegister',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('http://localhost:5001/api/users/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        console.log(response.data);
        this.$router.push('/login');
      } catch (error) {
        console.error('Registration error:', error); 
        this.error = error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'Registration failed. Please try again.';
      }
    },
  }
};
</script>