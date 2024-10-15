<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RecentsRecyclePointList from './RecentsRecyclePointList.vue';
import TotalMaterialCard from './TotalMaterialCard.vue';
import TotalSavedCo2Card from './TotalSavedCo2Card.vue';
import TotalRecycleByMonth from './TotaRecycleByMonth.vue';
import { onBeforeMount, ref } from 'vue';
import axios from 'axios';
import { toast, Toaster } from '@/components/ui/toast';
import { useRouter } from 'vue-router';

const BACKENDURL = import.meta.env.VITE_BACKEND_URL

const myRecycle = ref<{
    totalSavedCo2: Array<{
        material: string,
        totalSavedCo2: number
    }>,
    recentsrecipoints: Array<{
        address_name: string,
        municipality: string,
        region: string
    }>,
    totalRecycleByMaterial: Array<{
        totalWeight: number,
        name: string
    }>,
    totalRecycle: Array<{
        month: number,
        totalQuantity: number
    }>
}>({
    totalSavedCo2: [],
    recentsrecipoints: [],
    totalRecycleByMaterial: [],
    totalRecycle: []
});
const router = useRouter();

onBeforeMount(async () => {
    try {
        const { data } = await axios.get(`${BACKENDURL}/api/userRecycleData`, {
            withCredentials: true,
        });
        myRecycle.value = data;
    } catch (error: any) {

        if (error.response.status == 401) {
            toast({
                description: 'No haz iniciado sesión para revisar los datos de tu reciclaje'
            })
            router.push('/');
        }


    }

});

</script>

<template>
    <Card class="m-10">
        <CardHeader class="flex flex-row items-center">
            <div class="grid gap-2">
                <CardTitle>My Reciclaje</CardTitle>
                <CardDescription>
                    Acá encontraras datos reclacionados a tus reciclajes hechos durante el año, materiales reciclados y
                    puntos limpios visitados ultimamente
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
        <CardContent>
            <div class="grid lg:grid-cols-2">
                <TotalSavedCo2Card :total-saved-co2-card="myRecycle.totalSavedCo2" />
                <RecentsRecyclePointList :recipoints="myRecycle.recentsrecipoints" />
            </div>
            <div class="grid lg:grid-cols-2">
                <TotalMaterialCard :total-materials="myRecycle.totalRecycleByMaterial" />
                <TotalRecycleByMonth :total-recycle="myRecycle.totalRecycle" />
            </div>
        </CardContent>
        <Toaster />
    </Card>
</template>
