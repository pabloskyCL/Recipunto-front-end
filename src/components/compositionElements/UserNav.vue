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
    DropdownMenuShortcut
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
</script>

<template>
    <DropdownMenu>
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
                        nombre y apellido
                    </p>
                    <p class="text-xs leading-none text-muted-foreground">
                        correo@test.cl
                    </p>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    Mi perfil
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Cuenta
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                Cerrar sesión
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>