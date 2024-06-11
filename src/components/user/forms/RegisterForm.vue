<script setup lang="ts">
import { computed, ref } from 'vue'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'vee-validate'
import { LoaderCircleIcon } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import DatePicker from '@/components/compositionElements/formElements/DatePicker.vue'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useAuthStore } from '@/stores/auth'

const { register, error } = useAuthStore();
const isLoading = ref(false)

const formSchema = toTypedSchema(z.object({
    firstName: z.string({
        required_error: "falta el campo nombre",

    }).min(2, {
        message: 'nombre debe tener 2 o mas caracteres'
    }).max(50, {
        message: 'nombre no debe execeder los 50 caracteres'
    }),
    lastName: z.string({
        required_error: 'falta el campo apellido'
    }).min(2, { message: 'apellido debe tener 2 o mas caracteres' }).max(50, { message: 'apellido debe tener 2 o mas caracteres' }),
    birthday: z.string({
        required_error: 'falta ingresar la fecha de nacimiento'
    }).date(),
    email: z.string({
        required_error: 'falta el campo email'
    }).email({ message: 'email ingresado invalido' }),
    password: z.string({
        required_error: 'no haz ingresado una contraseña'
    }).min(8),
    address: z.string({
        required_error: 'falta el campo dirección'
    }),
    postalCode: z.optional(z.string()),
}))

const { handleSubmit, setFieldValue } = useForm({
    validationSchema: formSchema
})

const onSubmit = handleSubmit(async (values) => {
    isLoading.value = true;

    const response = await register(values);
    console.log(response);

    isLoading.value = false;

})
</script>

<template>
    <div :class="cn('grid gap-6', $attrs.class ?? '')">
        <form @submit.prevent="onSubmit">
            <div class="grid gap-2">
                <div class="grid gap-3">
                    <FormField v-slot="{ componentField }" name="firstName">
                        <FormItem>
                            <FormControl>
                                <Input id="first-name" v-bind="componentField" placeholder="nombre" type="text"
                                    auto-capitalize="none" auto-complete="off" auto-correct="off"
                                    :disabled="isLoading" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="lastName">
                        <FormItem>
                            <FormControl>
                                <Input v-bind="componentField" placeholder="Apellido" type="text" auto-capitalize="none"
                                    auto-complete="off" auto-correct="off" :disabled="isLoading" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField, value }" name="birthday">
                        <FormItem>
                            <FormControl>
                                <DatePicker :set-field-value="setFieldValue" :value="componentField"
                                    placeholder="fecha de nacimiento" :is-loading="isLoading" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    </FormField>
                    <FormField v-slot="{ componentField }" name="email">
                        <FormItem>
                            <FormControl>
                                <Input v-bind="componentField" placeholder="Email" type="email" auto-capitalize="none"
                                    auto-complete="email" auto-correct="off" :disabled="isLoading" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="password">
                        <FormItem>
                            <FormControl>
                                <Input v-bind="componentField" placeholder="password" type="password"
                                    auto-capitalize="none" auto-complete="password" auto-correct="off"
                                    :disabled="isLoading" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="address">
                        <FormItem>
                            <FormControl>
                                <Input v-bind="componentField" placeholder="dirección" type="text"
                                    auto-capitalize="none" auto-complete="off" auto-correct="off"
                                    :disabled="isLoading" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="postalCode">
                        <FormItem>
                            <FormControl>
                                <Input v-bind="componentField" placeholder="codigo postal" type="text"
                                    auto-capitalize="none" auto-complete="off" auto-correct="off"
                                    :disabled="isLoading" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <p class="text-sm text-muted-foreground place-self-center my-2">
                        ya tienes cuenta?, <RouterLink to="/login"
                            class="underline underline-offset-4 hover:text-primary">inicia sesión</RouterLink>
                    </p>
                </div>

                <Button type="submit" :disabled="isLoading">
                    <LoaderCircleIcon v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                    Registrarse
                </Button>
            </div>
        </form>


    </div>
</template>