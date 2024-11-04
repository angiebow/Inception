<template>
  <div class="max-w-md mx-auto mt-20 p-8 bg-gray-900 bg-opacity-75 rounded-lg shadow-lg text-star">
    <h2 class="text-3xl font-bold mb-4 text-nebula">Submit Your Paper</h2>
    <form @submit.prevent="submitPaper">
      <input
        v-model="title"
        type="text"
        placeholder="Title"
        class="w-full mb-4 p-2 bg-transparent border border-nebula rounded focus:outline-none text-star placeholder-opacity-50"
        required
      />
      <textarea
        v-model="description"
        placeholder="Description"
        class="w-full mb-4 p-2 bg-transparent border border-nebula rounded focus:outline-none text-star placeholder-opacity-50"
        required
      ></textarea>
      <input type="file" @change="onFileChange" class="mb-4 text-star" required />
      <button class="w-full py-2 mt-2 bg-nebula text-white font-semibold rounded hover:bg-star hover:text-white shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
        Submit Paper
      </button>
    </form>
    <p v-if="error" class="mt-4 text-red-500">{{ error }}</p>
    <p v-if="success" class="mt-4 text-green-500">{{ success }}</p>
  </div>
</template>

<script>
export default {
  name: 'SubmitPapers',
  data() {
    return {
      title: '',
      description: '',
      file: null,
      error: null,
      success: null,
    };
  },
  methods: {
    onFileChange(event) {
      this.file = event.target.files[0];
    },
    async submitPaper() {
      if (!this.file) {
        this.error = "Please select a file to upload.";
        return;
      }

      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('file', this.file);

      try {
        const response = await fetch('http://localhost:5001/api/papers/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          this.error = errorData.message || 'Submission failed. Please try again.';
          this.success = null;
        } else {
          const data = await response.json();
          this.success = 'Paper submitted successfully!';
          this.error = null;
        }
      } catch (error) {
        console.error('Submission error:', error);
        this.error = 'Network error. Please try again.';
        this.success = null;
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