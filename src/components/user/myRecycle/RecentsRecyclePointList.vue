<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const props = defineProps<{ recipoints: any }>()

</script>

<template>
    <Card class="m-5">
        <CardHeader class="flex flex-row items-center">
            <div class="grid gap-2">
                <CardTitle>Recipuntos recientes</CardTitle>
                <CardDescription>
                    Listado de los ultimos recipuntos donde haz reciclado en el ultimo año.
                </CardDescription>
            </div>
            <!-- TODO: puede sea interesante hacer un boton para compartir una captura de pantalla de tu reciclaje o un compartir pero
            si es un compartir se tendria que repensar el acceso esta pagina ya que seria publica. 
            <Button as-child size="sm" class="ml-auto gap-1">
                <RouterLink :to="`/recycle/${recipoint_id}`">
                    Reciclar
                    <ArrowUpRight class="h-4 w-4" />
                </RouterLink>
            </Button>
            -->
        </CardHeader>
        <CardContent class="grid gap-5">
            <div v-for="recipoint in props.recipoints" class="flex items-center">
                <Avatar class="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div class="ml-4 space-y-1">
                    <p class="text-sm font-medium leading-none">
                        {{ recipoint.address_name }}
                    </p>
                    <p class="text-sm text-muted-foreground">
                        Comuna: {{ recipoint.municipality }}
                    </p>
                    <p class="text-sm text-muted-foreground">
                        Región: {{ recipoint.region }}
                    </p>
                </div>
                <div class="ml-auto font-medium">
                    <Button><router-link :to="`/recycle/${recipoint.id}`">Reciclar</router-link></Button>
                </div>
            </div>
        </CardContent>
    </Card>
</template>