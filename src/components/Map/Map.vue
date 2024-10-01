<script setup lang="ts">
import leaflet, { LeafletEvent, LeafletEventHandlerFn } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { onMounted, ref, watchEffect } from 'vue';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import axios from 'axios';
import Separator from '../ui/separator/Separator.vue';
import { DataMarker, Recipoint, RecipointResponseType } from '@/types';
import { onBeforeMount } from 'vue';
import { Bird, Rabbit, Share, Turtle } from 'lucide-vue-next';

let map: leaflet.Map;
let coordinates = ref<GeolocationCoordinates>();
let recipointList = ref();
let selectedRecipoint = ref();
let direccionText = ref();

onBeforeMount(() => {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            coordinates.value = position.coords;
        });
    }


})

onMounted(async () => {

    const { data } = await axios.get('http://localhost/recipoint', {
        withCredentials: true
    });

    recipointList.value = data.recipoints;

    map = leaflet.map("map", { zoom: 20 }).setView(data.center, 17, { animate: true });
    leaflet.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGFibG9za3ljbCIsImEiOiJja3p4YTI5aDQwOHBjMm5wNHpjbDFwbXB3In0.whxmHO9518rfLL_oHVMeaQ",
        {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11',
            accessToken: 'pk.eyJ1IjoicGFibG9za3ljbCIsImEiOiJja3p4YTI5aDQwOHBjMm5wNHpjbDFwbXB3In0.whxmHO9518rfLL_oHVMeaQ'
        }
    ).addTo(map);

    leaflet.marker(data.center).addTo(map);

    if (recipointList.value)
        recipointList.value.forEach((item: RecipointResponseType) => {
            new DataMarker([item.recipoint.lat, item.recipoint.lng], item.recipoint).addTo(map).bindPopup(item.recipoint.address_name + '\n' + 'distancia: ' + item.distance.toFixed(2) + ' km').addEventListener('popupopen', selectMarker);
        })


})

const selectMarker: LeafletEventHandlerFn = (e: LeafletEvent) => {
    const element = document.getElementById(e.target.data.id);
    if (selectedRecipoint.value?.id == e.target.data.id) {
        return
    }

    if (selectedRecipoint.value) {
        const previousSelected = document.getElementById(selectedRecipoint.value?.id);
        previousSelected?.classList.remove('bg-slate-200');
    }

    selectedRecipoint.value = e.target.data;

    element?.classList.add('bg-slate-200');
    let recipointList = document.getElementById('recipoint-list');
    if (recipointList && element) {
        recipointList.scrollTo({ top: element.offsetTop - recipointList.offsetTop, behavior: 'smooth' });
    }
}

const selectRecipoint = (recipoint: Recipoint) => {
    if (selectedRecipoint.value) {
        const previousSelected = document.getElementById(selectedRecipoint.value.id)
        previousSelected?.classList.remove('bg-slate-200');
    }

    selectedRecipoint.value = recipoint;
    const selectedElement = document.getElementById(`${recipoint.id}`);
    selectedElement?.classList.add('bg-slate-200');

    map.setView([recipoint.lat, recipoint.lng], 17);
}

const searchRecipoint = async () => {
    console.log(direccionText.value);
    map.remove();

    const { data } = await axios.get('http://localhost/recipoint', {
        params: {
            address: direccionText.value
        },
        withCredentials: true
    });

    recipointList.value = data.recipoints

    map = leaflet.map("map", { zoom: 20 }).setView([data.center.lat, data.center.lng], 17, { animate: true });
    leaflet.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGFibG9za3ljbCIsImEiOiJja3p4YTI5aDQwOHBjMm5wNHpjbDFwbXB3In0.whxmHO9518rfLL_oHVMeaQ",
        {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11',
            accessToken: 'pk.eyJ1IjoicGFibG9za3ljbCIsImEiOiJja3p4YTI5aDQwOHBjMm5wNHpjbDFwbXB3In0.whxmHO9518rfLL_oHVMeaQ'
        }
    ).addTo(map);

    leaflet.marker([data.center.lat, data.center.lng]).addTo(map).bindPopup(direccionText.value);

    if (recipointList.value)
        recipointList.value.forEach((item: RecipointResponseType) => {
            new DataMarker([item.recipoint.lat, item.recipoint.lng], item.recipoint).addTo(map).bindPopup(item.recipoint.address_name + '\n' + 'distancia: ' + item.distance.toFixed(2) + ' km').addEventListener('popupopen', selectMarker);
        })
}

