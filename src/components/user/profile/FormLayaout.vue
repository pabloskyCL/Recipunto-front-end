<script setup lang="ts">
import { Separator } from '@/components/ui/separator';
</script>

<template>
    <div class="space-y-6 p-10 pb-16 ">
        <div class="flex flex-col space-y-0.5 items-center">
            <h2 class="text-2xl font-bold tracking-tight">
                Tu Cuenta
            </h2>
            <p class="text-muted-foreground">
                Puedes cambiar la información de tu cuenta como el email, tu dirección, etc.
            </p>
        </div>
        <Separator class="my-6" />
        <div class="flex flex-col space-y-8 lg:flex-row justify-center lg:space-x-12 lg:space-y-0">
            <div class="flex-1 lg:max-w-2xl">
                <div class="space-y-6">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>