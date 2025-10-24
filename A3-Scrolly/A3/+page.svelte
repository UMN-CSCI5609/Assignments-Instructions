<script lang="ts">
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import type { TMovie } from "../../types";
  import StoryOpen from "./StoryOpen.svelte";
  import Scrolly2D from "./Scrolly2D.svelte";

  let movies: TMovie[] = [];

  // Reactive variable for storing the data

  // Function to load the CSV
  async function loadCsv() {
    try {
      const csvUrl = "./summer_movies.csv";
      movies = await d3.csv(csvUrl, (row) => {
        // all values are strings, so use row conversion function to format them
        return {
          ...row,
          num_votes: Number(row.num_votes),
          runtime_minutes: Number(row.runtime_minutes),
          genres: row.genres.split(","),
          year: new Date(row.year),
          average_rating: Number(row.average_rating),
        };
      });

      console.log("Loaded CSV Data:", movies);
    } catch (error) {
      console.error("Error loading CSV:", error);
    }
  }

  // Call the loader when the component mounts
  onMount(loadCsv);
</script>

<div class="container">
  <StoryOpen movieNum={movies.length} />
  <Scrolly2D {movies} />
</div>

<style>
  .container {
    width: 80vw;
    margin: 10px auto;
    padding: 10px;
    align-content: center;
  }
</style>
