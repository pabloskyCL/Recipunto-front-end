<script setup lang="ts">
import { Progress } from '@/components/ui/progress';
import Staricon from '@/components/compositionElements/icons/staricon.vue';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { computed, onBeforeMount, ref } from 'vue';
import axios from 'axios';

let props = defineProps<{
    recipointId: Number | undefined
}>();

const BACKENDURL = import.meta.env.VITE_BACKEND_URL

interface RecipointRatingInfo {
    overallRating: string,
    stars: { stars: number, total: number }[],
    countRating: number
}

const recipointRatingResponse = ref<RecipointRatingInfo>();

onBeforeMount(async () => {
    if (props.recipointId) {
        const { data } = await axios.get(`${BACKENDURL}/recipoint/rating/${props.recipointId}`)
        recipointRatingResponse.value = data;
        console.log(recipointRatingResponse);
    }
})

const overallRatingFloor = computed(() => {
    if (recipointRatingResponse.value?.overallRating) {
        return Math.floor(Number(recipointRatingResponse.value?.overallRating));
    }

    return 0;

});

const starRatingProcentaje = (rating?: number) => {
    if (recipointRatingResponse.value?.countRating && rating) {
        return Number(((100 * rating) / recipointRatingResponse.value?.countRating).toFixed(1));
    }
    return 0;
}


</script>
<template>
    <Card class="w-full max-w-md grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <CardHeader class="items-center space-y-0 gap-4">
            <div class="flex flex-col items-center justify-center gap-4">
                <div class="grid grid-cols-2 gap-1 items-center">
                    <div class="text-4xl font-bold">{{ Number(recipointRatingResponse?.overallRating).toFixed(1) }}
                    </div>
                    <span class="text-sm text-muted-foreground">de 5</span>
                </div>
                <div class="bg-muted px-3 rounded-full flex items-center py-2">
                    <Staricon v-for="index in overallRatingFloor" :key="index" class="w-6 h-6 fill-primary" />
                    <Staricon v-for="mutedIndex in 5 - overallRatingFloor" :key="mutedIndex"
                        class="w-6 h-6 fill-muted stroke-muted-foreground" />
                </div>
            </div>
        </CardHeader>
        <CardContent class="p-0 grid gap-4">
            <div class="flex items-center gap-4 text-sm">
                <div class="flex gap-2 items-center">
                    5
                    <Staricon class="w-4 h-4 shrink-0 fill-primary" />
                </div>
                <Progress :model-value=starRatingProcentaje(recipointRatingResponse?.stars[5]?.total) class="flex-1" />
                {{ recipointRatingResponse?.stars['5']?.total ?? 0 }}
            </div>
            <div class="flex items-center gap-4 text-sm">
                <div class="flex gap-2 items-center">
                    4
                    <Staricon class="w-4 h-4 shrink-0 fill-primary" />
                </div>
                <Progress :model-value=starRatingProcentaje(recipointRatingResponse?.stars[4]?.total) class="flex-1" />
                {{ recipointRatingResponse?.stars['4']?.total ?? 0
                }}
            </div>
            <div class="flex items-center gap-4 text-sm">
                <div class="flex gap-2 items-center">
                    3
                    <Staricon class="w-4 h-4 shrink-0 fill-primary" />
                </div>
                <Progress :model-value=starRatingProcentaje(recipointRatingResponse?.stars[3]?.total) class="flex-1" />
                {{ recipointRatingResponse?.stars['3']?.total ?? 0 }}
            </div>
            <div class="flex items-center gap-4 text-sm">
                <div class="flex gap-2 items-center">
                    2
                    <Staricon class="w-4 h-4 shrink-0 fill-primary" />
                </div>
                <Progress :model-value=starRatingProcentaje(recipointRatingResponse?.stars[2]?.total) class="flex-1" />
                {{ recipointRatingResponse?.stars['2']?.total ?? 0 }}
            </div>
            <div class="flex items-center gap-4 text-sm">
                <div class="flex gap-2 items-center">
                    1
                    <Staricon class="w-4 h-4 shrink-0 fill-primary" />
                </div>
                <Progress :model-value=starRatingProcentaje(recipointRatingResponse?.stars[1]?.total) class="flex-1" />
                {{ recipointRatingResponse?.stars['1']?.total ?? 0 }}
            </div>
        </CardContent>
    </Card>
</template>