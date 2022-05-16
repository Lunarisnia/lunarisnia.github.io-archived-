<template>
  <v-container fill-height fluid class="bg tint">
    <v-row align="center" justify="center" class="text-center">
      <v-col>
        <h1 class="mainKillCount" transition="fade-transition">99</h1>
        <h1 class="subtitle">Fish Casualities in</h1>
        <img
          src="https://dkli3tbfz4zj3.cloudfront.net/all/201901XX_SN_BZ_Buy/20190127_SN_BZ_Logo_Horizontal_800.png"
          class="gameTitle"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
.bg {
  background-image: url("https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/subnautica-cinematic-trailer-featured.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}
.tint {
  background-color: rgba(22, 22, 22, 0.753);
  background-blend-mode: multiply;
}
.subtitle {
  font-size: 100%;
  color: white;
  -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 2s; /* Firefox < 16 */
  -ms-animation: fadein 2s; /* Internet Explorer */
  -o-animation: fadein 2s; /* Opera < 12.1 */
  animation: fadein 2s;
}
.gameTitle {
  width: 10%;
  -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 2s; /* Firefox < 16 */
  -ms-animation: fadein 2s; /* Internet Explorer */
  -o-animation: fadein 2s; /* Opera < 12.1 */
  animation: fadein 2s;
}
.mainKillCount {
  color: white;
  font-size: 500%;
  text-align: center;

  -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 2s; /* Firefox < 16 */
  -ms-animation: fadein 2s; /* Internet Explorer */
  -o-animation: fadein 2s; /* Opera < 12.1 */
  animation: fadein 2s;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Firefox < 16 */
@-moz-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Internet Explorer */
@-ms-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>