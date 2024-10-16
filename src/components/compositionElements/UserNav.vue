<script setup lang="ts">
import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from '../ui/avatar';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuItem,
} from '../ui/dropdown-menu';
import { Button, buttonVariants } from '../ui/button';
import { useAuthStore } from '@/stores/auth';
import { cn } from '@/lib/utils';

const authStore = useAuthStore();
console.log(authStore.user);

</script>

<template>
    <DropdownMenu v-if="authStore.user">
        <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="relative h-10 w-10 rounded-full">
                <Avatar class="h-10 w-10">
                    <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                    <AvatarFallback>SC</AvatarFallback>
                </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56" align="end">
            <DropdownMenuLabel class="font-normal flex">
                <div class="flex flex-col space-y-1">
                    <p class="text-sm font-medium leading-none">
                        {{ authStore.user.first_name }}
                    </p>
                    <p class="text-xs leading-none text-muted-foreground">
                        {{ authStore.user.email }}
                    </p>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <router-link to="/profile">Mi perfil</router-link>
                </DropdownMenuItem>
                <!-- <DropdownMenuItem>
                    Cuenta
                </DropdownMenuItem>-->
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="authStore.logout()">
                Cerrar sesión
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    <router-link to="/login" :class="cn(
        buttonVariants({ variant: 'default' }),
    )" v-show="!authStore.user">
        Iniciar sesión
    </router-link>
</template>