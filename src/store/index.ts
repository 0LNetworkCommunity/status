import { writable } from 'svelte/store'

import type {
  UserAccount,
  valData,
  IndexData,
  SystemInfo,
  ProofOfFee,
  govEventData,
  Transaction,
  SupplyData,
} from '../types'

// Writable stores
export const apiReady = writable<boolean>(false)
export const apiUrl = writable<string>()
export const apiUrlNote = writable<string>()

export const validatorList = writable<[]>([])
export const systemInfo = writable<SystemInfo>()
export const pofInfo = writable<ProofOfFee>()

export const commonInfo = writable<object>({})
export const indexStore = writable<object>({})
export const indexDataStore = writable<IndexData>()
export const valDataStore = writable<valData>()
export const selectedAccount = writable<UserAccount>({ address: '' })
export const govStore = writable<govEventData[]>()
export const transactions = writable<Transaction[]>([])
export const supplyStore = writable<SupplyData>()
export const setAccount = (address: string) => {
  selectedAccount.set({
    address,
  })
  // saveToLocalStorage('selectedUser', a)
}
