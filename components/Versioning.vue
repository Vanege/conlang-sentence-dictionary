<template>
  <div class="my-container">
    <a :href="spreadsheetUrl" target="_blank">Database link</a>
    <br>
    v0.0.1: Can match only English and Globasa substrings
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Versioning extends Vue {
  spreadsheetUrl: string = 'https://docs.google.com/spreadsheets/d/1aeo2v0MG6VGSio12-t0issmL1N2DIdwG4l5GpMFBVIc/edit';
}
</script>

<style lang="scss" scoped>
.my-container {
  margin-top: 30px;
}
</style>
