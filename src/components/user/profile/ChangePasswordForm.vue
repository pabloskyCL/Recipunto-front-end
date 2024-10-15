<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/toast';
import { useAuthStore } from '@/stores/auth';
import { toTypedSchema } from '@vee-validate/zod';
import axios from 'axios';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { z } from 'zod';

const BACKENDURL = import.meta.env.VITE_BACKEND_URL
const useAuth = useAuthStore();
const checkPasswordActive = ref(false);
const changePasswordActive = ref(false);

const toggleCheckPassword = () => {
    checkPasswordActive.value = !checkPasswordActive.value;
}

const changePasswordSchema = toTypedSchema(z.object({
    password: z.string(),
    confirm: z.string()
}).refine(data => data.password === data.confirm, {
    message: 'Los campos no coinciden',
    path: ['confirm']
}));

const changePasswordForm = useForm({
    validationSchema: changePasswordSchema
})

const onChangePasswordSubmit = changePasswordForm.handleSubmit(async (values) => {
    try {
        const { data } = await axios.post(`${BACKENDURL}/api/changePassword`, {
            password: values.password
        }, { withCredentials: true });
        useAuth.logout().then(() => {
            toast({
                title: data.message,
                class: 'bg-teal-500'
            })
        })
    } catch (error: any) {

        console.log(error.response.status);
    }
})

const actualPassword = ref<String | number>('');

const checkActualPassword = async () => {
    if (actualPassword.value.toString().length == 0) {
        toast({
            title: 'Tienes que ingresar tu contraseña actual para poder cambiar la contraseña.',
            variant: 'destructive'
        });
        return;
    }

    try {
        await axios.post(`${BACKENDURL}/api/checkActualPassword`, {
            password: actualPassword.value
        }, { withCredentials: true });
        changePasswordActive.value = !changePasswordActive.value;

    } catch (error: any) {
        if (error.response.status == 401) {
            useAuth.logout().then(() => {
                toast({
                    title: 'No haz iniciado sesión para poder cambiar tu contraseña tienes que haber iniciado sesión',
                    variant: 'destructive'
                })
            })
        }


        toast({
            title: 'La contraseña ingresada no es valida, intente nuevamente',
            variant: 'destructive'
        })
    }
}

</script>
<template>
    <div>
        <Button v-if="!checkPasswordActive" class="bg-red-600 w-full" type="button"
            @click="toggleCheckPassword()">Cambiar
            Contraseña</Button>

        <div class="grid grid-cols-3 gap-3" v-if="checkPasswordActive && !changePasswordActive">
            <Label for="actualpass">Primero valida tu contraseña actual</Label>
            <Input id="actualpass" @update:model-value="(value) => { actualPassword = value }" type="password"
                placeholder="contraseña actual" />
            <Button type="button" @click="checkActualPassword()">validar</Button>
        </div>
        <form id="changePasswordForm" class="grid gap-4" :schema="changePasswordSchema" @submit="onChangePasswordSubmit"
            v-if="changePasswordActive">
            <FormField v-slot="{ componentField }" name="password">
                <FormItem>
                    <FormLabel>Ingresa la nueva Contraseña</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Nueva contraseña" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="confirm">
                <FormItem>
                    <FormControl>
                        <Input type="text" placeholder="Repetir Contraseña nueva" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <Button :variant="'destructive'" form="changePasswordForm" type="submit">Cambiar
                Contraseña</Button>
        </form>
    </div>
</template>