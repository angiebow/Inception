<template>
  <div>
      <h2>My Favorite Papers</h2>
      <div v-if="error">{{ error }}</div>
      <ul v-if="favorites.length">
          <li v-for="favorite in favorites" :key="favorite._id">
              <h3>{{ favorite.paperId.title }}</h3>
              <p>{{ favorite.paperId.description }}</p>
          </li>
      </ul>
      <p v-else>No favorite papers yet.</p>
  </div>
</template>

<script>
export default {
  data() {
      return {
          favorites: [],
          error: null,
      };
  },
  async mounted() {
      try {
          const token = localStorage.getItem('token');
          const response = await fetch('http://localhost:5001/api/favorites', {
              headers: { Authorization: `Bearer ${token}` }
          });

          if (!response.ok) {
              const data = await response.json();
              this.error = data.message || 'Failed to fetch favorites';
              return;
          }

          this.favorites = await response.json();
      } catch (error) {
          console.error('Error fetching favorites:', error);
          this.error = 'Network error. Please try again.';
      }
  }
};
</script>