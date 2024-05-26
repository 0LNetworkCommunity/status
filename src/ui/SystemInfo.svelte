<script>
  import 'uikit/dist/css/uikit.min.css'
  import { systemInfo } from '../store'
  import { scaleCoin } from "../utils/coin"

  import Card from './Card.svelte'
</script>

<Card title="System Information" style="primary">

  <div slot="body">
    {#if $systemInfo}
      <ul>
        <li>Chain ID: {$systemInfo.chain_id}</li>
        <li>Epoch: {$systemInfo.epoch}</li>
        <li>Ledger version: {$systemInfo.ledger_version}</li>
        <li>Oldest ledger version: {$systemInfo.oldest_ledger_version}</li>
        <li>Fees collected: {scaleCoin($systemInfo.fees)}</li>
        <li>Epoch reward: {scaleCoin($systemInfo.consensus_reward)}</li>

      </ul>
      <ul>
        <!-- Display part 2 of the system information -->
        <li>Ledger Timestamp: {$systemInfo.ledger_timestamp}</li>
        <li>Node Role: {$systemInfo.node_role}</li>
        <li>Oldest Block Height: {$systemInfo.oldest_block_height}</li>
        <li>Block Height: {$systemInfo.block_height}</li>
        <li>Git Hash: {$systemInfo.git_hash}</li>
        <li>Epoch Duration: {$systemInfo.epoch_duration}</li>
      </ul>
      <ul>
        <li>Infra Escrow: {scaleCoin($systemInfo.infra_escrow)}</li>

      </ul>

      <ul>
        <li>Val Seats: {$systemInfo.validator_seats}</li>
      </ul>
    {:else}
      <span>Loading...</span>
    {/if}
  </div>
</Card>
