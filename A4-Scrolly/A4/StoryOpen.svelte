<script lang="ts">
  import { Scroll } from "$lib";

  import { slide, fly } from "svelte/transition";

  type Props = {
    movieNum: number;
  };
  let { movieNum }: Props = $props();

  let progress: number = $state(0);
</script>

<Scroll bind:progress --scrolly-story-width="0">
  <div id="virtual"></div>
  <div slot="viz" class="header">
    <h1>Summer Movies</h1>

    {#if progress > 30}
      <p
        in:slide={{
          duration: 1000,
          axis: "x",
        }}
      >
        A Deep Dive into {movieNum} Movies Released Between 1945 and 2023
      </p>
    {/if}

    {#if progress > 70}
      <p in:fly={{ duration: 800, x: 0, y: 200 }}>with data visualizations</p>
    {/if}
  </div>
</Scroll>

<!-- <svelte:window bind:scrollY={progress} /> -->

<style>
  .header {
    background-color: rgb(255, 228, 193);
    padding: 80px 60px;
    height: 60vh;
    width: 800px;
  }
  #virtual {
    height: 150vh; /* Make the page scrollable with a 150% view height */
  }
  h1 {
    font-size: 10vh;
    color: #433417; /* Darker text for better contrast */
    font-weight: 600; /* Slightly bolder font weight */
  }
  p {
    font-size: 3vh;
    color: #666;
  }
</style>
