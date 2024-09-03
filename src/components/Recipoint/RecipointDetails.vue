<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next';
import Comment from '../compositionElements/comment/comment.vue';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import RatingDetail from '../compositionElements/review/RatingDetail.vue';
import { BarChart } from '../ui/chart-bar';

const data = [
    { name: 'Jan', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
    { name: 'Feb', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
    { name: 'Mar', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
    { name: 'Apr', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
    { name: 'May', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
    { name: 'Jun', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
    { name: 'Jul', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
];

</script>

<template>
    <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div class="grid gap-4 md:gap-8 lg:grid-cols-2">
            <Card>
                <CardHeader class="flex flex-row items-center">
                    <div class="grid gap-2">
                        <CardTitle>Recipoint Name</CardTitle>
                        <CardDescription>
                            Recipoint Details.
                        </CardDescription>
                    </div>
                    <Button as-child size="sm" class="ml-auto gap-1">
                        <a href="#">
                            Reciclar
                            <ArrowUpRight class="h-4 w-4" />
                        </a>
                    </Button>
                </CardHeader>
                <CardContent class="grid">
                    <span>Ubicación:(link a google maps con las coordenadas)</span>
                    <span>Reciclajes registrados:total reciclado</span>
                    <span>Materiales: (grafico con la cantidad cantidad reciclada total por material en un periodo de
                        tiempo)</span>
                    <BarChart index="name" :data="data" :categories="['total', 'predicted']"/>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Valoraciones</CardTitle>
                </CardHeader>
                <CardContent class="grid justify-items-center gap-8">
                    <RatingDetail />
                    <Comment />
                </CardContent>
            </Card>
        </div>
    </main>
</template>