watchEffect(() => {
    if (coordinates.value && map) {
        map.setView([coordinates.value.latitude, coordinates.value.longitude], 17)
    }
})

</script>

<template>
    <div class="grid h-screen w-full pl-[56px]">
        <div class="flex flex-col">
            <header class="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
                <h1 class="text-xl font-semibold">
                    Buscar Recipunto mas cercano
                </h1>
                <Button variant="outline" size="sm" class="ml-auto gap-1.5 text-sm">
                    <Share class="size-3.5" />
                    Share
                </Button>
            </header>
            <main class="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
                <div class="relative hidden flex-col items-start gap-8 md:flex">
                    <div class="grid w-full items-start gap-6">
                        <form @submit.prevent="searchRecipoint" class="grid gap-6 rounded-lg border p-4">
                            <legend class="-ml-1 px-1 text-sm font-medium">
                                Dirección
                            </legend>
                            <div class="grid gap-3">
                                <Input type="text" v-model:model-value="direccionText"
                                    placeholder="ej: calle, comuna, región" />
                            </div>
                            <Button type="submit">
                                Buscar
                            </Button>
                        </form>
                        <fieldset class="grid gap-6 rounded-lg border p-4">
                            <legend class="-ml-1 px-1 text-sm font-medium">
                                Filtrar
                            </legend>
                            <div class="grid gap-3">
                                <Label for="category">Categoria</Label>
                                <Select>
                                    <SelectTrigger id="category" class="items-start [&_[data-description]]:hidden">
                                        <SelectValue placeholder="seleccione una categoria" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="genesis">
                                            <div class="flex items-start gap-3 text-muted-foreground">
                                                <Rabbit class="size-5" />
                                                <div class="grid gap-0.5">
                                                    <p>
                                                        Neural
                                                        <span class="font-medium text-foreground">
                                                            Genesis
                                                        </span>
                                                    </p>
                                                    <p class="text-xs" data-description>
                                                        Our fastest model for general use cases.
                                                    </p>
                                                </div>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="explorer">
                                            <div class="flex items-start gap-3 text-muted-foreground">
                                                <Bird class="size-5" />
                                                <div class="grid gap-0.5">
                                                    <p>
                                                        Neural
                                                        <span class="font-medium text-foreground">
                                                            Explorer
                                                        </span>
                                                    </p>
                                                    <p class="text-xs" data-description>
                                                        Performance and speed for efficiency.
                                                    </p>
                                                </div>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="quantum">
                                            <div class="flex items-start gap-3 text-muted-foreground">
                                                <Turtle class="size-5" />
                                                <div class="grid gap-0.5">
                                                    <p>
                                                        Neural
                                                        <span class="font-medium text-foreground">
                                                            Quantum
                                                        </span>
                                                    </p>
                                                    <p class="text-xs" data-description>
                                                        The most powerful model for complex computations.
                                                    </p>
                                                </div>
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div class="grid gap-3">
                                <Label for="value">Valoración</Label>
                                <Input id="value" type="text"
                                    placeholder="cambiar por campo para seleccionar estrellas" />
                            </div>
                        </fieldset>
                        <fieldset class="grid gap-6 rounded-lg border p-4">
                            <legend class="-ml-1 px-1 text-sm font-medium">
                                Recipuntos Cerca
                            </legend>
                            <div id="recipoint-list" class="overflow-y-auto h-72">
                                <div v-for="item in recipointList" :id=item.recipoint.id :key="item.recipoint.id"
                                    class="cursor-pointer p-4" @click="selectRecipoint(item.recipoint)">
                                    <div class="text-xl">Entidad: {{ item.recipoint.owner }}</div>
                                    <div class="text-sm">
                                        calle: {{ item.recipoint.address_name }}
                                    </div>
                                    <div class="text-sm">
                                        distancia: {{ item.distance.toFixed(2) }} km
                                    </div>
                                    <div class="flex flex-row gap-3 mt-5">
                                        <router-link
                                            :to="`/recipoint/${item.recipoint.id}`"><Button>Detalles</Button></router-link>
                                        <Button><router-link
                                                :to="`/recycle/${item.recipoint.id}`">Reciclar</router-link></Button>
                                    </div>
                                </div>
                                <Separator class="my-2" />
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div id="map"
                    class="relative flex h-5/6 min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 z-0">
                </div>
            </main>
        </div>
    </div>
</template>