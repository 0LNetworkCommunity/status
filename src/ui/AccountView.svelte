<script lang="ts">
  import Card from './Card.svelte'
  import AccountTable from './AccountTable.svelte'
  import { selectedAccount } from '../store'
  import { fetchUserAccounts } from '../store/get_system_info'


</script>

<main>
  {#if $selectedAccount }
  {#await fetchUserAccounts([$selectedAccount.address])}
  ...
  {:then profiles}
  <Card title="User: {$selectedAccount.address.slice(0,5)}" style="primary">

    <div slot="body">
      <button class="uk-button uk-button-default" on:click={() => { selectedAccount.set(null) } }><span>close</span></button>
      <AccountTable profiles={profiles} />
    </div>
  </Card>
  {/await}
  {/if}
</main>
