<script setup lang="ts">
import leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { onMounted, ref, watchEffect } from 'vue';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';

let map: leaflet.Map;
let coordinates = ref<GeolocationCoordinates>();


onMounted(() => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            coordinates.value = position.coords;
        });
    }


    map = leaflet.map("map", { zoom: 20 }).setView([coordinates.value ? coordinates.value.latitude : -33.5280908, coordinates.value ? coordinates.value.longitude : -70.645133717], 17, { animate: true });
    leaflet.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGFibG9za3ljbCIsImEiOiJja3p4YTI5aDQwOHBjMm5wNHpjbDFwbXB3In0.whxmHO9518rfLL_oHVMeaQ",
        {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11',
            accessToken: 'pk.eyJ1IjoicGFibG9za3ljbCIsImEiOiJja3p4YTI5aDQwOHBjMm5wNHpjbDFwbXB3In0.whxmHO9518rfLL_oHVMeaQ'
        }
    ).addTo(map);
})

watchEffect(() => {
    if (coordinates.value) {
        map.setView([coordinates.value.latitude, coordinates.value.longitude], 17)
    }
})

</script>

<template>
    <div class="grid h-screen w-full pl-[56px]">
        <aside class="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
            <div class="border-b p-2">
                <Button variant="outline" size="icon" aria-label="Home">
                    <Triangle class="size-5 fill-foreground" />
                </Button>
            </div>
            <nav class="grid gap-1 p-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <Button variant="ghost" size="icon" class="rounded-lg bg-muted" aria-label="Playground">
                                <SquareTerminal class="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" :side-offset="5">
                            Playground
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <Button variant="ghost" size="icon" class="rounded-lg" aria-label="Models">
                                <Bot class="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" :side-offset="5">
                            Models
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <Button variant="ghost" size="icon" class="rounded-lg" aria-label="API">
                                <Code2 class="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" :side-offset="5">
                            API
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <Button variant="ghost" size="icon" class="rounded-lg" aria-label="Documentation">
                                <Book class="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" :side-offset="5">
                            Documentation
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <Button variant="ghost" size="icon" class="rounded-lg" aria-label="Settings">
                                <Settings2 class="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" :side-offset="5">
                            Settings
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
            <nav class="mt-auto grid gap-1 p-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <Button variant="ghost" size="icon" class="mt-auto rounded-lg" aria-label="Help">
                                <LifeBuoy class="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" :side-offset="5">
                            Help
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <Button variant="ghost" size="icon" class="mt-auto rounded-lg" aria-label="Account">
                                <SquareUser class="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" :side-offset="5">
                            Account
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
        </aside>
        <div class="flex flex-col">
            <header class="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
                <h1 class="text-xl font-semibold">
                    Buscar Recipunto mas cercano
                </h1>
                <Drawer>
                    <DrawerTrigger as-child>
                        <Button variant="ghost" size="icon" class="md:hidden">
                            <Settings class="size-4" />
                            <span class="sr-only">Dirección</span>
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent class="max-h-[80vh]">
                        <DrawerHeader>
                            <DrawerTitle>Configuration</DrawerTitle>
                            <DrawerDescription>
                                Configure the settings for the model and messages.
                            </DrawerDescription>
                        </DrawerHeader>
                        <form class="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
                            <fieldset class="grid gap-6 rounded-lg border p-4">
                                <legend class="-ml-1 px-1 text-sm font-medium">
                                    Settings
                                </legend>
                                <div class="grid gap-3">
                                    <Label for="model">Model</Label>
                                    <Select>
                                        <SelectTrigger id="model" class="items-start [&_[data-description]]:hidden">
                                            <SelectValue placeholder="Select a model" />
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
                                                            The most powerful model for complex
                                                            computations.
                                                        </p>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div class="grid gap-3">
                                    <Label for="temperature">Temperature</Label>
                                    <Input id="temperature" type="number" placeholder="0.4" />
                                </div>
                                <div class="grid gap-3">
                                    <Label for="top-p">Top P</Label>
                                    <Input id="top-p" type="number" placeholder="0.7" />
                                </div>
                                <div class="grid gap-3">
                                    <Label for="top-k">Top K</Label>
                                    <Input id="top-k" type="number" placeholder="0.0" />
                                </div>
                            </fieldset>
                            <fieldset class="grid gap-6 rounded-lg border p-4">
                                <legend class="-ml-1 px-1 text-sm font-medium">
                                    Messages
                                </legend>
                                <div class="grid gap-3">
                                    <Label for="role">Role</Label>
                                    <Select default-value="system">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="system">
                                                System
                                            </SelectItem>
                                            <SelectItem value="user">
                                                User
                                            </SelectItem>
                                            <SelectItem value="assistant">
                                                Assistant
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div class="grid gap-3">
                                    <Label for="content">Content</Label>
                                    <Textarea id="content" placeholder="You are a..." />
                                </div>
                            </fieldset>
                        </form>
                    </DrawerContent>
                </Drawer>
                <Button variant="outline" size="sm" class="ml-auto gap-1.5 text-sm">
                    <Share class="size-3.5" />
                    Share
                </Button>
            </header>
            <main class="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
                <div class="relative hidden flex-col items-start gap-8 md:flex">
                    <form class="grid w-full items-start gap-6">
                        <fieldset class="grid gap-6 rounded-lg border p-4">
                            <legend class="-ml-1 px-1 text-sm font-medium">
                                Dirección
                            </legend>
                            <div class="grid gap-3">
                                <Input type="text" placeholder="dirección" />
                            </div>
                        </fieldset>
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
                            <div class="grid gap-3">
                                <Label for="role">Role</Label>
                                <Select default-value="system">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="system">
                                            System
                                        </SelectItem>
                                        <SelectItem value="user">
                                            User
                                        </SelectItem>
                                        <SelectItem value="assistant">
                                            Assistant
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div class="grid gap-3">
                                <Label for="content">Content</Label>
                                <Textarea id="content" placeholder="You are a..." class="min-h-[9.5rem]" />
                            </div>
                        </fieldset>
                    </form>
                </div>
                <div id="map"
                    class="relative flex h-5/6 min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2"></div>
            </main>
        </div>
    </div>
</template>