<template>
  <div>
    <v-text-field
      v-model="searchedText"
      outlined
      placeholder="Tajpu almenaŭ 3 literojn en Esperanto aŭ en Langugu por traserĉi la korpuson"
      value.sync="searchedText"
    />
    <template v-if="searchedText.length > 2">
      <ListOfMatchesLangugu
        :matches="EOLUMatches"
        :title="'Esperanto -> Langugu matches'"
        :title-color="'green'"
        :other-language-code="'EO'"
        :is-other-language-bolded="true"
      />
      <ListOfMatchesLangugu
        :matches="LUEOMatches"
        :title="'Langugu -> Esperanto matches'"
        :other-language-code="'EO'"
        :is-langugu-bolded="true"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { EsperantoLanguguSentenceRow } from '~/types'
import ListOfMatchesLangugu from '~/components/ListOfMatchesLangugu.vue'

@Component({
  components: {
    ListOfMatchesLangugu
  }
})
export default class SearchBlock extends Vue {
  searchedText: string = ''
  get stringToMatch(): string { return this.searchedText.toLowerCase() }

  get EOLUSRows(): EsperantoLanguguSentenceRow[] { return [...this.$store.state.esperantoLanguguSentenceRows] }
  get EOLUMatches(): EsperantoLanguguSentenceRow[] { return this.EOLUSRows.filter(sr => sr.esperanto.match(new RegExp(this.stringToMatch, 'i'))).sort((a, b) => a.esperanto.length - b.esperanto.length) };
  get LUEOMatches(): EsperantoLanguguSentenceRow[] { return this.EOLUSRows.filter(sr => sr.langugu.match(new RegExp(this.stringToMatch, 'i'))).sort((a, b) => a.langugu.length - b.langugu.length) };
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
