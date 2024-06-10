<script setup lang="ts">
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-vue-next'

import { computed, onMounted, ref } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/v-calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { DatePickerRangeObject } from 'v-calendar/dist/types/src/use/datePicker.js'
import { SimpleDateParts } from 'v-calendar/dist/types/src/utils/date/helpers.js'

const date = ref<Date | undefined>()
const props = defineProps<{
    value: any,
    setFieldValue: any,
    placeholder: string,
    isLoading: boolean,
}>();

const toDate = (value: any): Date | null => {
    if (value instanceof Date) {
        return value;
    }
    if (typeof value === 'string' || typeof value === 'number') {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
            return date;
        }
    }
    return null;
};

const handleUpdateModelValue = (selectedDate: string | number | Date | Partial<SimpleDateParts> | DatePickerRangeObject | any) => {
    const date = toDate(selectedDate)
    if (date) {
        props.setFieldValue('birthday', format(date, "yyyy-MM-dd"))
        return;
    }

    props.setFieldValue('birthday', undefined)
}

defineExpose({
    date
});

</script>

<template>
    <Popover>
        <PopoverTrigger as-child>
            <Button :variant="'outline'" :class="cn(
                'w-[280px] justify-start text-left font-normal',
                !props.value && 'text-muted-foreground',
            )" :disabled="isLoading">
                <CalendarIcon class="mr-2 h-4 w-4" />
                <span>{{ props.value.modelValue ? format(new Date(props.value.modelValue), "dd/MM/yyyy") : props.placeholder }}</span>
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
            <Calendar v-bind="props.value" @update:model-value="handleUpdateModelValue" />
        </PopoverContent>
    </Popover>
</template>