<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import Recipuntoicon from './compositionElements/icons/recipuntoicon.vue';
import { LucideListTodo, MapPinnedIcon, LucideBarChart4 } from 'lucide-vue-next';

const router = useRouter();
const { token } = useAuthStore();
// defineProps<{ msg: string }>()

onMounted(() => {
  console.log(token);
})

const count = ref(0)
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
      <div class="relative w-full flex">
        <div
          class="rounded-lg w-full grid grid-flow-row sm:grid-flow-row grid-cols-1 sm:grid-cols-3 py-9 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-gray-100 bg-white-500 z-10">

          <div
            class="flex items-start justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0"
            key="1" custom="" variants={scrollAnimation}>
            <div class="flex mx-auto w-40 sm:w-auto">
              <div class="flex items-center justify-center bg-green-700 w-20 h-20 p-5 mr-6 rounded-full ">
                <MapPinnedIcon class="text-white h-10 w-10" />
              </div>
              <div class="flex flex-col">
                <p class="text-xl text-white font-bold">
                  Ubicación
                </p>
                <p class="text-lg text-white">puedes buscar los puntos limpios mas cercanos </p>
              </div>
            </div>
          </div>
          <div class="flex justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0" key="2">
            <div class="flex mx-auto w-40 sm:w-auto">
              <div class="flex items-center justify-center bg-green-700 w-20 h-20 p-5 mr-6 rounded-full">
                <div class="p-5">
                  <LucideListTodo class="text-white h-8 w-8" />
                </div>
              </div>
              <div class="flex flex-col">
                <p class="text-xl text-white font-bold">
                  valorar puntos limpios
                </p>
                <p class="text-lg text-white">Puedes agregar una valoración anonima o con tu cuenta, ademas de un
                  comentario.</p>
              </div>
            </div>
          </div>
          <div
            class="flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0"
            key="3">
            <div class="flex mx-auto w-40 sm:w-auto">
              <div class="flex items-center justify-center bg-green-700 w-20 h-20 p-5 mr-6 rounded-full">
                <LucideBarChart4 class="text-white h-10 w-10 rounded-full" />
              </div>
              <div class="flex flex-col">
                <p class="text-xl text-white font-bold">
                  Estadisticas
                </p>
                <p class="text-lg text-white">Cada vez que recicles estaras aportando con la reducción de emisiones de Co2, que requiere el material que estas reciclando.

                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="absolute bg-black-600 opacity-5 w-11/12 roudned-lg h-64 sm:h-48 top-0 mt-8 mx-auto left-0 right-0">
        </div>
      </div>
    </div>
  </div>
</template>
