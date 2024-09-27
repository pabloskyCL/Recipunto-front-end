<script setup lang="ts">
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const props = defineProps<{
    allSubComments: Array<{
        cfather: number,
        username: string,
        createdAt: string,
        content: string
    }>
}>()

</script>
<template>
    <div v-for="comment in props.allSubComments" className="flex gap-4 ml-12">
        <Avatar className="w-10 h-10 border">
            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
            <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
                <div className="font-medium">{{ comment.username }}</div>
                <time className="text-sm text-muted-foreground">{{ comment.createdAt }}</time>
            </div>
            <p>
                {{ comment.content }}
            </p>
        </div>
    </div>
</template>