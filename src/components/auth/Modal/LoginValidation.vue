<script setup lang="ts">
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

</script>
<template>

    <AlertDialog :default-open="true">
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Tienes cuenta Recipunto?</AlertDialogTitle>
                <AlertDialogDescription class="text-lg">
                    Si no tienes cuenta pudes crear una <router-link class="text-blue-800 underline font-bold"
                        to="/register">Aquí</router-link>, así puedes
                    mantener un registro de tu reciclaje,
                    valorar un recipunto y dejar un comentario a tu nombre, de esta forma podemos validar un registro
                    por cada valoración o comentario realizado,
                    y generar un feedback valido del estado de los recipuntos. También si no deseas registrarte siempre
                    puedes dejar un feedback de forma anonima.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Continuar Anonimo</AlertDialogCancel>
                <AlertDialogAction><router-link to="/login">Login</router-link></AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

</template>