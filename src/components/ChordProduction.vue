<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { type Barre, type Chord, type ChordSettings, type Finger, Orientation, SVGuitarChord } from 'svguitar'
const chart = ref()

const props = defineProps<{
  chord: Chord,
  chartConfig: ChordSettings,
}>()

onMounted(()=>{
  chart.value = new SVGuitarChord('#chart')
})
const saveSVG = () => {
  const chartElement = document.getElementById('chart');

  if (!chartElement) {
    console.error('chartElement element not found');
    return;
  }

  const svgElement = chartElement.getElementsByTagName('svg')![0]

  if (!chartElement) {
    console.error('chartElement element not found');
    return;
  }

  const svgContent = new XMLSerializer().serializeToString(svgElement);

  const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'chart.svg';
  link.click();

  URL.revokeObjectURL(url);
};


const download = (type: string) => {
  // TODO: download chord image
  saveSVG()
}

defineExpose({
  download
})

watchEffect(()=>{
  const setting: ChordSettings = props.chartConfig || {} as ChordSettings
  const chord = props.chord
// draw the chart
  if (!setting.orientation) {
    setting.orientation = Orientation.horizontal
  }
  chart.value && chart.value
    .configure(setting)
    .chord(chord)
    .draw()
})
</script>

<template>
  <div id="chart" style="width:100%; height: 100%;"></div>
</template>

<style scoped>
</style>
