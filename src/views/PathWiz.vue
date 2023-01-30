<template>
  <v-container style="background-color: black; height: 100%; width: 100%;" fluid>
    <Grid :col="col" :row="row" :debug="false" />
  </v-container>
</template>

<script lang="ts">
import Grid from '@/components/Grid.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: {
    Grid
  },
  data() {
    return {
      row: 4,
      col: 5
    }
  }
})
</script>
