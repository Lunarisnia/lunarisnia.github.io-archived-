<template>
  <v-app>
    <v-main>
      <KillCount/>
    </v-main>
  </v-app>
</template>

<script>
import KillCount from './components/KillCount.vue';

export default {
  name: 'App',

  components: {
    KillCount,
  },

  data: () => ({
    //
  }),
};
</script>
