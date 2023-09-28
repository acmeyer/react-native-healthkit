import { useCallback, useState } from 'react'

import useSubscribeToChanges from './useSubscribeToChanges'
import queryClinicalSamples from '../utils/queryClinicalSamples'

import type { HKClinicalTypeIdentifier } from '../native-types'
import type { HKClinicalSample } from '../types'

function useMostRecentClinicalSample<T extends HKClinicalTypeIdentifier>(identifier: T) {
  const [document, setDocument] = useState<HKClinicalSample<T> | null>(null)
  const updater = useCallback(() => {
    void queryClinicalSamples(identifier, {
      limit: 1,
      ascending: false,
    }).then((latestDoc) => setDocument(latestDoc[0] ?? null))
  }, [identifier])

  useSubscribeToChanges(identifier, updater)

  return document
}

export default useMostRecentClinicalSample
