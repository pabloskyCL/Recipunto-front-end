<script setup lang="ts">
import { Check, Circle, Dot } from 'lucide-vue-next'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { computed, onMounted, ref } from 'vue'
import { get, set } from '@vueuse/core'
import { Stepper, StepperDescription, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '@/components/ui/stepper'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'
import SearchRecipointRecycle from './SearchRecipointRecycle.vue'
import { Textarea } from '../ui/textarea'
import { Toaster } from '../ui/toast';
import axios from 'axios'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface Material {
    id: number,
    name: string
}


let materials = ref<Material[]>([]);

onMounted(async () => {
    const { data } = await axios.get('http://localhost/materials');
    materials.value = data;
});

const formSchema = [
    z.object({
        material: z.string(),
        weight: z.number(),
    }),
    z.object({
        recipoint_id: z.string()
    }),
    z.object({
        rating: z.number(),
        comment: z.string()
    }),
]

const stepIndex = ref(1)
const steps = [
    {
        step: 1,
        title: 'Datos del Reciclaje',
        description: 'ingresar material y peso de lo que reciclas',
    },
    {
        step: 2,
        title: 'selecciona un punto limpio',
        description: 'selecciona donde reciclaras y registra el reciclaje',
    },
    {
        step: 3,
        title: 'Reseña el Recipunto',
        description: 'Dejanos tu opinión del estado de este punto limpio',
    },
]


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

const canGoNext = computed(() => stepIndex.value < steps.length)
const canGoBack = computed(() => stepIndex.value > 1)
function goNext() {
    if (get(canGoNext)) {
        set(stepIndex, stepIndex.value + 1)
    }
}
function goBack() {
    if (get(canGoBack)) {
        set(stepIndex, stepIndex.value - 1)
    }
}

async function onSubmit(values: any) {
    console.log(values);
    const recycleValues = {
        material: parseInt(values.material),
        recipoint_id: parseInt(values.recipoint_id),
        weight: parseFloat(values.weight)
    }

    const reviewRecipointValues = {
        recipoint_id: parseInt(values.recipoint_id),
        stars: parseInt(values.rating),

    }
    const commentRecipointValues = {
        recipoint_id: parseInt(values.recipoint_id),
        review_id: null,
        content: values.comment,

    }

    const response = await axios.post('http://localhost/recycle', recycleValues, {
        withCredentials: true
    }).then(() => {
        return axios.post('http://localhost/review', reviewRecipointValues, {
            withCredentials: true
        })
    }).then((reviewRes) => {
        commentRecipointValues.review_id = reviewRes.data.review_id;
        return axios.post('http://localhost/comment', commentRecipointValues, {
            withCredentials: true
        })
    }).catch((error) => {
        toast({
            title: 'ha ocurrido un error',
            description: error.response.data.detail,
            variant: 'destructive'
        })
    });


    if (response) {
        toast({
            title: 'Reciclaje registrado con exito!',
            class: 'bg-teal-500'
        })
    }
}

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
    <Form v-slot="{ meta, values, validate }" as="" keep-values
        :validation-schema="toTypedSchema(formSchema[stepIndex - 1])">
        <form @submit="(e) => {
            e.preventDefault()
            validate()

            if (stepIndex === 3) {
                onSubmit(values)
            }
        }" class="my-20">
            <Stepper v-model="stepIndex" class="flex w-full mt-5 items-start gap-2">
                <StepperItem v-for="step in steps" :key="step.step" v-slot="{ state }"
                    class="relative flex w-full flex-col items-center justify-center" :step="step.step">
                    <StepperSeparator v-if="step.step !== steps[steps.length - 1].step"
                        class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-green-600" />

                    <StepperTrigger as-child>
                        <Button :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
                            size="icon" class="z-10 rounded-full shrink-0"
                            :class="[state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background']"
                            :disabled="state !== 'completed' && !meta.valid">
                            <Check color="#16a34a" v-if="state === 'completed'" class="size-5" />
                            <Circle v-if="state === 'active'" />
                            <Dot v-if="state === 'inactive'" />
                        </Button>
                    </StepperTrigger>

                    <div class="mt-5 flex flex-col items-center text-center">
                        <StepperTitle :class="[state === 'active' && 'text-primary']"
                            class="text-sm font-semibold transition lg:text-base">
                            {{ step.title }}
                        </StepperTitle>
                        <StepperDescription :class="[state === 'active' && 'text-primary']"
                            class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm">
                            {{ step.description }}
                        </StepperDescription>
                    </div>
                </StepperItem>
            </Stepper>

            <div class="flex flex-col items-center mt-20 gap-4">
                <template v-if="stepIndex === 1">
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
                                        <SelectItem v-for="(material, index) in materials" :key="index"
                                            :value="String(material.id)">
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

                <template v-if="stepIndex === 2">
                    <FormField v-slot="{ componentField, setValue }" name="recipoint_id">
                        <SearchRecipointRecycle @set-recipoint="setValue(String($event))" />
                        <FormItem class="hidden">
                            <FormControl>
                                <Input type="text" v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                </template>

                <template v-if="stepIndex === 3">
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
            </div>

            <div class="flex w-full items-center space-x-96 justify-center mt-4">
                <Button :disabled="!canGoBack" variant="outline" size="sm" @click="goBack">
                    Back
                </Button>
                <div class="flex items-center">
                    <Button v-if="stepIndex !== 3" :type="meta.valid ? 'button' : 'submit'" :disabled="!canGoNext"
                        size="sm" @click="meta.valid && goNext()">
                        Next
                    </Button>
                    <Button v-if="stepIndex === 3" size="sm" type="submit">
                        Submit
                    </Button>
                </div>
            </div>
        </form>
    </Form>
    <Toaster />
</template>