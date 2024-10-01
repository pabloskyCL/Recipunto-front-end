<script setup lang="ts">
import { ref } from 'vue';
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const ratingStars = ref([
    {
        status: false,
    },
    {
        status: false
    },
    {
        status: false
    },
    {
        status: false
    },
    {
        status: false
    }
])

function handleRating(rating: number, setValue: Function) {
    setValue(rating + 1)
    ratingStars.value.forEach((value, index) => {
        if (index <= rating) {
            value.status = true
        } else {
            value.status = false
        }
    })
}
</script>
<template>
    <FormField v-slot="{ componentField, setValue }" name="rating">
        <span>Valoración:</span>
        <div class="flex gap-0.5">
            <svg v-for="(star, index) in ratingStars"
                :class="['h-8 w-8 shrink-0', star.status ? 'fill-amber-400' : 'fill-gray-300']"
                @click="handleRating(index, setValue)" viewBox="0 0 256 256">
                <path
                    d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z">
                </path>
            </svg>
        </div>
        <FormItem class="hidden">
            <FormControl>
                <Input type="number" v-bind="componentField" />
            </FormControl>
            <FormMessage />
        </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="comment">
        <FormItem class="w-1/3">
            <FormLabel>Comentario (opcional)</FormLabel>
            <FormControl>
                <Textarea placeholder="comentanos el estado i/o sugerencia que tengas del punto limpio"
                    class="resize-none" v-bind="componentField" />
            </FormControl>
            <FormMessage />
        </FormItem>
    </FormField>

</template>