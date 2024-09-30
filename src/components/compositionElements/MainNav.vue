<script setup lang="ts">
import { cn } from '@/lib/utils'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuGroup,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuContent
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { MapPin, Recycle, Leaf, ArrowBigDownDash, ListChecksIcon } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const router = useRouter();

</script>

<template>
    <nav :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')">
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="outline">
                    <ArrowBigDownDash class="mr-2 h-4 w-4" />
                    Recipuntos
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-56">
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem @click="() => { router.push('/recipoints') }">
                        <MapPin class="mr-2 h-4 w-4" />
                        <span>Buscar Recipuntos mas cercano</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <ListChecksIcon class="mr-2 h-4 w-4" />
                        <span>Valorar Recipunto</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
        <RouterLink to="/recycle"
            class="flex text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            <Recycle class="mr-2 h-4 w-4" />
            <span>reciclar</span>
        </RouterLink>
        <RouterLink to="/" class="flex text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            <Leaf class="mr-2 h-4 w-4" />
            <span>Mi reciclaje</span>
        </RouterLink>
        <RouterLink to="/" class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Nosotros
        </RouterLink>
    </nav>


</template>