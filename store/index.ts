import { Store } from 'vuex/types/index'
import { isDefined } from '~/tools/type-guards'
import { SentenceRow, emptySentenceRowFactory } from '~/types'

type State = {
  sentenceRows: SentenceRow[]
}

export const state = (): State => ({
  sentenceRows: []
})

export const mutations = {
  setSentenceRows (state: State, payload) {
    state.sentenceRows = payload
  }
}

export const actions = {
  async getStoreData (store: Store<State>) {
    const googleSpreadsheetId = '1aeo2v0MG6VGSio12-t0issmL1N2DIdwG4l5GpMFBVIc'
    const url = `https://spreadsheets.google.com/feeds/cells/${googleSpreadsheetId}/1/public/full?alt=json`
    const json = await (this as any).$axios.$get(url)
    const entries = json.feed.entry.map(e => e.gs$cell)

    let sentenceRows: SentenceRow[] = []
    for (const entry of entries) {
      const { row, col, inputValue } = entry
      const sentenceRowPatch = {
        ...(col === '1' && { english: inputValue }),
        ...(col === '2' && { globasa: inputValue })
      }
      const sentenceRow = sentenceRows[row]
      sentenceRows[row] = isDefined(sentenceRow) ? { ...sentenceRow, ...sentenceRowPatch } : { ...emptySentenceRowFactory(), ...sentenceRowPatch }
    }
    sentenceRows = sentenceRows.filter(wR => isDefined(wR))
    // remove the first row that names the columns
    sentenceRows.shift()
    // remove the rows that are comments
    sentenceRows = sentenceRows.filter(sr => !sr.english.includes('--'))
    store.commit('setSentenceRows', sentenceRows)
  }
}
