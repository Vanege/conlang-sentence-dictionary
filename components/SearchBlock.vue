<template>
  <div>
    <v-text-field
      v-model="searchedText"
      outlined
      placeholder="Enter the text in English or Globasa that you want to search"
      value.sync="searchedText"
    />
    <template v-if="searchedText.length > 2">
      <template v-if="hasENGLBSMatches">
        <div class="matches-header">
          English -> Globasa matches:
        </div>
        <div v-for="(match, index) in ENGLBSMatches" :key="`english-match-${index}`" class="match">
          <template v-if="index < matchesMax">
            EN: <b>{{ match.english }}</b><br>GB: {{ match.globasa }}
          </template>
        </div>
      </template>
    </template>
    <template v-if="searchedText.length > 2">
      <template v-if="hasGLBSENMatches">
        <div class="matches-header">
          Globasa -> English matches:
        </div>
        <div v-for="(match, index) in GLBSENMatches" :key="`globasa-match-${index}`" class="match">
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

  // TODO: display wordRows (dictionary) somewhere else
  get ENGLBSRows(): SentenceRow[] { return [...this.$store.state.englishSentenceRows, ...this.$store.state.wordRows] }
  get stringToMatch(): string { return this.searchedText.toLowerCase() }
  get ENGLBSMatches(): SentenceRow[] { return this.ENGLBSRows.filter(sr => sr.english.match(new RegExp(this.stringToMatch, 'i'))).sort((a, b) => a.english.length - b.english.length) };
  get GLBSENMatches(): SentenceRow[] { return this.ENGLBSRows.filter(sr => sr.globasa.match(new RegExp(this.stringToMatch, 'i'))).sort((a, b) => a.globasa.length - b.globasa.length) };
  get hasENGLBSMatches(): boolean { return this.ENGLBSMatches.length > 0 }
  get hasGLBSENMatches(): boolean { return this.GLBSENMatches.length > 0 }
}
</script>

<style lang="scss" scoped>
.match {
  margin-top: 10px;
  margin-left: 10px;
}
.matches-header{
  margin-top: 20px;
}
</style>
