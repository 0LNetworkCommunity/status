import { writable, get } from 'svelte/store'
import moment from 'moment'
import { postViewFunc, getIndex, getAccountResource } from '../api'
import type { UserAccount, valData, IndexData, SystemInfo, ProofOfFee } from '../types'
import * as systemPayloads from '../api/payloads/system'
import * as validatorPayloads from '../api/payloads/validators'
import * as commonPayloads from '../api/payloads/common'

export interface User {
  address: string
}

// Writable stores
export const validatorList = writable<[]>([])
export const systemInfo = writable<SystemInfo>()
export const pofInfo = writable<ProofOfFee>()

export const commonInfo = writable<object>({})
export const indexStore = writable<object>({})
export const indexDataStore = writable<IndexData>()
export const valDataStore = writable<valData>()
export const selectedAccount = writable<UserAccount>({ address: '' })

export const setAccount = (address: string) => {
  selectedAccount.set({
    address,
  })
  // saveToLocalStorage('selectedUser', a)
}

export const getIndexData = async () => {
  try {
    const data = await getIndex()
    indexDataStore.set(data)
  } catch (error) {
    console.error(`Failed to get index data: ${error}`)
  }
}

export const getValidators = async () => {
  const requests = [
    postViewFunc(validatorPayloads.eligible_validators_payload),
    postViewFunc(validatorPayloads.current_validators_payload),
  ]

  const [eligible, active_set] = await Promise.all(requests)

  const profiles = await fetchUserAccounts(active_set[0])

  const vals: valData = {
    eligible_validators: eligible[0],
    current_list: active_set[0],
    current_profiles: profiles,
  }
  valDataStore.set(vals)
}

export const fetchUserAccounts = async (accounts: string[]): Promise<UserAccount[]> => {
  if (accounts.length == 0) throw 'no accounts'

  const accountsData: UserAccount[] = []
  for (const a of accounts) {
    const requests = [
      postViewFunc(validatorPayloads.all_vouchers_payload(a)),
      postViewFunc(validatorPayloads.vouchers_in_val_set_payload(a)),
      postViewFunc(commonPayloads.account_balance_payload(a)),
    ]

    const [buddies_res, buddies_in_set_res, bal_res] = await Promise.all(requests)

    console.log(buddies_res)
    console.log(buddies_in_set_res)

    const u: UserAccount = {
      address: a,
      active_vouchers: buddies_in_set_res[0],
      all_vouchers: buddies_res[0],
      balance: {
        unlocked: bal_res[0],
        total: bal_res[1],
      },
    }

    accountsData.push(u)
  }

  return accountsData
}

export const getSystemInfo = async () => {
  try {
    // TODO(zoz): it would be better to let these be async and parallel
    const requests = [
      postViewFunc(systemPayloads.fees_collected_payload),
      postViewFunc(systemPayloads.epoch_length_payload),
      postViewFunc(systemPayloads.vdf_difficulty),
      postViewFunc(systemPayloads.infra_balance),
      postViewFunc(systemPayloads.getPoFBidders(true)),
      postViewFunc(systemPayloads.getPoFBidders(false)),
      getAccountResource('0x1', '0x1::musical_chairs::Chairs'),
      getAccountResource('0x1', '0x1::epoch_boundary::BoundaryStatus'),
    ]
    const [
      fees,
      epochResponse,
      vdfDifficulty,
      infraBalance,
      pofBiddersFiltered,
      pofBidders,
      chairs,
      boundaryStatus,
    ] = await Promise.all(requests)

    const duration = moment.duration(Number(epochResponse[0]), 'seconds') // Cast to Number
    const epoch = `${Math.floor(duration.asHours())} hrs : ${duration.minutes()} mins`
    const indexData = get(indexDataStore)

    // TODO(zoz): make this an interface
    const newSystemInfo: SystemInfo = {
      fees: fees[0],
      epoch_duration: epoch,
      vdf: vdfDifficulty,
      infra_escrow: infraBalance[0],
      validator_seats: chairs.seats_offered,
      boundary_status: boundaryStatus,
      ...indexData,
    }

    const pof: ProofOfFee = {
      bidders: pofBidders[0],
      bids: pofBidders[1],
      qualified: pofBiddersFiltered[0],
    }

    systemInfo.set(newSystemInfo)
    pofInfo.set(pof)
    // Save to local storage
    // saveToLocalStorage('systemInfo', newSystemInfo)
  } catch (error) {
    console.error(`Failed to get system info: ${error}`)
  }
}

// Function to refresh all data
export const refresh = async () => {
  try {
    // this should be done async, without the await
    getIndexData()
    getSystemInfo()
    getValidators()
  } catch (error) {
    console.error(`Failed to refresh: ${error}`)
  }
}
