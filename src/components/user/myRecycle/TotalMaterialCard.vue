<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from '@/components/ui/chart-bar';

const props = defineProps<{
    totalMaterials: any
}>()
</script>

<template>
    <Card class="m-5">
        <CardHeader class="flex flex-row items-center">
            <div class="grid gap-2">
                <CardTitle>total reciclado por material(kg)</CardTitle>
                <CardDescription>
                    Total que haz reciclado por cada material.
                </CardDescription>
            </div>
            <!-- TODO: puede sea interesante hacer un boton para compartir una captura de pantalla de tu reciclaje o un compartir pero
            si es un compartir se tendria que repensar el acceso esta pagina ya que seria publica. 
            <Button as-child size="sm" class="ml-auto gap-1">
                <RouterLink :to="`/recycle/${recipoint_id}`">
                    Reciclar
                    <ArrowUpRight class="h-4 w-4" />
                </RouterLink>
            </Button>
            -->
        </CardHeader>
        <CardContent class="grid">
            <BarChart index="name" :colors="['teal']" :data="props.totalMaterials" :categories="['totalWeight']" />
        </CardContent>
    </Card>
</template>