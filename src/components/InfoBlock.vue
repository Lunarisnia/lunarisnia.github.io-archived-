<template>
  <v-col cols="6" :class="bgColor">
    <v-container class="h-screen d-flex justify-center align-center">
      <pre>
        <slot></slot>
      </pre>
    </v-container>
  </v-col>
</template>

<script lang="ts">
export default {
  props: {
    bgColor: String,
  }
}
</script>
