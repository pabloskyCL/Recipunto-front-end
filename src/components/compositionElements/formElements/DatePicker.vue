<script setup lang="ts">
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-vue-next'

import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/v-calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

const date = ref<Date| undefined>()
const props = defineProps<{
    placeholder: string
}>();

defineExpose({
    date
});

</script>

<template>
    <Popover>
        <PopoverTrigger as-child>
            <Button :variant="'outline'" :class="cn(
                'w-[280px] justify-start text-left font-normal',
                !date && 'text-muted-foreground',
            )">
                <CalendarIcon class="mr-2 h-4 w-4" />
                <span>{{ date ? format(date, "PPP") : props.placeholder }}</span>
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
            <Calendar v-model="date" />
        </PopoverContent>
    </Popover>
</template>