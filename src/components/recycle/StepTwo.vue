<script setup lang="ts">
import { FormField, FormItem, FormControl, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import SearchRecipointRecycle from './SearchRecipointRecycle.vue';
</script>
<template>
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