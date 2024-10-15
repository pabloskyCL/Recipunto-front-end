<script setup lang="ts">
import staricon from '../icons/staricon.vue';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Subcomment from './subcomment.vue';
import { onBeforeMount, ref } from 'vue';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';

const BACKENDURL = import.meta.env.VITE_BACKEND_URL

const selectedResponses = ref<{
    [key: number]: Array<{
        cfather: number,
        username: string,
        createdAt: string,
        content: string
    }>
}>({});

const responses = ref<{
    [key: number]:
    Array<{
        cfather: number,
        username: string,
        createdAt: string,
        content: string
    }>
} | any>({});

const showResponseStatus = ref<{ [key: number]: any }>([]);
const showResponseBox = ref<{ [key: number]: { show: boolean, text: string } }>([]);

const props = defineProps<{
    recipointId?: Number
}>()

interface Comment {
    commentId: number,
    commentContent: string,
    username: string,
    stars: number,
    createdAt: string,
    hasSubComments: number
}

const comments = ref<Comment[]>([]);

onBeforeMount(async () => {
    const { data } = await axios.get(`${BACKENDURL}/comment/recipoint/${props.recipointId}`);
    comments.value = data;

    comments.value?.forEach((comment) => {
        showResponseStatus.value[comment.commentId] = { show: false }
        showResponseBox.value[comment.commentId] = { show: false, text: '' }
    })
})

const getShowResponseStatus = (parentId: number) => {
    return showResponseStatus.value[parentId].show
}

const commentsHasResponses = () => {
    let parentCommentIds: number[] = [];
    if (comments.value) {
        parentCommentIds.push(...comments.value.reduce<number[]>((current, previous) => {
            if (previous.hasSubComments > 0) {
                current.push(previous.commentId)
                return current;
            }
            return current;
        }, []))

    }

    return parentCommentIds;
}

const addComment = async (comment: Comment,) => {
    await axios.post(`${BACKENDURL}/comment`, {
        recipoint_id: props.recipointId,
        subcomment: comment?.commentId,
        content: showResponseBox.value[comment.commentId].text
    }).then(async () => {
        const { data } = await axios.get(`${BACKENDURL}/comment/subcomments`, {
            params: {
                parentIds: [comment.commentId]
            }
        })
        responses.value[comment.commentId] = data;
        selectedResponses.value[comment.commentId] = data
        const commentIndex = comments.value.findIndex((val) => val == comment)
        comments.value[commentIndex].hasSubComments += 1;
        return

    })
}

const newComment = ref<{
    content: string
}>({
    content: ''
});

const addNewComment = async () => {
    await axios.post(`${BACKENDURL}/comment`, {
        recipoint_id: props.recipointId,
        content: newComment.value.content
    }).then(async () => {
        const { data } = await axios.get(`${BACKENDURL}/comment/recipoint/${props.recipointId}`);
        comments.value = data;

        comments.value?.forEach((comment) => {
            showResponseStatus.value[comment.commentId] = { show: false }
            showResponseBox.value[comment.commentId] = { show: false, text: '' }
        })

    })
}

const toggleShowSubComments = async (index: number) => {

    showResponseStatus.value[index].show = !showResponseStatus.value[index].show
    const parentHasSubComment = commentsHasResponses();
    if (Object.keys(responses.value).length === 0) {
        const { data } = await axios.get(`${BACKENDURL}/comment/subcomments`, {
            params: {
                parentIds: parentHasSubComment
            }
        });
        data.forEach((subcomment: any) => {
            if (!responses.value[subcomment.cfather]) {
                responses.value[subcomment.cfather] = []
            }
            responses.value[subcomment.cfather].push(subcomment);
        });
    }

    selectedResponses.value[index] = responses.value[index];
}

const toggleResponseComments = (index: number) => {
    showResponseBox.value[index].show = !showResponseBox.value[index].show
}
</script>
<template>
    <div class="w-full max-w-2xl mx-auto">
        <div class="flex justify-between items-center mb-4">
            <div class="text-2xl">Comentarios</div>
        </div>
        <div v-for="comment in comments" :key="comment.commentId" class="space-y-6">
            <div class="flex gap-4">
                <Avatar class="w-10 h-10 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div class="flex-1 space-y-2">
                    <div class="flex items-center justify-between">
                        <div class="font-medium">{{ comment.username }}</div>
                        <div class="flex items-center gap-1">
                            <staricon v-for="star in comment.stars" :key="star" class="w-4 h-4 fill-primary" />
                            <staricon v-for="starMuted in 5 - comment.stars" :key="starMuted"
                                class="w-4 h-4 fill-muted stroke-muted-foreground" />
                            <time class="text-sm text-muted-foreground">{{ comment.createdAt }}</time>
                        </div>
                    </div>
                    <p>
                        {{ comment.commentContent }}
                    </p>
                    <Button v-if="comment.hasSubComments > 0" variant="ghost" class="text-muted-foreground"
                        @click="toggleShowSubComments(comment.commentId)">
                        {{ getShowResponseStatus(comment.commentId) ? "esconder" : "mostrar" }} respuestas
                    </Button>
                    <Button variant="ghost" class="text-muted-foreground"
                        @click="toggleResponseComments(comment.commentId)">
                        <span class="">responder</span>
                    </Button>
                </div>
            </div>
            <div class="flex w-full justify-center">
                <div v-if="showResponseBox[comment.commentId]?.show" class="flex items-center gap-2 mb-5 w-5/6">
                    <Textarea :model-value="showResponseBox[comment.commentId].text"
                        v-on:update:model-value="(value) => { showResponseBox[comment.commentId].text = String(value) }"
                        placeholder="Write a response..."
                        class="flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50" />
                    <Button @click="addComment(comment)">Responder</Button>
                </div>
            </div>
            <Subcomment v-if="getShowResponseStatus(comment.commentId)" :key="comment.commentId"
                :allSubComments="selectedResponses[comment.commentId] ?? []" />
        </div>
        <div class="flex items-center gap-2 mt-10">
            <Textarea @update:model-value="(value) => newComment.content = String(value)"
                placeholder="Write a new comment..."
                class="flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50" />
            <Button @click="addNewComment()">Submit</Button>
        </div>
    </div>
</template>
