<script setup lang="ts">
import { MapPinnedIcon, LucideListTodo, LucideBarChart4 } from 'lucide-vue-next';
</script>

<template>
    <div class="relative w-full flex">
        <div
            class="rounded-lg w-full grid grid-flow-row sm:grid-flow-row grid-cols-1 sm:grid-cols-3 py-9 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-gray-100 bg-white-500 z-10">

            <div class="flex items-start justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0"
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
            <div class="flex justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0"
                key="2">
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
                        <p class="text-lg text-white">Puedes agregar una valoración anonima o con tu cuenta, ademas de
                            un
                            comentario.</p>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0"
                key="3">
                <div class="flex mx-auto w-40 sm:w-auto">
                    <div class="flex items-center justify-center bg-green-700 w-20 h-20 p-5 mr-6 rounded-full">
                        <LucideBarChart4 class="text-white h-10 w-10 rounded-full" />
                    </div>
                    <div class="flex flex-col">
                        <p class="text-xl text-white font-bold">
                            Estadisticas
                        </p>
                        <p class="text-lg text-white">Cada vez que recicles estaras aportando con la reducción de
                            emisiones de
                            Co2, que requiere el material que estas reciclando.

                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="absolute bg-black-600 opacity-5 w-11/12 roudned-lg h-64 sm:h-48 top-0 mt-8 mx-auto left-0 right-0">
        </div>
    </div>
</template>