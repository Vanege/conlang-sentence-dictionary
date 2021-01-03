<template>
  <div>
    <TargetedConlangSelector />
    <div class="ma-2">
      <template v-if="targetedConlang === 'Globasa'">
        <SearchBlock class="mt-6" />
        <Versioning />
      </template>
      <template v-if="targetedConlang === 'Langugu'">
        <SearchBlockLangugu class="mt-6" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import TargetedConlangSelector from '~/components/TargetedConlangSelector.vue'
import SearchBlock from '~/components/SearchBlock.vue'
import Versioning from '~/components/Versioning.vue'
import SearchBlockLangugu from '~/components/SearchBlockLangugu.vue'

@Component({
  components: {
    TargetedConlangSelector,
    SearchBlock,
    Versioning,
    SearchBlockLangugu
  }
})
export default class App extends Vue {
  fetch({ store }: Context) {
    store.dispatch('getStoreData')
  }

  get targetedConlang(): string { return this.$store.state.targetedConlang }
}
</script>

<style lang="scss" scoped>
</style>
