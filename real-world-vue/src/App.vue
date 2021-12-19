<template>
  <div id="real-world-vue">
    <div id="flashMessage" v-if="this.globalStore.flashMessage">{{ this.globalStore.flashMessage }}</div>
    <div id="nav">
      <router-link :to="{ name: 'EventList' }">Events</router-link> |
      <router-link :to="{ name: 'About' }">About</router-link>
    </div>

    <!-- Using the <router-view /> component provided by Vue Router  -->
    <!-- as an outlet/placholder for the component that should render  -->
    <!-- when the selected route is matched  -->
    <router-view />
  </div>
</template>

<script>
export default {
  inject: ['globalStore']
};
</script>

<style>
#real-world-vue {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

h4 {
  font-size: 20px;
}

@keyframes yellowfade {
  from {
    background: yellow;
  }
  to {
    background: transparent;
  }
}

#flashMessage {
  animation-name: yellowfade;
  animation-duration: 3s;
}
</style>
