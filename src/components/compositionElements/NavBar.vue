<script setup lang="ts">
import UserNav from './UserNav.vue';
import MainNav from './MainNav.vue';
import recipuntoicon from './icons/recipuntoicon.vue';
</script>


<template>
  <div class="border-b">
    <div class="flex h-20 items-center px-4">
      <RouterLink to="/" class="flex items-center">
        <recipuntoicon class="h-10 w-10" />
        <span class="text-2xl">Recipunto</span>
      </RouterLink>
      <MainNav class="mx-6" />
      <div class="ml-auto flex items-center space-x-4">
        <UserNav />
      </div>
    </div>
  </div>
</template>