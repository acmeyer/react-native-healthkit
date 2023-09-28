import prepareOptions from './prepareOptions'
import Native from '../native-types'

import type { HKClinicalTypeIdentifier } from '../native-types'
import type { GenericQueryOptions, HKClinicalSample } from '../types'

export type QueryClinicalSamplesFn = <T extends HKClinicalTypeIdentifier>(
  identifier: T,
  options: GenericQueryOptions
) => Promise<readonly HKClinicalSample<T>[]>;

const queryClinicalSamples: QueryClinicalSamplesFn = async (
  identifier,
  options,
) => {
  const opts = prepareOptions(options)
  const clinicalSamples = await Native.queryClinicalSamples(
    identifier,
    opts.from,
    opts.to,
    opts.limit,
    opts.ascending,
  )
  return clinicalSamples.map((s) => ({
    ...s,
    endDate: new Date(s.endDate),
    startDate: new Date(s.startDate),
  }))
}

export default queryClinicalSamples
