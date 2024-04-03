<script>
  import 'uikit/dist/css/uikit.min.css'

  import { onMount } from 'svelte'
  import { initApi, setApi } from '../api'
  import { apiUrl, apiUrlNote } from '../store'
  import { refresh } from '../store/get_system_info'
  import Supply from '../ui/Supply.svelte'

  onMount(async () => {
    await initApi() // ONLY DO THIS ONCE ON LOAD

    refresh()

    setInterval(
      refresh,
      60000, // 60 secs
    )
  })
</script>

<main class="uk-text-small">
  <div class="uk-grid">
    <div class="uk-column-1-2 uk-margin-bottom">
      <div class="">
        {#if $apiUrl}
          <input
            class="uk-input"
            type="text"
            placeholder={$apiUrl}
            aria-label="Input"
            bind:value={$apiUrl}
          />
          <button class="uk-button uk-button-default" on:click={setApi($apiUrl)}>update url</button>
          <button class="uk-button uk-button-default" on:click={refresh}>refresh</button>
          note: {$apiUrlNote}
        {/if}
      </div>
    </div>
            <Supply />

    <!-- <div class="uk-flex">
      {#if $selectedAccount && $selectedAccount.address}
        <AccountView />
      {:else}
        <SystemInfo />
        <BoundaryStatus />
        <GovEvents/>
      {/if}
    </div>
    <div class="uk-flex">
      <Validators />
    </div>
    <div class="uk-flex">
      <TransactionTable />
    </div>
  </div> -->
</main>
