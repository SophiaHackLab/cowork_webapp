<script lang="ts" setup>
import { type HTMLAttributes, computed } from 'vue';
import {
  CalendarRoot,
  type CalendarRootEmits,
  type CalendarRootProps,
  useForwardPropsEmits,
} from 'radix-vue';
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading,
  CalendarNextButton,
  CalendarPrevButton,
} from '.';
import { cn } from '@/lib/utils';

const props = defineProps<
  CalendarRootProps & { class?: HTMLAttributes['class']; fullMode?: boolean }
>();

const emits = defineEmits<CalendarRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, fullMode, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <CalendarRoot
    v-slot="{ grid, weekDays }"
    :class="cn('p-3 w-full', props.class, { 'text-lg': props.fullMode })"
    v-bind="forwarded"
  >
    <CalendarHeader>
      <CalendarPrevButton />
      <CalendarHeading />
      <CalendarNextButton />
    </CalendarHeader>

    <div
      :class="{
        'flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0 w-full': props.fullMode,
      }"
    >
      <CalendarGrid v-for="month in grid" :key="month.value.toString()" :full-mode="props.fullMode">
        <CalendarGridHead>
          <CalendarGridRow>
            <CalendarHeadCell v-for="day in weekDays" :key="day">
              {{ day }}
            </CalendarHeadCell>
          </CalendarGridRow>
        </CalendarGridHead>
        <CalendarGridBody>
          <CalendarGridRow
            v-for="(weekDates, index) in month.rows"
            :key="`weekDate-${index}`"
            class="mt-2 w-full"
          >
            <CalendarCell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
              :full-mode="props.fullMode"
            >
              <CalendarCellTrigger
                :day="weekDate"
                :month="month.value"
                :full-mode="props.fullMode"
              />
            </CalendarCell>
          </CalendarGridRow>
        </CalendarGridBody>
      </CalendarGrid>
    </div>
  </CalendarRoot>
</template>
