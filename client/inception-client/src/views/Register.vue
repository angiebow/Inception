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
        const response = await fetch('http://localhost:5001/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          this.error = errorData.message || 'Registration failed. Please try again.';
        } else {
          const data = await response.json();
          console.log('Registration successful:', data);
          this.$router.push('/login');
        }
      } catch (error) {
        console.error('Registration error:', error);
        this.error = 'Network error. Please try again.';
      }
    },
  },
};
</script>

<style scoped>
.apod-image {
  max-width: 100%;
  height: auto;
  margin-top: 1rem;
}
</style>