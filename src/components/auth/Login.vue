<script setup lang="ts">
import UserAuthForm from './forms/UserAuthForm.vue'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Toaster } from '../ui/toast';
</script>

<template>

    <div
        class="container relative hidden h-screen flex-col items-center bg-green-50 justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <router-link to="/register" :class="cn(
            buttonVariants({ variant: 'default' }),
            'absolute right-4 top-4 md:right-8 md:top-8',
        )">
            Registrate
        </router-link>
        <div class="relative hidden h-full flex-col bg-muted p-10 text-black dark:border-r lg:flex">
            <div class="absolute inset-0 bg-[url('@/assets/recipuntoLogin.jpg')] bg-no-repeat bg-cover bg-bottom" />
            <div class="relative z-20 flex items-center text-xl font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="mr-2 h-8 w-8">
                    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                </svg>
                <router-link to="/">
                    Recipunto
                </router-link>
            </div>
            <div class="relative z-20 mt-auto">
                <blockquote class="space-y-2">
                    <p class="text-3xl text-white">
                        &ldquo;Bienvenido vamos a aportar con nuestro granito de arena con el medio ambiente.&rdquo;
                    </p>
                    <footer class="text-sm">
                        Equipo de recipunto
                    </footer>
                </blockquote>
            </div>
        </div>
        <div class="lg:p-8">
            <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div class="flex flex-col space-y-2 text-center">
                    <h1 class="text-2xl font-semibold tracking-tight">
                        Iniciar Sesión
                    </h1>
                    <p class="text-sm text-muted-foreground">
                        Ingresa tu usuario y contraseña
                    </p>
                </div>
                <UserAuthForm />
                <p class="px-8 text-center text-sm text-muted-foreground">
                    By clicking continue, you agree to our
                    <a href="/terms" class="underline underline-offset-4 hover:text-primary">
                        Terms of Service
                    </a>
                    and
                    <a href="/privacy" class="underline underline-offset-4 hover:text-primary">
                        Privacy Policy
                    </a>
                    .
                </p>
            </div>
        </div>
    </div>
    <Toaster />
</template>