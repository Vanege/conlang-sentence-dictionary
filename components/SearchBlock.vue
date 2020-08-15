<template>
  <div>
    <v-text-field
      v-model="searchedText"
      outlined
      placeholder="Enter the text in English or Globasa that you want to search"
      value.sync="searchedText"
    />
    <template v-if="searchedText.length > 2">
      <template v-if="hasEnglishMatches">
        <div class="matches-header">
          English matches:
        </div>
        <div v-for="(match, index) in englishMatches" :key="`english-match-${index}`" class="match">
          <template v-if="index < matchesMax">
            EN: <b>{{ match.english }}</b><br>GB: {{ match.globasa }}
          </template>
        </div>
      </template>
    </template>
    <template v-if="searchedText.length > 2">
      <template v-if="hasGlobasaMatches">
        <div class="matches-header">
          Globasa matches:
        </div>
        <div v-for="(match, index) in globasaMatches" :key="`globasa-match-${index}`" class="match">
          <template v-if="index < matchesMax">
            EN: {{ match.english }}<br>GB: <b>{{ match.globasa }}</b>
          </template>
        </div>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { SentenceRow } from '~/types'

@Component
export default class SearchBlock extends Vue {
  searchedText: string = ''
  matchesMax: number = 20

  get sentenceRows(): SentenceRow[] { return this.$store.state.sentenceRows }
  get stringToMatch(): string { return this.searchedText.toLowerCase() }
  get englishMatches(): SentenceRow[] { return this.sentenceRows.filter(sr => sr.english.match(new RegExp(this.stringToMatch, 'i'))).sort((a, b) => a.english.length - b.english.length) };
  get globasaMatches(): SentenceRow[] { return this.sentenceRows.filter(sr => sr.globasa.match(new RegExp(this.stringToMatch, 'i'))).sort((a, b) => a.globasa.length - b.globasa.length) };
  get hasEnglishMatches(): boolean { return this.englishMatches.length > 0 }
  get hasGlobasaMatches(): boolean { return this.globasaMatches.length > 0 }
}
</script>

<style lang="scss" scoped>
.match {
  margin-top: 10px;
  margin-left: 10px;
}
</style>
