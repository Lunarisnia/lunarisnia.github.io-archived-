<template>
  <v-app>
    <v-main>
      <KillCount :count="count"/>
    </v-main>
  </v-app>
</template>

<script>
import KillCount from './components/KillCount.vue';
import { getDatabase, ref, onValue } from "firebase/database";
import app from './config/firebase';

export default {
  name: 'App',

  components: {
    KillCount,
  },
  async beforeMount() {
    const database = getDatabase(app);
    const killCountRef = ref(database, '/killCount');
    onValue(killCountRef, (snapshot) => {
      this.count = snapshot.val();
    });
  },

  data: () => ({
    count: 0,
  }),
};
</script>
