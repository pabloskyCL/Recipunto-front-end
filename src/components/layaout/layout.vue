<script setup lang="ts">
import NavBar from '../compositionElements/NavBar.vue';
import Footer from '../compositionElements/Footer.vue';

</script>

<template>
  <NavBar />
    <slot />
  <Footer />
</template>

