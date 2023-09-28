import prepareOptions from './prepareOptions'
import Native from '../native-types'

import type { HKDocumentTypeIdentifier } from '../native-types'
import type { GenericQueryOptions, HKDocumentSample } from '../types'

export type QueryDocumentSamplesFn = <T extends HKDocumentTypeIdentifier>(
  identifier: T,
  options: GenericQueryOptions
) => Promise<readonly HKDocumentSample<T>[]>;

const queryDocumentSamples: QueryDocumentSamplesFn = async (
  identifier,
  options,
) => {
  const opts = prepareOptions(options)
  const documents = await Native.queryDocumentSamples(
    identifier,
    opts.from,
    opts.to,
    opts.limit,
    opts.ascending,
  )
  return documents.map((s) => ({
    ...s,
    endDate: new Date(s.endDate),
    startDate: new Date(s.startDate),
  }))
}

export default queryDocumentSamples
