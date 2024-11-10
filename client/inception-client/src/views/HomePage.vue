<template>
  <div>
    <div class="header flex justify-between items-center p-4 bg-dark text-light">
      <button @click="toggleSidebar" class="px-4 py-2 bg-indigo-500 text-white rounded">Toggle Sidebar</button>
      <div class="flex items-center space-x-4">
        <span class="text-lg font-bold">Welcome, {{ username || 'Guest' }}</span>
        <button @click="logout" class="px-4 py-2 bg-red-500 text-white rounded">Logout</button>
      </div>
    </div>

    <div :class="['sidebar', { 'hidden': !isSidebarVisible }]" class="fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-4 transition-transform duration-300 transform">
      <h2 class="text-xl font-bold">Sidebar</h2>
      <ul>
        <li><router-link to="/view-paper">View Papers</router-link></li>
        <li><router-link to="/submit-paper">Submit Papers</router-link></li>
        <router-link to="/favorites">My Favorites</router-link>
      </ul>
    </div>

    <div class="main-content ml-64 p-4">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      isSidebarVisible: false,
      username: localStorage.getItem('username') || 'Guest',
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('username'); 

      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.header {
  background-color: #1a1a2e;
  color: #a29bfe;
}

.sidebar {
  transition: transform 0.3s ease-in-out;
}

.sidebar.hidden {
  transform: translateX(-100%);
}

.main-content {
  transition: margin-left 0.3s ease-in-out;
}
</style>