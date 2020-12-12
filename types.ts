// TODO: change name "english" to "otherLanguage"
export type SentenceRow = {
  english: string
  globasa: string
}

export const emptySentenceRowFactory = (): SentenceRow => {
  return {
    english: '',
    globasa: ''
  }
}

export type WordRow = {
  english: string
  globasa: string
}

export const emptyWordRowFactory = (): WordRow => {
  return {
    english: '',
    globasa: ''
  }
}
