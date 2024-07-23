<script setup lang="ts">
const router = useRouter()

const isSidebarOpen = ref(false)
const sidebar = ref<HTMLElement | null>(null)

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
    isSidebarOpen.value = false
}

watchEffect(() => {
    router.beforeEach(() => {
        closeSidebar()
    })
})



</script>

<template>
    <main class="flex">

        <div ref="sidebar"
            class="md:!translate-x-0 w-fit fixed md:relative inset-0 border-r border-border bg-background z-50 md:border-none transition-transform will-change-transform transform-gpu"
            :class="{
                'translate-x-0': isSidebarOpen,
                '-translate-x-full': !isSidebarOpen
            }">
            <SidebarStructure />
        </div>
        <div
            class="flex flex-col h-screen justify-between w-full md:max-w-[calc(100%-19rem)] min-h-screen pl-3 md:pl-0 pr-3">
            <div class="flex md:hidden w-full rounded-2xl mt-2 items-center justify-between">
                <button @click="toggleSidebar" class="p-3 flex items-center justify-center">
                    <div class="w-10 h-10 flex items-center justify-center">
                        <IconsSidebarMenu />
                    </div>
                </button>
                <SidebarWallet />

            </div>
            <main ref="mainContent" @click="closeSidebar"
                class="w-full h-full overflow-y-auto border-border-main border rounded-2xl bg-bg-main md:mt-4 mb-3 mr-3">
                <slot />
            </main>
        </div>
    </main>
</template>
