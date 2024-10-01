<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next';
import Comment from '../compositionElements/comment/comment.vue';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import RatingDetail from '../compositionElements/review/RatingDetail.vue';
import { BarChart } from '../ui/chart-bar';
import { onBeforeMount, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const { currentRoute } = useRouter();
const recipoint_id = currentRoute.value.params.recipoint_id;
const recipointData = ref<{
    addressName: string,
    municipalityName: string,
    regionName: string,
    countRecycles: number,
    totalQuantity: number,
    totalSavedCo2: number
    allMaterialRecycles: {
        name: string,
        totalWeight: number
    }[]
}>({
    addressName: '',
    countRecycles: 0,
    municipalityName: '',
    regionName: '',
    allMaterialRecycles: [],
    totalQuantity: 0,
    totalSavedCo2: 0

});

const recipointId = ref<Number>();

onBeforeMount(async () => {
    recipointId.value = Number(recipoint_id);
    const { data } = await axios.get(`http://localhost/recipoint/${recipoint_id}`);
    recipointData.value = data;
    console.log(data);

})

</script>

<template>
    <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div class="grid gap-4 md:gap-8 lg:grid-cols-2">
            <Card>
                <CardHeader class="flex flex-row items-center">
                    <div class="grid gap-2">
                        <CardTitle>{{ recipointData?.addressName }}</CardTitle>
                        <CardDescription>
                            Región: {{ recipointData?.regionName }}
                        </CardDescription>
                        <CardDescription>
                            Comuna: {{ recipointData?.municipalityName }}
                        </CardDescription>
                    </div>
                    <Button as-child size="sm" class="ml-auto gap-1">
                        <RouterLink :to="`/recycle/${recipoint_id}`">
                            Reciclar
                            <ArrowUpRight class="h-4 w-4" />
                        </RouterLink>
                    </Button>
                </CardHeader>
                <CardContent class="grid">
                    <span>Ubicación:(link a google maps con las coordenadas)</span>
                    <span>Total de reciclajes registrados: {{ recipointData?.countRecycles }}</span>
                    <span>material total reciclado (kg): {{ recipointData?.totalQuantity }}</span>
                    <span>Materiales reciclados: grafico con la cantidad cantidad reciclada total por material en un
                        periodo de
                        tiempo</span>
                    <BarChart index="name" :colors="['teal']" :data="recipointData?.allMaterialRecycles"
                        :categories="['totalWeight']" />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Valoraciones</CardTitle>
                </CardHeader>
                <CardContent class="grid justify-items-center gap-8">
                    <RatingDetail :recipoint-id="recipointId" />
                    <Comment :recipoint-id="recipointId" />
                </CardContent>
            </Card>
        </div>
    </main>
</template>