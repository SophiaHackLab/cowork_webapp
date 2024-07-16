<script setup lang="ts">

import { Space } from '@smplrspace/smplr-loader/dist/generated/smplr'
import { Desk, desks, Room, rooms } from './data'

onMounted(() => {
  let space: Space

  function initSpace (smplr: any) {
    // console.log('initSpace', smplr)
    space = new smplr.Space({
      spaceId: 'f438671f-9979-42c6-8338-05c0015abb2d',
      clientToken: 'pub_eb760fee77634cdab2fe31146fc371c2',
      containerId: 'test'
    })
    space.startViewer({
      preview: true,
      mode: '2d',
      allowModeChange: true,
      onReady: () => updateDataLayers()
      /* onError: error => console.error('Could not start viewer', error) */
    })
  }

  function updateDataLayers () {
  // remove previous layers if any
    space.removeDataLayer('rooms')
    space.removeDataLayer('desks')

    // add new layers
    space.addDataLayer<Room>({
      id: 'rooms',
      type: 'polygon',
      data: rooms,
      tooltip: d => `${d.name} - ${d.available ? 'free' : 'occupied'}`,
      color: d => (d.available ? '#3aa655' : '#ff3f34'),
      alpha: 0.7,
      height: 2.9,
      onClick: (d) => {
        const notes = document.getElementById('notes')
        notes.innerText = `${d.name} is ${d.available ? 'free' : 'taken'}`
      }
    })
    space.addDataLayer<Desk>({
      id: 'desks',
      type: 'furniture',
      data: desks,
      tooltip: d => `${d.name} - ${d.available ? 'free' : 'occupied'}`,
      color: d => (d.available ? '#50b268' : '#f75e56'),
      onClick: (d) => {
        const notes = document.getElementById('notes')
        notes.innerText = `${d.name} is ${d.available ? 'free' : 'taken'}`
      }
    })
  }

  // we recommend using the default value 'esm' in your code but stackblitz required 'umd'
  import('https://app.smplrspace.com/lib/smplr.js')
    .then(smplr => initSpace(smplr))
  /*  .catch(error => console.error(error)) */
})

</script>

<template>
  <main class="flex w-full flex-col gap-5">
    <header class="w-full flex items-center justify-between py-5 px-8 border-b border-border-main">
      <h1 class="text-xl font-semibold">
        Réserver un bureau
      </h1>
    </header>

    <div class="w-full h-full">
      <ClientOnly>
        <div class="smplr-wrapper h-full w-full">
          <div id="test" class="smplr-embed h-full w-full" />
        </div>
      </ClientOnly>
    </div>
  </main>
</template>
