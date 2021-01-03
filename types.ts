export type SentenceRow = {
  otherLanguage: string
  globasa: string
}

export const emptySentenceRowFactory = (): SentenceRow => {
  return {
    otherLanguage: '',
    globasa: ''
  }
}

export type WordRow = {
  otherLanguage: string
  globasa: string
}

export const emptyWordRowFactory = (): WordRow => {
  return {
    otherLanguage: '',
    globasa: ''
  }
}

export type EsperantoLanguguSentenceRow = {
  esperanto: string
  langugu: string
}

export const emptyEsperantoLanguguSentenceRowFactory = (): EsperantoLanguguSentenceRow => {
  return {
    esperanto: '',
    langugu: ''
  }
}
