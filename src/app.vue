<script setup lang="ts">
const head = {
    title: 'SHL // Cowork booking panel',
    meta: [
        {
            id: 'meta-charset',
            charset: 'utf-8',
        },
        {
            id: 'meta-viewport',
            name: 'viewport',
            content: 'width=device-width, initial-scale=1',
        },
    ],
    link: [],
}



useHead(head);

</script>

<template>
    <div class="app">
        <Html lang="fr">

        <Body class="h-full w-full">
            <NuxtLoadingIndicator color="white" />
            <NuxtLayout>
                <NuxtPage />
            </NuxtLayout>
        </Body>

        </Html>
    </div>
</template>
