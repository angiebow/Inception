<template>
  <div id="app" class="bg-space min-h-screen text-white font-sans">
    <nav class="flex justify-center space-x-4 p-4 text-nebula">
      <router-link to="/login" class="hover:text-star">Login</router-link>
      <router-link to="/register" class="hover:text-star">Register</router-link>
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
      currentUserId: null,
      notifications: [],
      showNotifications: false,
    };
  },
  async mounted() {
    // Get the current user ID
    await this.getCurrentUser();
    //console.log(this.currentUserId);

    // Fetch notifications when the component is created
    fetch(`http://localhost:5001/api/notifications/${this.currentUserId}`)
      .then(response => response.json())
      .then(data => {
        this.notifications = data;
      });
  },
  methods: {
    async getCurrentUser() {
      const token = localStorage.getItem('token');
      //console.log(token);
      if (!token) return null;
      try {
          const response = await fetch('http://localhost:5001/api/users/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            //console.log(data.message + ' ' + data.userId);
            this.currentUserId = data.userId;
            return;
          } else {
              console.error('Failed to get user ID:', response.statusText);
              return null;
          }
      } catch (error) {
          console.error('Failed to get user ID:', error);
          return null;
      }
    },
    async fetchNotifications() {
      fetch(`http://localhost:5001/api/notifications/${this.currentUserId}`)
        .then(response => response.json())
        .then(data => {
          this.notifications = data;
        });
    },
    markAsRead(notificationId) {
      fetch(`http://localhost:5001/api/notifications/${notificationId}`, {
        method: 'PUT'
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