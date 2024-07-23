<script setup lang="ts">
/* const { user } = useUserStore()
 */
</script>
<template>
    <div class="w-full flex items-center gap-3 rounded-lg transition-all group">
        <NuxtImg
            src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Alexandre"
            alt="Profile Picture"
            width="40"
            height="40"
            loading="lazy"
            placeholder="/images/placeholder.png"
            class="w-[2.75rem] min-w-[2.75rem] h-[2.75rem] rounded-full overflow-hidden bg-gray-200 object-cover"
        />
        <!-- <div class="w-[2.75rem] h-[2.75rem] min-w-[2.75rem] rounded-full overflow-hidden">
      <IconsMiscProfile />
    </div> -->
        <div class="flex flex-col text-left w-full">
            <div class="flex items-center gap-2">
                <h1
                    class="text-base font-semibold text-fg-main whitespace-nowrap truncate max-w-max w-48"
                >
                    <!--  {{ user?.name }} -->
                    Alexandre VARGAS
                </h1>
                <!-- <div
          class="bg-accent-blue rounded-md flex items-center justify-center px-1.5 py-0.5"
        >
          <p class="text-[10px] text-white font-semibold">
            PRO
          </p>
        </div> -->
            </div>
            <p
                class="text-sm font-normal text-fg-secondary truncate max-w-max w-48"
            >
                <!-- {{ user?.email }} -->
                alexandre.vargas.lopez@gmail.com
            </p>
        </div>
    </div>
</template>
