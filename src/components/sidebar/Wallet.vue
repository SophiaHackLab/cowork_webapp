<script setup lang="ts">
/* const { user } = useUserStore()
 */
</script>
<template>
    <div class=" flex">
        <button
            class="w-full bg-bg-main border border-border-card rounded-full px-4 pr-1.5 py-1.5 justify-between flex items-center hover:bg-bg-third transition-all active:scale-95 gap-5">
            <p class="text-base text-fg-main font-medium">
                <span class="font-bold">4</span> jours restants
            </p>
            <div class="w-6 h-6 rounded-full bg-green overflow-hidden aspect-square p-1 flex items-center justify-center">
                <IconsMiscPlus class="text-background " />
            </div>
        </button>
    </div>
</template>
