<template>
  <div class="submit-paper-container flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900">
    <div class="max-w-lg w-full bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-lg">
      <h2 class="text-3xl font-bold text-center text-nebula mb-6">Submit Your Paper</h2>
      <form @submit.prevent="submitPaper" class="space-y-4">
        <input v-model="title" type="text" placeholder="Title" class="w-full p-3 bg-transparent border border-nebula rounded focus:outline-none text-star placeholder-opacity-50" required />
        <textarea v-model="description" placeholder="Description" class="w-full p-3 bg-transparent border border-nebula rounded focus:outline-none text-star placeholder-opacity-50" rows="3" required></textarea>
        <input v-model="field" type="text" placeholder="Field" class="w-full p-3 bg-transparent border border-nebula rounded focus:outline-none text-star placeholder-opacity-50" />
        <input v-model="yearOfPublishing" type="number" placeholder="Year of Publishing" class="w-full p-3 bg-transparent border border-nebula rounded focus:outline-none text-star placeholder-opacity-50" />
        <input v-model="institution" type="text" placeholder="Institution" class="w-full p-3 bg-transparent border border-nebula rounded focus:outline-none text-star placeholder-opacity-50" />
        <input v-model="citationRate" type="number" placeholder="Citation Rate" class="w-full p-3 bg-transparent border border-nebula rounded focus:outline-none text-star placeholder-opacity-50" />
        <div class="flex items-center">
          <label class="bg-nebula text-white px-4 py-2 rounded cursor-pointer hover:bg-indigo-700 transition-colors">
            <input type="file" @change="handleFileUpload" class="hidden" required />
            Choose File
          </label>
          <span class="ml-4 text-star">{{ file ? file.name : "No file chosen" }}</span>
        </div>
        <button type="submit" class="w-full py-3 mt-4 bg-nebula text-white font-semibold rounded hover:bg-indigo-700 transition duration-300 transform hover:scale-105">Submit Paper</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      description: '',
      field: '',
      yearOfPublishing: '',
      institution: '',
      citationRate: '',
      file: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    async submitPaper() {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('field', this.field);
      formData.append('yearOfPublishing', this.yearOfPublishing);
      formData.append('institution', this.institution);
      formData.append('citationRate', this.citationRate);
      formData.append('file', this.file);

      try {
        const response = await axios.post('http://localhost:5001/api/papers/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log(response.data.message);
        alert('Paper submitted successfully');
      } catch (error) {
        console.error('Submission error:', error);
        alert('Failed to submit paper');
      }
    },
  },
};
</script>

<style scoped>
.submit-paper-container {
  background: linear-gradient(145deg, #1c1c1f, #2e2b58, #1c1c1f);
}
.text-nebula {
  color: #9e9fff;
}
.text-star {
  color: #fefefe;
}
.bg-nebula {
  background-color: #6c63ff;
}
</style>