<template>
  <component :is="$route.meta.layout || 'div'">
    <routerView v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </routerView>
  </component>
</template>

<style>
.route-enter-active,
.route-leave-active {
  transition: opacity 0.2s ease;
}

.route-enter-from,
.route-leave-to {
  opacity: 0;
}
</style>