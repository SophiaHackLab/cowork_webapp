<script setup lang="ts">
import { ref } from 'vue';
import { type DateValue } from '@internationalized/date';
import { Button } from '@/components/ui/button';
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const props = defineProps<{
  deskId: number;
  availableDesks: any[];
}>();

const selectedDate = ref<DateValue>();
const selectedTime = ref<string>();

const availableTimes = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
];

const handleBookDesk = () => {
  // TODO: Implement desk booking logic
  console.log('Booking desk', {
    deskId: props.deskId,
    date: selectedDate.value,
    time: selectedTime.value,
  });
};
</script>

<template>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Desk {{ deskId }} Details</DrawerTitle>
      <DrawerDescription> Book your workspace for the day </DrawerDescription>
    </DrawerHeader>

    <div class="flex gap-6 p-6">
      <!-- Desk Image Placeholder -->
      <div class="flex flex-col gap-3">
        <div
          class="w-80 rounded-lg overflow-hidden h-48 bg-gray-200 flex items-center justify-center"
        >
          <img
            src="https://cloud.shl.contact/apps/files_sharing/publicpreview/Ma5ajqgYAxBKtWP?file=/&fileId=1320&x=3600&y=1800&a=true"
            alt="Desk Image"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="space-y-2 mb-4">
          <h3 class="font-semibold">Desk Equipment</h3>
          <ul class="list-disc list-inside">
            <li>Monitor</li>
            <li>Ergonomic Chair</li>
            <li>WiFi Access</li>
            <li>Power Outlet</li>
          </ul>
        </div>
      </div>

      <div class="w-full">
        <!-- Date and Time Selection -->
        <div class="flex gap-4 h-[32rem]">
          <div class="w-full max-w-[35rem]">
            <h3 class="font-semibold mb-2">Select Date</h3>
            <Calendar :full-mode="true" class="w-full" v-model="selectedDate" />
          </div>

          <div class="w-1/2">
            <h3 class="font-semibold mb-2">Select Time</h3>
            <Select v-model="selectedTime">
              <SelectTrigger>
                <SelectValue placeholder="Choose a time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="time in availableTimes" :key="time" :value="time">
                  {{ time }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>

    <DrawerFooter class="flex justify-between">
      <DrawerClose class="w-full">
        <Button variant="outline" class="w-full"> Go Back </Button>
      </DrawerClose>
      <Button @click="handleBookDesk" :disabled="!selectedDate || !selectedTime">
        Reserve my desk
      </Button>
    </DrawerFooter>
  </DrawerContent>
</template>
