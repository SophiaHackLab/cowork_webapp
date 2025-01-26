<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import svgPanZoom from 'svg-pan-zoom';
import { SVG, Rect, Circle } from '@svgdotjs/svg.js';
import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';
import { cn } from '@/lib/utils';
import { IconsMiscCalendar } from '#components';
import DeskDetailsDrawer from '@/components/app/DeskDetailsDrawer.vue';

const df = new DateFormatter('fr-FR', {
  dateStyle: 'long',
});

const value = ref<DateValue>();

const floorplanContainer = ref();
const floorplan = ref();
const selectedDesk = ref();

const desks = [
  // Create 4 desks positionned in square with width: 125 and height: 60 centered horizontally with 2 desks on each row (container width: 500, height: 800)
  { id: 1, x: 125, y: 100, width: 125, height: 60, available: true, deskDirection: 'top' },
  { id: 2, x: 250, y: 100, width: 125, height: 60, available: true, deskDirection: 'top' },
  { id: 3, x: 125, y: 160, width: 125, height: 60, available: true, deskDirection: 'bottom' },
  { id: 4, x: 250, y: 160, width: 125, height: 60, available: true, deskDirection: 'bottom' },

  // { id: 5, x: 125, y: 480, width: 125, height: 60, available: true, deskDirection: 'top' },
  { id: 6, x: 250, y: 380, width: 125, height: 60, available: true, deskDirection: 'top' },
  {
    id: 7,
    x: 125,
    y: 440,
    width: 125,
    height: 60,
    available: false,
    deskDirection: 'bottom',
    userImage: '/images/guillaume.png',
  },
  {
    id: 8,
    x: 250,
    y: 440,
    width: 125,
    height: 60,
    available: false,
    deskDirection: 'bottom',
    /*   userImage: 'path/to/user/image.jpg', */
  },
];

const isDrawerOpen = ref(false);

onMounted(() => {
  // Dynamic width and height
  const width = 500;
  const height = 700;
  const draw = SVG().addTo(floorplan.value).size('100%', '100%').viewbox(0, 0, width, height);

  const handleHover = (desk: any, rect: Rect, chair: Rect, element?: any) => {
    const mouseover = () => {
      rect.attr({ fill: desk.available ? '#9a9a9a' : '#17191c' });
      chair.attr({ fill: desk.available ? '#9a9a9a' : '#17191c' });
    };
    const mouseout = () => {
      rect.attr({ fill: desk.available ? '#272727' : '#17191c' });
      chair.attr({ fill: desk.available ? '#272727' : '#17191c' });
    };
    (element ?? rect).on('mouseover', () => mouseover()).on('mouseout', () => mouseout());
    chair.on('mouseover', () => mouseover()).on('mouseout', () => mouseout());
  };
  desks.forEach((desk) => {
    let chair: Rect;
    if (desk.deskDirection === 'top')
      chair = draw
        .rect(40, 20)
        .attr({
          fill: desk.available ? '#272727' : '#17191c',
          stroke: '#09090b',
          'stroke-width': 2,
          rx: 5,
          rt: 0,
        })
        .move(desk.x + desk.width / 2 - 20, desk.y - 20);
    else
      chair = draw
        .rect(40, 20)
        .attr({
          fill: desk.available ? '#272727' : '#17191c',
          stroke: '#09090b',
          'stroke-width': 2,
          rx: 5,
          rb: 0,
        })
        .move(desk.x + desk.width / 2 - 20, desk.y + desk.height);
    chair.css({ cursor: desk.available ? 'pointer' : 'not-allowed' });

    const rect = draw
      .rect(desk.width, desk.height)
      .attr({
        fill: desk.available ? '#272727' : '#17191c',
        stroke: '#09090b',
        'stroke-width': 4,
        rx: 10,
      })
      .css({ cursor: desk.available ? 'pointer' : 'not-allowed' })
      .move(desk.x, desk.y)
      .click(() => handleDeskClick(desk.id));
    handleHover(desk, rect, chair);

    let circle: Circle;
    if (desk.available) {
      circle = draw
        .circle(10)
        .attr({ fill: '#6cd244' })
        .move(desk.x + desk.width / 2 - 5, desk.y + desk.height / 2 - 5);
    } else if (desk.userImage) {
      const image = draw
        .image(desk.userImage)
        .size(32, 32)
        .attr({ 'clip-path': 'circle(20px at center)' })
        .move(desk.x + desk.width / 2 - 16, desk.y + desk.height / 2 - 16);
      image.css({ cursor: 'not-allowed' });
      handleHover(desk, rect, chair, image);
    } else {
      const circle = draw
        .circle(10)
        .attr({ fill: 'red' })
        .move(desk.x + desk.width / 2 - 5, desk.y + desk.height / 2 - 5);
      circle.css({ cursor: 'not-allowed' });
      handleHover(desk, rect, chair, circle);
    }
  });

  // draw.rect(width, height).attr({ fill: 'none', stroke: '#17191c', 'stroke-width': 2, rx: 5 })
  //     .move(
  //         0, 0
  //     )

  const panZoom = svgPanZoom(floorplan.value.querySelector('svg'), {
    zoomEnabled: true,
    controlIconsEnabled: false,
    fit: true,
    center: true,
    minZoom: 0.8,
    maxZoom: 2,
    panEnabled: true,
  });

  // Explicitly use panZoom to prevent linter error
  watch([floorplanContainer, floorplan], () => {
    if (floorplanContainer.value && floorplan.value) {
      panZoom.resize();
      panZoom.reset();
    }
  });
});

const handleDeskClick = (deskId: number) => {
  selectedDesk.value = deskId;
  isDrawerOpen.value = true;
};
</script>

<template>
  <main class="flex w-full flex-col h-full">
    <header class="w-full flex items-center justify-between py-5 px-8 border-b border-border-main">
      <h1 class="text-xl font-semibold">Réserver un bureau</h1>
      <Popover>
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            :class="
              cn('w-[280px] justify-start text-left font-normal', !value && 'text-muted-foreground')
            "
          >
            <IconsMiscCalendar class="mr-2 h-4 w-4" />
            {{ value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date' }}
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
          <Calendar v-model="value" initial-focus />
        </PopoverContent>
      </Popover>
    </header>

    <div class="w-full h-full relative">
      <div class="absolute top-5 left-5 flex flex-col gap-2 z-10">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-green rounded-full" />
          <span class="text-sm text-muted-foreground">Disponible</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-[red] rounded-full" />
          <span class="text-sm text-muted-foreground">Indisponible</span>
        </div>
      </div>
      <div class="flex flex-col items-center w-full h-full">
        <div ref="floorplanContainer" class="w-full h-full min-h-full overflow-hidden relative">
          <div ref="floorplan" class="w-full h-full"></div>
        </div>
      </div>
    </div>

    <Drawer v-model:open="isDrawerOpen">
      <DeskDetailsDrawer v-if="selectedDesk" :desk-id="selectedDesk" :available-desks="desks" />
    </Drawer>
  </main>
</template>
