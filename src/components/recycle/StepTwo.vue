<script setup lang="ts">
import { FormField, FormItem, FormControl, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import SearchRecipointRecycle from './SearchRecipointRecycle.vue';
</script>
<template>
    <div class="flex flex-col items-center mt-20 gap-4">
        <FormField v-slot="{ componentField, setValue }" name="recipoint_id">
            <SearchRecipointRecycle @set-recipoint="setValue(String($event))" />
            <FormItem class="hidden">
                <FormControl>
                    <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
    </div>
</template>