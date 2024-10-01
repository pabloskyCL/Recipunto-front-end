<script setup lang="ts">
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { Select, SelectContent, SelectTrigger, SelectItem, SelectValue, SelectGroup } from '../ui/select';
import { Input } from '../ui/input';
import { Material } from './Recycle.vue';
import { onBeforeMount, ref } from 'vue';
import axios from 'axios';

let materials = ref<Material[]>([]);

onBeforeMount(async () => {
    const { data } = await axios.get('http://localhost/materials');
    materials.value = data;
})

</script>
<template>
    <FormField v-slot="{ componentField }" name="material">
        <FormItem class="w-1/3">
            <FormLabel>Material</FormLabel>
            <Select v-bind="componentField">
                <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecciona un material" />
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    <SelectGroup v-if="materials.length > 0">
                        <SelectItem v-for="(material, index) in materials" :key="index" :value="String(material.id)">
                            {{ material.name }}
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <FormMessage />
        </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="weight">
        <FormItem class="w-1/3">
            <FormLabel>Peso</FormLabel>
            <FormControl>
                <Input type="number" v-bind="componentField" />
            </FormControl>
            <FormMessage />
        </FormItem>
    </FormField>


</template>