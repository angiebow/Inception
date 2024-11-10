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
          <button @click="viewComments(paper._id)" class="mt-2 inline-block bg-nebula text-white-900 font-semibold rounded hover:bg-indigo-700 transition duration-300 transform hover:scale-105">
            View Comments
          </button>
          <div v-if="comments">
            <h3 class="text-2xl font-semibold text-nebula">Reviews</h3>
            <ul>
              <li v-for="comment in comments[paper._id]" :key="comment._id" class="mb-4 p-4 bg-gray-800 rounded-lg">
                <p class="text-sm text-gray-400">{{ comment.authorId }} Submitted on {{ new Date(comment.createdAt).toLocaleDateString() }}</p>
                <p class="mt-2">{{ comment.content }}</p>
              </li>
            </ul>
          </div>
            <div class="mt-4">
              <form @submit.prevent="submitComment(paper._id)">
                <textarea v-model="newComment[paper._id]" placeholder="Write your comment here" class="w-full p-2 bg-transparent border border-nebula rounded focus:outline-none text-star placeholder-opacity-50" rows="1" required></textarea>
                <button type="submit" class="mt-2 inline-block bg-nebula text-white-900 font-semibold rounded hover:bg-indigo-700 transition duration-300 transform hover:scale-105">Submit Comment</button>
              </form>
            </div>
        </li>
      </ul>
    </div>
    <p v-if="error" class="mt-4 text-red-500">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'ViewPapers',
  props: ['paperId'],
  data() {
    return {
      papers: [],
      comments: [],
      error: null,
      showForm: false,
      newComment: {},
      currentUserId: '',
    };
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
            console.log(data.message + ' ' + data.userId);
            return data.userId;
          } else {
            console.error('Failed to get user ID:', response.statusText);
            return null;
          }
      } catch (error) {
          console.error('Failed to get user ID:', error);
          return null;
      }
    },
    async viewComments(inPaperId) {
      try {
        const response = await fetch(`http://localhost:5001/api/comments/${inPaperId}`);
        this.comments[inPaperId] = await response.json();
        console.log(this.comments[inPaperId]);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    },
    async submitComment(inPaperId) {
      try {
        this.currentUserId = await this.getCurrentUser();
        console.log(this.currentUserId);
        console.log(inPaperId);
        console.log(this.newComment[inPaperId]);
        const response = await fetch('http://localhost:5001/api/comments/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            authorId: this.currentUserId,
            paperId: inPaperId,
            content: this.newComment[inPaperId],
          }),
        });
        console.log(response);
        alert('Comment added successfully');
        this.newComment[inPaperId] = '';
        this.viewComments(inPaperId);
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    },
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