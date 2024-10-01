<script setup lang="ts">

import { onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth';
import Recipuntoicon from './compositionElements/icons/recipuntoicon.vue';
import { Toaster } from './ui/toast';
import Features from './index/Features.vue';

const { token } = useAuthStore();

onMounted(() => {
  console.log(token);
})

</script>

<template>
  <div class="bg-gray-800">
    <div class="max-w-screen-xl pt-24 px-8 xl:px-16 mx-auto" id="about">
      <div class="flex items-center">
        <div class="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16">
          <div class=" flex flex-col justify-center items-start row-start-2 sm:row-start-1">
            <h1 class="text-3xl lg:text-4xl xl:text-4xl font-medium text-white leading-normal">
              En Recipunto puedes buscar los puntos limpios mas cercanos a tu dirección, registrar tus reciclajes y
              evaluar el estado de los puntos limpios

            </h1>
            <p class="text-white text-xl mt-4 mb-6">
              Y no solo eso si no que también creando tu cuenta, cada vez que hagas reciclaje generaras estadisticas de
              cuanto ayudas a evitar las emisiones de
              Co2 al medio ambiente, puedes compartir estas estadisticas y así generar mas conciencia en las
              comunidades.
            </p>
            <RouterLink to="/register">
              <Button class="bg-green-700 p-3 rounded-lg">Crea tu
                cuenta
              </Button>
            </RouterLink>
          </div>

          <div class="place-self-center">
            <Recipuntoicon class="w-72 h-72" />
          </div>
        </div>
      </div>
      <Features />
    </div>
    <Toaster />
  </div>
</template>
