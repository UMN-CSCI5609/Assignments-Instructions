# A4: Scrollytelling

## Your Tasks
For your final assignment, no more *'fill-in-the-blank'* to replicate the demo. Instead, you’ll work with the same code from the demo to learn how the scrolly effect is programmed and make required modifications as bleow. (Of course, we’ll provide detailed explanations about the scrolly component).

0. **Download and run the code**
- Simply add the A4 folder provided here into your `src/routes` folder
- Add `Scroll.svelte` into `src/lib` folder. Add lines below to `src/lib/index.ts`
  ``` 
  import Scroll from './Scroll.svelte'
  export {Scroll}
  ``` 
  

  You will see a scrollytelling at `http://localhost:5173/A4`.

1. **Improve the 2D bar chart** 
   While it is fun to observe the changes of genre distribution year by year, it violates the "eyes beat memory" guide: it is hard to anwser the questions such as how has the genre distribution changed compared with 10 years ago. 

   Your task is to 
   - Modify the chart so that it can effectively track and compare changes in genre distribution over time, enabling users to answer such comparison questions **(2 points)**. Consider reuse your implementation from A1.
   - Ensure that the chart updates dynamically with animated transitions as the left-side context scrolls **(2 points)**.

2. **Create a custom 3D visualization**
   The demo demonstrates how to use scrolly to control a 3D scene with Flamingo models.
   Now, it’s your turn to get creative and eevelop your own 3D scrollytelling experience, you can use/modify the 3D scene you built in A3 or even build new ones.
   Your 3D scrollytelling should:
   - A 3D scene is created that includes both data-related elements (e.g., bars) and non-data-related objects (e.g., animal models) **(1 points)**
   - The 3D scene updates smoothly and accurately in response to the scrolling **(3 points)**
   - The narration is clear and effectively introduces and explains the changes in the 3D scene as the user scrolls **(2 points)**

   Here are some examples to inspire you:

   - Introduce each element in the 3D scene. Use the left side to display textual explanations and the right side to add corresponding 3D elements dynamically.
   - Incorporate 3D bars into the scene one by one, narratively explaining each genre in detail as they appear.
  
    Feel free to innovate and explore unique ways to combine storytelling with 3D visuals!

3. **Submission**
   Please submit the URLs of a) your publicly accessible webpage and b) your private GitHub repository via Canvas. 
   
   Make sure **no further deployment** actions are triggered after the submission deadline, as this may result in point deductions.


## Scrolly Tutorials
1. **Using a Scrolly:**
   First, `import {Scroll} from "$lib"`. Then you can create a scrollytelling component using:
   ```svelte
   <script>
   let myProgress = $state(0)
   </script>

   <Scroll bind:progress={ myProgress }>
   	<!-- Story here -->
   	<svelte:fragment slot="viz">
   		<!-- Visualizations here -->
   	</svelte:fragment>
   </Scroll>
   ```

   `myProgress` is a number between [0,100], binded with the scroll elements to indicate the progress of the scrolling.

   You can then pass  `myProgress`  to your visualization components to control it.
   For example, in `src/routes/A4/Scrolly2D.svelte`, we pass it to the `Bar` component to control the year range of the genre distribution.

   ```svelte
      <Scroll bind:progress={myProgress} >
     
     <!-- Story here -->
     
     <!-- visualization here, indicated by slot='viz' -->
     <svelte:fragment slot="viz">
       <Bar {movies} progress={myProgress} />
     </svelte:fragment>
   </Scroll>
   ```
2. **No Text Scrolly Scrolly**
   In `src/routes/A4/StoryOpen.svelte`, we use a non-text scrolly element by using an empty div element whose height is larger than the view height and making the story width as 0.

   ```svelte
   <script>
   let progress = $state(0)
   </script>

   <Scroll bind:progress --scrolly-story-width="0">
     <div id="virtual"></div>
     <div slot="viz" class="header">
       <!-- viz content here -->
     </div>
   </Scroll>
   <style>
     #virtual {
       height: 150vh; /* Make the page scrollable with a 150% view height */
     }
   </style>
   ```
   Note that I am writing `<Scroll bind:progress >` rather than `<Scroll bind:progress={myProgress}>` as my progress variable is named as progress.

3. **Style Options**
The Scrolly component allows for custom styling using CSS variables. Here are some available style options:

   - `--scrolly-story-width` (default: 1fr): Controls the width of the story content.
   - `--scrolly-viz-width` (default: 1fr): Controls the width of the visualization content.
   - `--scrolly-margin` (default: 30px): Sets the margin.
   - `--scrolly-viz-top` (default: 2em): Adjusts the top margin of the visualization.
   - `--scrolly-gap` (default: 4em): Controls the gap between the story and the visualization.
   - `--scrolly-layout` (default: "story-first"): Defines the layout direction. Set to "viz-first" to place the visualization on the left side instead of the story.
  
   For example, you can modify the layout with these styles:


For advanced students, you can even define your own style variables in  `Scroll.svelte`

