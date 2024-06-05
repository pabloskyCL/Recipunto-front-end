<script setup lang="ts">
import { ref } from 'vue'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoaderCircleIcon } from 'lucide-vue-next';
import { RouterLink } from 'vue-router'
import DatePicker from '@/components/compositionElements/formElements/DatePicker.vue'

const isLoading = ref(false)
const birthday = ref();

async function onSubmit(event: Event) {
    event.preventDefault()


    isLoading.value = true
    if (birthday.value) {
        console.log(birthday.value.date);
    }
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
                    <Label class="sr-only" for="first-name">
                        Nombre
                    </Label>
                    <Input id="first-name" placeholder="nombre" type="text" auto-capitalize="none" auto-complete="off"
                        auto-correct="off" :disabled="isLoading" />
                    <Label class="sr-only" for="last-name">
                        Apellido
                    </Label>
                    <Input id="last-name" placeholder="apellido" type="text" auto-capitalize="none" auto-complete="off"
                        auto-correct="off" :disabled="isLoading" />
                    <DatePicker ref="birthday" placeholder="fecha de nacimiento" />
                    <Label class="sr-only" for="email">
                        Email
                    </Label>
                    <Input id="email" placeholder="Email" type="email" auto-capitalize="none" auto-complete="email"
                        auto-correct="off" :disabled="isLoading" />
                    <Label class="sr-only" for="address">
                        Dirección
                    </Label>
                    <Input id="address" placeholder="dirección" type="text" auto-capitalize="none" auto-complete="off"
                        auto-correct="off" :disabled="isLoading" />
                    <Label class="sr-only" for="postal-code">
                        Codigo postal
                    </Label>
                    <Input id="postal-code" placeholder="Codigo Postal" type="text" auto-capitalize="none"
                        auto-complete="off" auto-correct="off" :disabled="isLoading" />
                    <p class="text-sm text-muted-foreground place-self-center my-2">
                        ya tienes cuenta?, <RouterLink to="/login"
                            class="underline underline-offset-4 hover:text-primary">inicia sesión</RouterLink>
                    </p>
                </div>

                <Button :disabled="isLoading">
                    <LoaderCircleIcon v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                    Registrarse
                </Button>
            </div>
        </form>


    </div>
</template>