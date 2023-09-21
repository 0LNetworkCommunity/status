import type { ViewObj } from '../../types'

export const fees_collected_payload: ViewObj = {
  function: '0x1::transaction_fee::system_fees_collected',
  type_arguments: [],
  arguments: [],
}

export const epoch_length_payload: ViewObj = {
  function: '0x1::block::get_epoch_interval_secs',
  type_arguments: [],
  arguments: [],
}

export const vdf_difficulty: ViewObj = {
  function: '0x1::tower_state::get_difficulty',
  type_arguments: [],
  arguments: [],
}

export const infra_balance: ViewObj = {
  function: '0x1::infra_escrow::infra_escrow_balance',
  type_arguments: [],
  arguments: [],
}
