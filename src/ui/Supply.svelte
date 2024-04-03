<script lang="ts">
  import Card from './Card.svelte'
  import { supplyStore } from '../store'
  import { onMount } from 'svelte'

</script>

<div>
  <Card title="Supply" style="primary">
    <div slot="body">
      {#if $supplyStore && $supplyStore.total > 0}
        <p>Total: {$supplyStore.total.toLocaleString() ?? 0}</p>
        <p>
          Infra Escrow: {$supplyStore.infra.toLocaleString() ?? 0}
          ({(($supplyStore.infra / $supplyStore.total) * 100).toFixed(0)}%)
        </p>
        <p>
          Community Wallets: {$supplyStore.comm.toLocaleString() ?? 0}
          ({(($supplyStore.comm / $supplyStore.total) * 100).toFixed(0)}%)
        </p>
        <p>
          User Supply: {$supplyStore.user.toLocaleString() ?? 0}
          ({(($supplyStore.user / $supplyStore.total) * 100).toFixed(0)}%)
        </p>
        <p>
          Slow Supply: {$supplyStore.slow.toLocaleString() ?? 0}
          ({(($supplyStore.slow / $supplyStore.total) * 100).toFixed(0)}% of total) ({(
            ($supplyStore.slow / $supplyStore.user) *
            100
          ).toFixed(0)}% of user)
        </p>
        <p>
          Circulating Supply: {$supplyStore.circulating.toLocaleString() ?? 0}
          ({(($supplyStore.circulating / $supplyStore.total) * 100).toFixed(0)}% of total) ({(
            ($supplyStore.circulating / $supplyStore.user) *
            100
          ).toFixed(0)}% of user)
        </p>
      {:else}
        ...
      {/if}
    </div>
  </Card>
</div>
