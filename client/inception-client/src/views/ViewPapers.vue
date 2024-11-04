<template>
  <div class="max-w-3xl mx-auto mt-20 p-8 bg-gray-900 bg-opacity-75 rounded-lg shadow-lg text-star">
    <h2 class="text-3xl font-bold mb-4 text-nebula">Submitted Papers</h2>
    <div v-if="papers.length === 0" class="text-center text-gray-400">
      No papers submitted yet.
    </div>
    <div v-else>
      <ul>
        <li v-for="paper in papers" :key="paper._id" class="mb-6 p-4 bg-gray-800 rounded-lg">
          <h3 class="text-2xl font-semibold text-nebula">{{ paper.title }}</h3>
          <p class="text-sm text-gray-400">Submitted on {{ new Date(paper.createdAt).toLocaleDateString() }}</p>
          <p class="mt-2">{{ paper.description }}</p>
          <a :href="paper.fileUrl" target="_blank" class="mt-2 inline-block text-indigo-400 hover:text-indigo-600">
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
  name: 'ViewPapers',
  data() {
    return {
      papers: [],
      error: null,
    };
  },
  async mounted() {
    try {
      const response = await fetch('http://localhost:5001/api/papers');
      if (!response.ok) {
        const errorData = await response.json();
        this.error = errorData.message || 'Failed to fetch papers.';
        return;
      }
      this.papers = await response.json();
    } catch (error) {
      console.error('Error fetching papers:', error);
      this.error = 'Network error. Please try again.';
    }
  },
};
</script>

<style scoped>
</style>