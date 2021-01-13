<template>
  <div class="my-container">
    <br><a :href="corpusLink" target="_blank">Sentence corpus link</a>
    <br><a :href="englishDictionary" target="_blank">Globasa English dictionary</a>
    <br>v0.0.3: For Esperanto to/from Globasa, add sentences from Ektor and Miraheze (checked)
    <br>v0.0.2: Can also match Esperanto -> Globasa and Globasa -> Esperanto
    <br>v0.0.1: Can match only English and Globasa substrings
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Versioning extends Vue {
  corpusLink: string = 'https://docs.google.com/spreadsheets/d/1aeo2v0MG6VGSio12-t0issmL1N2DIdwG4l5GpMFBVIc';
  englishDictionary: string = 'https://docs.google.com/spreadsheets/d/13iyvBfs3nqDID0n5EedG_bJKgL8CCHIW0ToJxRT-E6c';
}
</script>

<style lang="scss" scoped>
.my-container {
  margin-top: 10px;
}
</style>
