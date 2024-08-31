<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { type Chord, type ChordSettings, SVGuitarChord } from 'svguitar'
const chart = ref()

const props = defineProps<{
  chord: Chord,
  chartConfig: ChordSettings,
}>()

onMounted(()=>{
  chart.value = new SVGuitarChord('#chart')
})


const download = (type: string) => {
  // TODO: download chord image
}

defineExpose({
  download
})

watchEffect(()=>{
// draw the chart
  chart.value && chart.value
    .configure(props.chartConfig)
    .chord(props.chord)
    .draw()
})
</script>

<template>
  <div id="chart" style="width:100%; height: 100%;"></div>
</template>

<style scoped>
</style>
