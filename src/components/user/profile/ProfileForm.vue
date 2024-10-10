<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast, Toaster } from '@/components/ui/toast'
import { FormField, FormLabel, FormItem, FormControl, FormDescription, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter();
const useAuth = useAuthStore();
let userData = ref<{
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    postalCode: string | undefined
}>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    postalCode: ''
});

const profileFormSchema = toTypedSchema(z.object({
    firstName: z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }).max(30, {
        message: 'Username must not be longer than 30 characters.',
    }),
    lastName: z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }).max(30, {
        message: 'Username must not be longer than 30 characters.',
    }),
    email: z.string({ required_error: 'Please select an email to display.' }).email(),
    address: z.string().max(160, { message: 'la dirección no puede tener mas de 160 caracteres.' }).min(4, { message: 'la dirección debe tener almenos 2 caracters' }),
    postalCode: z.string({
        invalid_type_error: 'Se espera un numero, no se puede ingresar caracteres en el codigo postal'
    }).max(7, { message: 'el codigo postal tiene que tener 7 digitos' }).nullable().optional(),
}));

const { handleSubmit, setValues } = useForm({
    validationSchema: profileFormSchema,
})

onMounted(async () => {
    try {
        const { data } = await axios.get('http://localhost/api/currentUser', { withCredentials: true })
        userData.value = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            address: data.address,
            postalCode: data.postalCode
        };
        setValues(userData.value);

    } catch (error: any) {
        if (error.response.status == 401) {
            router.push('/').then(() => {
                toast({
                    title: 'debes iniciar sesión para ingresar aquí',
                    variant: 'destructive'
                })
            })
        }
    }
});

const onSubmit = handleSubmit(async (values) => {
    try {
        await axios.post('http://localhost/api/updateUser', values, { withCredentials: true })
        toast({
            title: 'Información actualizada con exito',
            class: 'bg-teal-500'
        })

    } catch (error: any) {
        if (error.response.status === 401) {
            useAuth.logout().then(() => {
                toast({
                    title: 'debes iniciar sesión para actualizar tu información',
                    variant: 'destructive'
                })
            })
        }
    }

})
</script>

<template>
    <div>
        <form class="space-y-8" @submit="onSubmit">
            <div class="grid grid-cols-2 gap-5">
                <FormField v-slot="{ componentField }" name="firstName">
                    <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Nombre" :default-value="userData.firstName"
                                v-bind="componentField" />
                        </FormControl>
                        <FormDescription>

                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="lastName">
                    <FormItem>
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Nombre" v-bind="componentField" />
                        </FormControl>
                        <FormDescription>

                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                </FormField>
            </div>

            <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Email" v-bind="componentField" />
                    </FormControl>
                    <FormDescription>

                    </FormDescription>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="address">
                <FormItem>
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                        <Textarea placeholder="ej: jose joaquin perez 1514, san ramon" v-bind="componentField" />
                    </FormControl>
                    <FormDescription>
                        Dirección: calle numero, comuna, region, codigo postal
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="postalCode">
                <FormItem>
                    <FormLabel>Codigo Postal</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Codigo Postal" v-bind="componentField" />
                    </FormControl>
                    <FormDescription>
                        Si no sabes tu codigo postal puedes consultarlo <a class="text-blue-700 underline"
                            target="_blank" rel="noopener noreferrer"
                            href="https://www.correos.cl/codigo-postal">Aqui</a>
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            </FormField>


            <div class="flex gap-2 w-full">
                <Button class="w-full hover:bg-green-600" type="submit"> Actualizar </Button>
            </div>
        </form>

        <Toaster />
    </div>
</template>