<script setup lang="ts">
const localePath = useLocalePath()

interface Props {
    routeName?: string;
    title: string;
    notifs?: string | number;
    active?: boolean;
    disabled?: boolean;
    desactivated?: boolean;
}

const props = defineProps<Props>()
const slots = useSlots()

const $route = useRoute()
const isRouterLinkActive = ref(false)

const handleChangeActiveRoute = () => {
  isRouterLinkActive.value =
        (($route.name as string)?.includes(props.routeName as string) && !props.disabled) ||
        props.active
}

handleChangeActiveRoute()
watch(
  () => $route.path,
  () => handleChangeActiveRoute()
)

watch(
  () => props.disabled,
  () => handleChangeActiveRoute()
)

watch(
  () => props.active,
  () => handleChangeActiveRoute()
)
</script>

<template>
  <div class="flex flex-col">
    <NuxtLink
      :to="props.desactivated ? '' : routeName?.startsWith('https://') ? routeName : localePath({ name: routeName })"
      class="flex items-center justify-between px-[12px] py-[10px] hover:bg-bg-fourth/50 rounded-lg overflow-hidden transition-all group h-[42px] text-fg-main active:opacity-60 !cursor-pointer"
      :class="{
        '!bg-bg-fourth': isRouterLinkActive && !slots.subItems,
        '!text-fg-main': isRouterLinkActive,
        'opacity-60 pointer-events-none': props.desactivated,
      }"
      :target="routeName?.startsWith('https://') ? '_blank' : undefined"
    >
      <div class="flex items-center gap-[10px] text-base">
        <div
          class="group-active:scale-[0.98] transition-all text-fg-secondary w-6 h-6"
          :class="{
            '!text-fg-main/80': isRouterLinkActive,
            'group-hover:!text-fg-main/70': !isRouterLinkActive,
          }"
        >
          <slot name="icon" />
        </div>
        <p
          class="text-sm font-semibold text-fg-secondary group-hover:!text-fg-main"
          :class="{
            'group-active:!text-fg-secondary': isRouterLinkActive,
            '!text-fg-main': isRouterLinkActive,
          }"
        >
          {{ title }}
        </p>
      </div>
      <div
        v-if="notifs && !isRouterLinkActive && !slots.subItems"
        class="px-2 py-0.5 bg-accent-green rounded-full flex items-center justify-center"
      >
        <p class="font-semibold text-xs leading-normal text-center">
          {{ notifs }}
        </p>
      </div>
      <!-- <div v-if="slots.subItems && !props.desactivated">
        <IconsButtonsChevronDown
          class="w-4 h-4 text-fg-main transition-all will-change-transform"
          :class="{
            'transform rotate-180': isRouterLinkActive,
          }"
        />
      </div> -->
    </NuxtLink>
    <div v-if="slots.subItems && isRouterLinkActive" class="flex gap-1.5 py-2 pl-5">
      <div class="h-full w-[2px] bg-bg-fourth rounded-sm" />
      <div class="flex flex-col gap-1 w-full">
        <slot name="subItems" />
      </div>
    </div>
  </div>
</template>
