<template>
  <div class="dashboard-container">
    <h2 class="title">NASA Astronomy Picture of the Day</h2>
    
    <div v-if="apod" class="apod-card">
      <h3 class="apod-title">{{ apod.title }}</h3>
      <p class="apod-date">{{ apod.date }}</p>
      <div class="apod-media">
        <img v-if="apod.media_type === 'image'" :src="apod.url" :alt="apod.title" class="apod-image"/>
        <iframe v-if="apod.media_type === 'video'" :src="apod.url" frameborder="0" allowfullscreen class="apod-video"></iframe>
      </div>
      <p class="apod-explanation">{{ apod.explanation }}</p>
      <p v-if="apod.copyright" class="apod-copyright">© {{ apod.copyright }}</p>
    </div>
    
    <p v-else class="loading-text">Loading...</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserDashboard', 
  data() {
    return {
      apod: null,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    async fetchAPOD() {
      try {
        const response = await axios.get('https://api.nasa.gov/planetary/apod', {
          params: {
            api_key: 'vNGRunaUc0wSda7bjUBoKkJYDfbEIoWNbjUVoUqZ', 
          },
        });
        this.apod = response.data;
      } catch (error) {
        console.error('Error fetching APOD:', error);
      }
    },
  },
  mounted() {
    this.fetchAPOD();
  },
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #d1d5db;
  background: #1a202c; 
  padding: 2rem;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: #81e6d9;
  margin-bottom: 2rem;
  text-align: center;
}

.apod-card {
  background: #2d3748;
  border-radius: 8px;
  padding: 2rem;
  max-width: 600px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.apod-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fbb6ce; 
}

.apod-date {
  font-size: 1rem;
  color: #cbd5e0;
  margin-bottom: 1rem;
}

.apod-media {
  margin: 1.5rem 0;
}

.apod-image, .apod-video {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}

.apod-explanation {
  font-size: 1rem;
  color: #e2e8f0;
  line-height: 1.6;
  margin-top: 1rem;
  text-align: justify;
}

.apod-copyright {
  font-size: 0.875rem;
  color: #a0aec0;
  margin-top: 1rem;
}

.loading-text {
  color: #e2e8f0;
  font-size: 1.25rem;
  text-align: center;
  margin-top: 2rem;
}
</style>