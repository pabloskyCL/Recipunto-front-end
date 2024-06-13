<template>
  <component :is="$route.meta.layout || 'div'">
    <routerView />
  </component>
</template>
