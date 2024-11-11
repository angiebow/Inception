<template>
  <div id="app" class="min-h-screen font-sans text-white bg-space">
    <nav class="flex justify-center p-4 space-x-4 text-nebula">
      <router-link to="/" class="hover:text-star">Home</router-link>
      <!-- <router-link to="/login" class="hover:text-star">Login</router-link>
      <router-link to="/register" class="hover:text-star">Register</router-link> -->
      <router-link v-if="!currentUserId" to="/login" class="hover:text-star">Login</router-link>
      <router-link v-if="!currentUserId" to="/register" class="hover:text-star">Register</router-link>
      
      <router-link to="/dashboard" class="hover:text-star">Dashboard</router-link>
      <button @click="showNotifications = !showNotifications">Notifications</button>
      <div v-if="showNotifications" class="notification-dropdown">
        <ul>
          <li v-for="notification in notifications" :key="notification._id">
            <p>{{ notification.message }}</p>
            <button @click="markAsRead(notification._id)">Mark as Read</button>
          </li>
        </ul>
      </div>
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

<script>
export default {
  data() {
    return {
      currentUserId: null, // Menyimpan userId setelah login
      notifications: [],
      showNotifications: false,
    };
  },
  async mounted() {
    await this.getCurrentUser();  // Memperoleh userId saat komponen dimuat

    if (this.currentUserId) {
      this.fetchNotifications();  // Mengambil notifikasi jika sudah login
    }
  },
  methods: {
    async getCurrentUser() {
      const token = localStorage.getItem('token');
      if (!token) return null;
      try {
        const response = await fetch('http://localhost:5001/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          this.currentUserId = data.userId;
        } else {
          console.error('Failed to get user ID:', response.statusText);
        }
      } catch (error) {
        console.error('Failed to get user ID:', error);
      }
    },
    async fetchNotifications() {
      if (this.currentUserId) {
        fetch(`http://localhost:5001/api/notifications/${this.currentUserId}`)
          .then(response => response.json())
          .then(data => {
            this.notifications = data;
          });
      }
    },
    markAsRead(notificationId) {
      fetch(`http://localhost:5001/api/notifications/${notificationId}`, {
        method: 'PUT',
      })
        .then(response => response.json())
        .then(data => {
          this.notifications = this.notifications.map(notif =>
            notif._id === notificationId ? { ...notif, isRead: true } : notif
          );
          console.log(data);
        });
    }
  },
};
</script>
