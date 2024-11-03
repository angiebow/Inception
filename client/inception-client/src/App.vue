<template>
  <div id="app" class="bg-space min-h-screen text-white font-sans">
    <nav class="flex justify-center space-x-4 p-4 text-nebula">
      <router-link to="/login" class="hover:text-star">Login</router-link>
      <router-link to="/register" class="hover:text-star">Register</router-link>
      <router-link to="/dashboard" class="hover:text-star">Dashboard</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
.bg-space {
  background: linear-gradient(145deg, #0a0a0a, #2e2b58, #0a0a0a); 
  background-size: cover;
}
.text-nebula {
  color: #9e9fff; 
}
.text-star {
  color: #fefefe; 
}
</style>