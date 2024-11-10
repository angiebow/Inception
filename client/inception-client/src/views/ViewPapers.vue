<template>
  <div class="max-w-3xl mx-auto mt-20 p-8 bg-gray-900 bg-opacity-75 rounded-lg shadow-lg text-star">
    <h2 class="text-3xl font-bold mb-4 text-nebula">Submitted Papers</h2>

]    <div class="mb-4">
      <input
        v-model="searchTerm"
        @input="scrollToFirstMatch"
        type="text"
        placeholder="Search papers..."
        class="w-full p-2 bg-transparent border border-nebula rounded focus:outline-none text-star placeholder-opacity-50"
      />
    </div>

    <div v-if="filteredPapers.length === 0" class="text-center text-gray-400">
      No papers found.
    </div>
    <div v-else>
      <ul>
        <li v-for="paper in filteredPapers" :key="paper._id" class="mb-6 p-4 bg-gray-800 rounded-lg" ref="paperItems">
          <h3 class="text-2xl font-semibold text-nebula" v-html="highlightText(paper.title)"></h3>
          <p class="text-sm text-gray-400">Submitted on {{ new Date(paper.createdAt).toLocaleDateString() }}</p>
          <p class="mt-2" v-html="highlightText(paper.description)"></p>
          <a :href="paper.fileUrl" target="_blank" class="mt-2 inline-block text-indigo-400 hover:text-indigo-600">
            View Paper
          </a>
          <button @click="viewComments(paper._id)" class="mt-2 inline-block bg-nebula text-white-900 font-semibold rounded hover:bg-indigo-700 transition duration-300 transform hover:scale-105">
            View Comments
          </button>
          <div v-if="comments[paper._id]">
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
  data() {
    return {
      papers: [],
      comments: [],
      error: null,
      newComment: {},
      currentUserId: '',
      searchTerm: '', 
    };
  },
  computed: {
    filteredPapers() {
      if (!this.searchTerm) {
        return this.papers;
      }
      const lowerSearchTerm = this.searchTerm.toLowerCase();
      return this.papers.filter((paper) =>
        paper.title.toLowerCase().includes(lowerSearchTerm) ||
        paper.description.toLowerCase().includes(lowerSearchTerm)
      );
    },
  },
  methods: {
    highlightText(text) {
      if (!this.searchTerm) return text;
      const regex = new RegExp(`(${this.searchTerm})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    },
    scrollToFirstMatch() {
      this.$nextTick(() => {
        const firstMatch = this.$refs.paperItems.find(item =>
          item.innerHTML.includes('<mark>')
        );
        if (firstMatch) {
          firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    },
    async viewComments(inPaperId) {
      try {
        const response = await fetch(`http://localhost:5001/api/comments/${inPaperId}`);
        this.comments[inPaperId] = await response.json();
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    },
    async submitComment(inPaperId) {
      try {
        this.currentUserId = await this.getCurrentUser();
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
        if (response.ok) {
          alert('Comment added successfully');
          this.newComment[inPaperId] = '';
          this.viewComments(inPaperId);
        } else {
          console.error('Error submitting comment:', response.statusText);
        }
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    },
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
mark {
  background-color: yellow;
  color: black;
}
</style>