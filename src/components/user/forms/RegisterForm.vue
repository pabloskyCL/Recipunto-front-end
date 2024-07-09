<script setup lang="ts">
import { computed, ref } from 'vue'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'vee-validate'
import { CalendarIcon, LoaderCircleIcon } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import DatePicker from '@/components/compositionElements/formElements/DatePicker.vue'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useAuthStore } from '@/stores/auth'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/v-calendar'

const { register, error } = useAuthStore();
const isLoading = ref(false)
const today = new Date();

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
    birthday: z.date({
        required_error: 'falta el campo fecha de nacimiento',
        invalid_type_error: 'seleccione una fecha'
    }),
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

const { handleSubmit } = useForm({
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
    <div :class="cn('grid gap-6')">
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
                    <FormField v-slot="{ componentField, value, setValue }" name="birthday">
                        <FormItem>
                            <FormControl>
                                <Popover>
                                    <PopoverTrigger as-child>

                                        <Button :variant="'outline'" :class="cn(
                                            'w-[280px] justify-start text-left font-normal',
                                            !componentField.modelValue && 'text-muted-foreground',
                                        )">
                                            <CalendarIcon class="mr-2 h-4 w-4" />
                                            <span>{{ value ? format(value, "dd/MM/yyyy") : "fecha de nacimiento"
                                                }}</span>
                                        </Button>

                                    </PopoverTrigger>
                                    <PopoverContent class="w-auto p-0">
                                        <Calendar :model-value="componentField.modelValue"
                                            @update:model-value="setValue" />
                                    </PopoverContent>
                                </Popover>
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