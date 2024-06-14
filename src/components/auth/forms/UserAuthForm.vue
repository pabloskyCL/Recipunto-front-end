<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoaderCircleIcon } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/auth'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { FormField } from '@/components/ui/form'
import FormItem from '@/components/ui/form/FormItem.vue'
import FormControl from '@/components/ui/form/FormControl.vue'
import FormMessage from '@/components/ui/form/FormMessage.vue'

const isLoading = ref(false)
const { login } = useAuthStore();

const formSchema = toTypedSchema(z.object({
    username: z.string({
        required_error: "Debe ingresar email para iniciar sesión"
    }).email(),
    password: z.string({
        required_error: "Debe ingresar contraseña para iniciar sesión"
    })
}))

const { handleSubmit } = useForm({
    validationSchema: formSchema
})


const onSubmit = handleSubmit(async (values) => {

    isLoading.value = true
    await login(values);
    isLoading.value = false
})
</script>

<template>
    <div :class="cn('grid gap-6', $attrs.class ?? '')">
        <form @submit.prevent="onSubmit">
            <div class="grid gap-2">
                <div class="grid gap-3">
                    <FormField v-slot="{ componentField }" name="username">
                        <FormItem>
                            <FormControl>
                                <Input v-bind="componentField" placeholder="email" type="email" auto-capitalize="none"
                                    auto-complete="off" auto-correct="off" :disabled="isLoading" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="password">
                        <FormItem>
                            <FormControl>
                                <Input v-bind="componentField" placeholder="contraseña" type="password"
                                    auto-capitalize="none" auto-complete="off" auto-correct="off"
                                    :disabled="isLoading" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
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