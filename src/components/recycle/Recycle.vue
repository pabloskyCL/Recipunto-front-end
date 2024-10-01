<script setup lang="ts">
import { Check, Circle, Dot } from 'lucide-vue-next'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { computed, onBeforeMount, ref } from 'vue'
import { get, set } from '@vueuse/core'
import { Stepper, StepperDescription, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '@/components/ui/stepper'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'

import { Toaster } from '../ui/toast';
import axios from 'axios'
import { useRoute } from 'vue-router'
import StepOne from './StepOne.vue'
import StepTwo from './StepTwo.vue'
import LastStep from './LastStep.vue'

export interface Material {
    id: number,
    name: string
}

const route = useRoute();
const recipointParam: any = route.params.recipoint_id;

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
let steps = ref([
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
])



onBeforeMount(async () => {
    if (route.params.recipoint_id) {
        steps.value = steps.value.reduce((acumulateSteps: any, current, index) => {
            if (current.step == 2) {
                steps.value[index].step -= 1;
                return acumulateSteps;
            }
            acumulateSteps.push(current);

            return acumulateSteps;
        }, [])
    };
});

console.log(steps.value.length)
const canGoNext = computed(() => stepIndex.value < steps.value.length)
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
    console.log(recipointParam)
    const recipointId = values.recipoint_id ? parseInt(values.recipoint_id) : parseInt(recipointParam);
    const recycleValues = {
        material: parseInt(values.material),
        recipoint_id: recipointId,
        weight: parseFloat(values.weight)
    }

    const reviewRecipointValues = {
        recipoint_id: recipointId,
        stars: parseInt(values.rating),

    }
    const commentRecipointValues = {
        recipoint_id: recipointId,
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


</script>

<template>
    <div>
        <Form v-slot="{ meta, values, validate }" as="" keep-values
            :validation-schema="toTypedSchema(formSchema[stepIndex - 1])">
            <form @submit="(e) => {
                e.preventDefault()
                validate()

                if (stepIndex === steps.length) {
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


                <template v-if="stepIndex === 1">
                    <StepOne />
                </template>

                <template v-if="stepIndex === 2 && !route.params.recipoint_id">
                    <StepTwo />
                </template>

                <template v-if="stepIndex === steps.length">
                    <LastStep />
                </template>


                <div class="flex w-full items-center space-x-96 justify-center mt-4">
                    <Button :disabled="!canGoBack" variant="outline" size="sm" @click="goBack">
                        Back
                    </Button>
                    <div class="flex items-center">
                        <Button v-if="stepIndex !== steps.length" :type="meta.valid ? 'button' : 'submit'"
                            :disabled="!canGoNext" size="sm" @click="meta.valid && goNext()">
                            Next
                        </Button>
                        <Button v-if="stepIndex === steps.length" size="sm" type="submit">
                            Submit
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
        <Toaster />
    </div>
</template>
