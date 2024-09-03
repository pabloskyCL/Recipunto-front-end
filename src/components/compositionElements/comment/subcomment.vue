<script setup lang="ts">
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
</script>
<template>
    <div className="flex gap-4 ml-12">
        <Avatar className="w-10 h-10 border">
            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
            <AvatarFallback>JA</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
                <div className="font-medium">Jane Appleseed</div>
                <time className="text-sm text-muted-foreground">1 day ago</time>
            </div>
            <p>
                I agree, this product is truly exceptional. The user experience is seamless and the features are
                incredibly useful. Highly recommend!
            </p>
        </div>
    </div>
</template>