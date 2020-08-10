<template>
  <div>
    <SearchBlock class="mt-6" />
    <Versioning />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import SearchBlock from '~/components/SearchBlock.vue'
import Versioning from '~/components/Versioning.vue'

@Component({
  components: {
    SearchBlock,
    Versioning
  }
})
export default class App extends Vue {
  fetch({ store }: Context) {
    store.dispatch('getStoreData')
  }
}
</script>

<style lang="scss" scoped>
</style>
