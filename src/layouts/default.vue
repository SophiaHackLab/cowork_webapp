<script setup lang="ts">
</script>

<template>
  <!-- <header>
    <LocaleSwitch />
  </header> -->
  <main class="flex">
    <SidebarStructure />
    <div class="flex flex-col h-screen justify-between w-full max-w-[calc(100%-19rem)] min-h-screen pr-3">
      <main ref="mainContent" class="w-full h-full overflow-y-auto border-border-main border rounded-2xl bg-bg-main mt-4 mb-3 mr-3">
        <slot />
      </main>
    </div>
  </main>
</template>
