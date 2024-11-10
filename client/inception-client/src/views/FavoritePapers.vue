<template>
  <div class="max-w-3xl mx-auto mt-20 p-8 bg-gray-900 bg-opacity-75 rounded-lg shadow-lg text-star">
    <h2 class="text-3xl font-bold mb-4 text-nebula">My Favorite Papers</h2>
    <div v-if="favorites.length === 0" class="text-center text-gray-400">
      No favorite papers yet.
    </div>
    <div v-else>
      <ul>
        <li v-for="favorite in favorites" :key="favorite._id" class="mb-6 p-4 bg-gray-800 rounded-lg">
          <h3 class="text-2xl font-semibold text-nebula">{{ favorite.paperId.title }}</h3>
          <p class="mt-2">{{ favorite.paperId.description }}</p>
          <a :href="favorite.paperId.fileUrl" target="_blank" class="mt-2 inline-block text-indigo-400 hover:text-indigo-600">
            View Paper
          </a>
        </li>
      </ul>
    </div>
    <p v-if="error" class="mt-4 text-red-500">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'FavoritePapers',
  data() {
    return {
      favorites: [],
      error: null,
    };
  },
  async mounted() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.error = 'Please log in to view favorites.';
      return;
    }
    try {
      const response = await fetch('http://localhost:5001/api/favorites/user-favorites', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        this.favorites = await response.json();
      } else {
        const errorData = await response.json();
        this.error = errorData.message || 'Failed to fetch favorites.';
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
      this.error = 'Network error. Please try again.';
    }
  },
};
</script>

<style scoped>
mark {
  background-color: yellow;
  color: black;
}
</style>