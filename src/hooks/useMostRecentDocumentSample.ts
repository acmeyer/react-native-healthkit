import { useCallback, useState } from 'react'

import useSubscribeToChanges from './useSubscribeToChanges'
import queryDocumentSamples from '../utils/queryDocumentSamples'

import type { HKDocumentTypeIdentifier } from '../native-types'
import type { HKDocumentSample } from '../types'

function useMostRecentDocumentSample<T extends HKDocumentTypeIdentifier>(identifier: T) {
  const [document, setDocument] = useState<HKDocumentSample<T> | null>(null)
  const updater = useCallback(() => {
    void queryDocumentSamples(identifier, {
      limit: 1,
      ascending: false,
    }).then((latestDoc) => setDocument(latestDoc[0] ?? null))
  }, [identifier])

  useSubscribeToChanges(identifier, updater)

  return document
}

export default useMostRecentDocumentSample
