<script setup lang="ts">

</script>

<template>
    <main class="select-none relative z-30 h-screen min-w-[19rem] max-w-[19rem]">
        <div
            class="absolute overflow-y-auto hidden-scrollbar inset-0 h-full w-full flex flex-col px-6 py-10 pb-6 gap-10 justify-between bg-background z-40">
            <div class="flex flex-col gap-8">
                <div class="flex flex-col gap-5">
                    <SidebarProfile />
                    <SidebarWallet />
                </div>

                <nav class="flex flex-col gap-5 w-full">
                    <div class="flex flex-col gap-2.5">
                        <SidebarItem route-name="app-overview" title="Vue d'ensemble">
                            <template #icon>
                                <IconsSidebarOverview />
                            </template>
                        </SidebarItem>

                        <SidebarItem route-name="app-book-desk" title="Réserver un bureau">
                            <template #icon>
                                <IconsSidebarDeskLamp />
                            </template>
                        </SidebarItem>
                        <SidebarItem route-name="app-book-room" title="Réserver une salle">
                            <template #icon>
                                <IconsSidebarPresentation />
                            </template>
                        </SidebarItem>
                    </div>
                </nav>
            </div>

            <div class="flex flex-col gap-10">
                <div class="flex flex-col gap-8">
                    <div class="flex flex-col gap-2.5 w-full">
                        <SidebarItem route-name="https://docs.shl.contact/s/guide/doc/le-coworking-Y2KDSh1OSt"
                            title="Guide de l'espace">
                            <template #icon>
                                <IconsSidebarGuide />
                            </template>
                        </SidebarItem>
                        <SidebarItem route-name="app-settings" title="Paramètres">
                            <template #icon>
                                <IconsSidebarSettings />
                            </template>
                        </SidebarItem>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
