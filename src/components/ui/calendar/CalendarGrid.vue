<script lang="ts" setup>
import { type HTMLAttributes, computed } from 'vue';
import { CalendarGrid, type CalendarGridProps, useForwardProps } from 'radix-vue';
import { cn } from '@/lib/utils';

const props = defineProps<
  CalendarGridProps & { class?: HTMLAttributes['class']; fullMode?: boolean }
>();

const delegatedProps = computed(() => {
  return props;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <div :class="{ 'p-4 w-full': props.fullMode, 'p-2': !props.fullMode }">
    <CalendarGrid
      :class="cn('w-full border-collapse space-y-1', props.class)"
      v-bind="forwardedProps"
    >
      <slot />
    </CalendarGrid>
  </div>
</template>
