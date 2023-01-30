<template>
  <v-container fluid class="bg-grey" fill-height>
    <v-row class="bigGutter">
      <info-block />
      <info-block bg-color="bg-red" style="position: fixed">
        <h1>PORTFOLIO</h1>
      </info-block>
      <info-block bg-color="bg-blue">
        <h1>Rio Arswendo Rachmad</h1>
        <h2 class="justify-center align-center d-flex">Software Developer</h2>
      </info-block>
      <info-block />
      <info-block bg-color="bg-green">
        <h1>Rio Arswendo Rachmad</h1>
        <h2 class="justify-center align-center d-flex">Software Developer</h2>
      </info-block>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import InfoBlock from "@/components/InfoBlock.vue";
import { Mousewheel } from "swiper";

import { defineComponent } from "vue";
export default defineComponent({
  components: {
    InfoBlock,
  },
  setup() {
    const onSwiper = (swipe: any) => {
      console.log(swipe);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Mousewheel],
    };
  },
});
</script>

<style scoped>
.drawBorder {
  border: 4px;
  border-color: black;
  border-style: solid;
}

.bigGutter {
  margin: -16px;
}
</style>
