<!-- mianly inspired by https://github.com/LeaVerou/svelte-scrolly/blob/main/Scrolly.svelte -->
<!-- accept styles
--scrolly-story-width (default 1fr)
--scrolly-viz-width (default 1fr)
--scrolly-margin (default 30px)

--scrolly-viz-top (default 2em)
--scrolly-gap (default 4em)

--scrolly-layout: viz-first (default story-first)
 -->
<script lang="ts">
  import { onMount } from "svelte";
  type Props = {
    progress?: number;
    progressRaw?: number;
    threshold?: number;
    margin?: number;
    debounce?: number | boolean; // debounce delay in ms, or false to disable.  the delay between the last scroll event and the update of the progress, can optimize performance when the scroll event is too frequent
    throttle?: number | boolean; // throttle delay in ms, the minimum time between two progress updates, can optimize performance when the scroll event is too frequent
  };
  let {
    progress = $bindable(),
    progressRaw,
    threshold = 0.5,
    margin = 30,
    debounce = false,
    throttle = false,
  }: Props = $props();

  let container: HTMLElement, vizContainer;
  let minTop: number, maxTop: number;
  let pageTop;
  let rect: DOMRect;
  let intersectionObserver, resizeObserver: ResizeObserver;
  let intersectionRatio = 0;

  const clamp = (min: number, value: number, max: number) =>
    Math.min(Math.max(min, value), max);
  const getProgress = (value: number, min: number, max: number) =>
    (100 * (value - min)) / (max - min);
  const runImmediately = (fn: any) => fn();
  const identity = (fn: any) => fn;

  let last = 0;
  let throttled = $derived(
    (throttle as number) > 0
      ? function (fn: any) {
          return function () {
            let now = performance.now();
            if (now - last >= (throttle as number)) {
              fn();
              last = now;
            }
          };
        }
      : identity,
  );

  let debouncerId: number;
  let debounced = $derived(
    debounce
      ? (debounce as number) > 0
        ? function (fn: any) {
            clearTimeout(debouncerId);
            debouncerId = setTimeout(fn, debounce as number);
          }
        : function (fn: any) {
            cancelAnimationFrame(debouncerId);
            debouncerId = requestAnimationFrame(fn);
          }
      : runImmediately,
  );

  onMount(() => {
    function calculateProgress({
      top = container.getBoundingClientRect().top,
    }: { top?: number } = {}): void {
      progressRaw = getProgress(top, minTop, maxTop);
      // console.table({ minTop, maxTop, pageTop, top, progress, progressRaw });
      updateProgress();
    }

    function updateProgress() {
      let clampedProgress = clamp(0, progressRaw as number, 100);

      if (clampedProgress === 0 || clampedProgress === 100) {
        // 0% and 100% should happen immediately
        progress = clampedProgress;
      } else {
        debounced(throttled(() => (progress = clampedProgress)));
      }
    }

    function calculateBounds() {
      rect = container.getBoundingClientRect();

      // progress = 0 when the top of the container passes threshold% of the viewport
      // OR when we’re scrolled all the way to the top,
      // whichever is greater
      pageTop = window.scrollY + rect.top; // this is always constant
      minTop = Math.min(pageTop, innerHeight * threshold) + margin;

      // progress = 100 when the bottom of the container is at the bottom of the viewport (minus the margin),
      maxTop = innerHeight - rect.height + margin;

      calculateProgress(rect);
      // console.table({margin, minTop, maxTop, pageTop, top: rect.top, height: rect.height, progress, progressRaw });
    }

    intersectionObserver = new IntersectionObserver((entries) => {
      let lastEntry = entries.at(-1)!;
      intersectionRatio = lastEntry.intersectionRatio;

      if (lastEntry.isIntersecting) {
        calculateBounds();
        calculateProgress();
        window.addEventListener("scroll", calculateProgress);
        window.addEventListener("resize", calculateBounds);
        resizeObserver?.observe(container);
      } else {
        window.removeEventListener("scroll", calculateProgress);
        window.removeEventListener("resize", calculateBounds);
        resizeObserver?.unobserve(container);
      }
    });

    intersectionObserver.observe(container);

    resizeObserver = new ResizeObserver(calculateBounds);

    calculateBounds();
  });
</script>

<section
  class="scrolly"
  bind:this={container}
  style="--scrolly-margin: {margin}"
>
  <section class="story">
    <slot />
  </section>
  <section class="viz" bind:this={vizContainer}>
    <slot name="viz" />
  </section>
</section>

<style>
  .scrolly {
    position: relative;
    display: grid;
    grid-template-columns: var(--scrolly-story-width, 1fr) var(
        --scrolly-viz-width,
        1fr
      );
    grid-auto-flow: row dense;
    gap: var(--scrolly-gap, 4rem);
  }

  .viz,
  .story {
    grid-row: 1;
  }

  .viz {
    position: sticky;
    top: max(var(--scrolly-margin, 0) * 1px, var(--scrolly-viz-top, 2em));
    max-height: 100vh;
  }

  @container style(--scrolly-layout: viz-first) {
    .scrolly {
      grid-template-columns: var(--scrolly-viz-width, 1fr) var(
          --scrolly-story-width,
          1fr
        );
    }

    .viz {
      grid-column: 1;
    }

    .story {
      grid-column: 2;
    }
  }

  @container style(--scrolly-layout: overlap) {
    .scrolly {
      grid-template-columns: 1fr;
    }

    .viz,
    .story {
      grid-column: 1;
    }
  }
</style>
