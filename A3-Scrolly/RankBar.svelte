<script lang="ts">
  import { fade } from "svelte/transition";
  import type { TMovie } from "../types";
  import * as d3 from "d3";
  // define the props of the Bar component
  type Props = {
    movies: TMovie[];
    progress?: number;
    width?: number;
    height?: number;
  };
  // progress is 100 by default unless specified
  let { movies, progress = 100, width = 500, height = 400 }: Props = $props();

  let selectedGenre: string = $state('');

  // processing the data; $derived is used to create a reactive variable that updates whenever the dependent variables change
  const yearRange = $derived(d3.extent(movies.map((d) => d.year)));

  function getUpYear(yearRange: [undefined, undefined] | [Date, Date]) {
    if (!yearRange[0]) return new Date();
    const timeScale = d3.scaleTime().domain(yearRange).range([0, 100]);
    return timeScale.invert(progress);
  }
  const upYear: Date = $derived(getUpYear(yearRange!));

  function getGenreNums(movies: TMovie[], upYear: Date) {
    let res: { [genre: string]: number } = {};
    movies
      .filter((movie) => movie.year <= upYear)
      .forEach((movie) => {
        movie.genres.forEach((genre: string) => {
          res[genre] = (res[genre] || 0) + 1;
        });
      });
    return res;
  }

  const genreNums = $derived(getGenreNums(movies, upYear));
  const genreRank = $derived(Object.entries(genreNums));

  // drawing the bar chart
  const margin = {
    top: 0,
    bottom: 100,
    left: 70,
    right: 20,
  };

  let usableArea = {
    top: margin.top,
    right: width - margin.right,
    bottom: height - margin.bottom,
    left: margin.left,
  };

  const yBarheight: number = 17
  const totalHeight = $derived(
    genreRank.length * (yBarheight + 2)
  );
  const yScale = $derived(
    d3.scaleBand()
      .range([totalHeight, usableArea.top])
      .domain(genreRank.sort((a, b) => a[1] - b[1]).map(([genre, _]) => genre))
      .padding(0.1),
  );

  const xScale = $derived(
    d3.scaleLinear()
      .range([usableArea.left, usableArea.right - usableArea.left])
      .domain([0, d3.max(Object.values(genreNums)) || 0]),
  );

</script>

<h3>
  The Ranking of Genres {yearRange[0]?.getFullYear()} - {yearRange[1]?.getFullYear()}
</h3>

{#if movies.length > 0}
  <svg {width} {height}>
    <g class="bars">
      {#each genreRank as [genre, cnt] (genre)}
        <g class={`${genre} genre`}
            { /* tips1: use the yScale and xScale to position each bar, which will be transited using CSS later */}
            { /* tips2: use the Svelte's built-in fade transition when the bars enter and exit */ }
        >
          <rect 
            width={xScale(cnt)} 
            height={yBarheight} 
            fill={selectedGenre === genre ? "#ff8800" : "#449900"} 
            class="bar" 
            opacity={selectedGenre === genre ? 1 : 0.8} 
            on:mouseover={() => { selectedGenre = genre }} 
            on:mouseout={() => { selectedGenre = "" }}
          />
          <text
            x={0}
            y={(yBarheight + 2) / 2}
            font-size="12"
          >
            {genre}
          </text>
          <text
            x={xScale(cnt)}
            y={(yBarheight + 2) / 2}
            font-size="12"
            text-anchor="middle"
          >
            {cnt} 
          </text>
        </g>
      {/each}
    </g>

    <g transform="translate(0, {usableArea.bottom})" bind:this={xAxis} />
    <g transform="translate({usableArea.left}, 0)" bind:this={yAxis} />
  </svg>
{/if}

<style>
  .genre {
    /** tips3: add transition to the transformation of the bars*/

  }
  .bar {
    transition:
      y 0.1s ease,
      height 0.1s ease,
      width 0.1s ease; /* Smooth transition for height */
  }
</style>
