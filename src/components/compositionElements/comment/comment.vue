<script setup lang="ts">
import staricon from '../icons/staricon.vue';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Subcomment from './subcomment.vue';
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const showSubCommentsStatus = ref({});

const showResponseBox = ref({});


const toggleShowSubComments = (index: number) => {
    showSubCommentsStatus.value = { ...showSubCommentsStatus, [index]: !showSubCommentsStatus.value[index] }
}

const toggleResponseComments = (index) => {
    showResponseBox.value = {
        ...showResponseBox, [index]: !showResponseBox.value[index]
    }
}
</script>
<template>
    <div class="w-full max-w-2xl mx-auto">
        <div class="flex justify-between items-center mb-4">
            <div class="text-2xl">Comentarios</div>
        </div>
        <div class="space-y-6">
            <div class="flex gap-4">
                <Avatar class="w-10 h-10 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div class="flex-1 space-y-2">
                    <div class="flex items-center justify-between">
                        <div class="font-medium">John Doe</div>
                        <div class="flex items-center gap-1">
                            <staricon class="w-4 h-4 fill-primary" />
                            <staricon class="w-4 h-4 fill-primary" />
                            <staricon class="w-4 h-4 fill-primary" />
                            <staricon class="w-4 h-4 fill-muted stroke-muted-foreground" />
                            <staricon class="w-4 h-4 fill-muted stroke-muted-foreground" />
                            <time class="text-sm text-muted-foreground">2 days ago</time>
                        </div>
                    </div>
                    <p>
                        This product is amazing! It has exceeded all my expectations. The quality is top-notch and it's
                        been a
                        game-changer for my workflow.
                    </p>
                    <Button variant="ghost" class="text-muted-foreground" @click="toggleShowSubComments(1)">
                        {{ showSubCommentsStatus[1] ? "esconder" : "mostrar" }} respuestas
                    </Button>
                    <Button variant="ghost" class="text-muted-foreground" @click="toggleResponseComments(1)">
                        <span class="">responder</span>
                    </Button>
                </div>
            </div>
            <div class="flex w-full justify-center">
                <div v-if="showResponseBox[1]" class="flex items-center gap-2 mt-2 w-5/6">
                    <Textarea value="" placeholder="Write a response..."
                        class="flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50" />
                    <Button @click="() => { }">Responder</Button>
                </div>
            </div>
            <Subcomment v-if="showSubCommentsStatus[1]" />
            <div class="flex items-center gap-2">
                <Textarea value="" onChange="" placeholder="Write a new comment..."
                    class="flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50" />
                <Button @click="() => { }">Submit</Button>
            </div>
        </div>
    </div>
</template>
