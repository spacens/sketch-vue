<template>
  <v-app>
    <auth-header />
    <router-view />
  </v-app>
</template>

<script>
  export default {
    name: 'AuthIndex',

    components: {
      AuthHeader: () => import('./components/Header'),
    },
  }
</script>
