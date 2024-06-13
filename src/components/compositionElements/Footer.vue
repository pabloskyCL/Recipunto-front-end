<script setup lang="ts">
import facebookicon from '@/components/compositionElements/icons/facebookicon.vue'
import instagramicon from '@/components/compositionElements/icons/instagramIcon.vue'
import linkedinicon from '@/components/compositionElements/icons/linkedinicon.vue'
import twittericon from '@/components/compositionElements/icons/twittericon.vue'
import recipuntoicon from '@/components/compositionElements/icons/recipuntoicon.vue'
import { Button } from '../ui/button';


</script>

<template>
    <footer className="bg-gray-100 py-12 md:py-16 lg:py-20 dark:bg-gray-800">
        <div className="container mx-auto flex flex-col items-center justify-center gap-8">
            <div className="flex items-center gap-4">
                <RouterLink to="/" prefetch={false}>
                    <recipuntoicon className="h-8 w-8" />
                    <span className="text-xl font-semibold">Recipunto</span>
                </RouterLink>
            </div>
            <div className="flex items-center gap-4">
                <RouterLink to="/" aria-label="Twitter" prefetch={false}>
                    <Button variant="ghost" size="icon"
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                        <twittericon className="h-6 w-6" />
                    </Button>
                </RouterLink>
                <RouterLink to="/" aria-label="Facebook" prefetch={false}>
                    <Button variant="ghost" size="icon"
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                        <facebookicon className="h-6 w-6" />
                    </Button>
                </RouterLink>
                <RouterLink to="/" aria-label="Instagram" prefetch={false}>
                    <Button variant="ghost" size="icon"
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                        <instagramicon className="h-6 w-6" />
                    </Button>
                </RouterLink>
                <RouterLink to="/" aria-label="LinkedIn" prefetch={false}>
                    <Button variant="ghost" size="icon"
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                        <linkedinicon className="h-6 w-6" />
                    </Button>
                </RouterLink>
            </div>
            <div className="container mx-auto text-center mt-8 text-gray-500 dark:text-gray-400">
                &copy; 2024 Recipunto SPA. All rights reserved.
            </div>
        </div>
    </footer>
</template>