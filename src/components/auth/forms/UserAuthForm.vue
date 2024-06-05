<script setup lang="ts">
import { ref } from 'vue'
import { MailIcon } from 'lucide-vue-next'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoaderCircleIcon } from 'lucide-vue-next';

const isLoading = ref(false)
async function onSubmit(event: Event) {
    event.preventDefault()
    isLoading.value = true

    setTimeout(() => {
        isLoading.value = false
    }, 3000)
}
</script>

<template>
    <div :class="cn('grid gap-6', $attrs.class ?? '')">
        <form @submit="onSubmit">
            <div class="grid gap-2">
                <div class="grid gap-3">
                    <Label class="sr-only" for="email">
                        Email
                    </Label>
                    <Input id="email" placeholder="name@example.com" type="email" auto-capitalize="none"
                        auto-complete="email" auto-correct="off" :disabled="isLoading" />
                    <Label class="sr-only" for="password">
                        <MailIcon class="mr-2 h-4 w-4" />
                        Contraseña
                    </Label>
                    <Input id="password" placeholder="Contraseña" type="password" auto-capitalize="none"
                        auto-complete="password" auto-correct="off" :disabled="isLoading" />
                    <p class="text-sm text-muted-foreground place-self-center my-2">
                        aun no tienes cuenta?. <router-link to="/register"
                            class="underline underline-offset-4 hover:text-primary">registraté</router-link>
                    </p>
                </div>

                <Button :disabled="isLoading">
                    <LoaderCircleIcon v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                    Iniciar Sesión
                </Button>
            </div>
        </form>


    </div>
</template>