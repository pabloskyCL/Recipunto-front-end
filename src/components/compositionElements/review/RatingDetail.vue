<script setup lang="ts">
import { Progress } from '@/components/ui/progress';
import Staricon from '@/components/compositionElements/icons/staricon.vue';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
</script>
<template>
    <Card class="w-full max-w-md grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <CardHeader class="items-center space-y-0 gap-4">
            <div class="flex flex-col items-center justify-center gap-4">
                <div class="grid grid-cols-2 gap-1 items-center">
                    <div class="text-4xl font-bold">3.2</div>
                    <span class="text-sm text-muted-foreground">de 5</span>
                </div>
                <div class="bg-muted px-3 rounded-full flex items-center py-2">
                    <Staricon class="w-6 h-6 fill-primary" />
                    <Staricon class="w-6 h-6 fill-primary" />
                    <Staricon class="w-6 h-6 fill-primary" />
                    <Staricon class="w-6 h-6 fill-muted stroke-muted-foreground" />
                    <Staricon class="w-6 h-6 fill-muted stroke-muted-foreground" />
                </div>
            </div>
        </CardHeader>
        <CardContent class="p-0 grid gap-4">
            <div class="flex items-center gap-4 text-sm">
                <div class="flex gap-2 items-center">
                    5
                    <Staricon class="w-4 h-4 shrink-0 fill-primary" />
                </div>
                <Progress :model-value=25 class="flex-1" /> 25%
            </div>
            <div class="flex items-center gap-4 text-sm">
                <div class="flex gap-2 items-center">
                    4
                    <Staricon class="w-4 h-4 shrink-0 fill-primary" />
                </div>
                <Progress :model-:model-value=33 class="flex-1" /> 33%
            </div>
            <div class="flex items-center gap-4 text-sm">
                <div class="flex gap-2 items-center">
                    3
                    <Staricon class="w-4 h-4 shrink-0 fill-primary" />
                </div>
                <Progress :model-value=22 class="flex-1" /> 22%
            </div>
            <div class="flex items-center gap-4 text-sm">
                <div class="flex gap-2 items-center">
                    2
                    <Staricon class="w-4 h-4 shrink-0 fill-primary" />
                </div>
                <Progress :model-value=13 class="flex-1" /> 13%
            </div>
            <div class="flex items-center gap-4 text-sm">
                <div class="flex gap-2 items-center">
                    1
                    <Staricon class="w-4 h-4 shrink-0 fill-primary" />
                </div>
                <Progress :model-value=7 class="flex-1" /> 7%
            </div>
        </CardContent>
    </Card>
</template>