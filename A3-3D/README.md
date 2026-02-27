## Your Tasks in A3

### 0. Download and Run the Code (1 point)

- Install three.js by running
  ```
  npm i -S three
  npm i --save-dev @types/three
  ```
- Put the provided `3d` folder into your `static` folder. This folder contains 3D models and texture images we will use in this assignment.
- Put `Helper-3D.ts` into `src/lib/` folder
- As always, copy and paste the content of `A3.svelte` into your `src/routes/A3/+page.svelte` file.

With `npm run dev`, you should see a 3D demo in `http://localhost:5173/A3`.

### 1. Replace Dummy Data with Real Data (1 point)

The current 3D scene uses hardcoded dummy data. Replace it with real data from the summer movie dataset.

- Look for `TODO-1` in the code
- Load the `summer_movies.csv`
- Group movies by year and count how many belong to each genre (e.g., Comedy, Romance, Drama)
- Build a `TStackRow[]` array sorted by year

### 2. Add Expressive 3D Objects (3 points)

Replace the default 3D models with your own to make the scene more expressive, engaging and fun!

- Look for `TODO-2` in the code
- Find free `.glb` models online (e.g., [poly.pizza](https://poly.pizza), [Sketchfab](https://sketchfab.com), [Kenney](https://kenney.nl/assets), [Fab](https://www.fab.com))
- Place your models in the `/static/3d/` folder and update the file paths in the code
- Adjust `scale`, `position`, and animation settings as needed
- If a model has no animations, guard the animation code accordingly

### 3. Change Bars to Unit Visualization with Unique Shapes (3 points)

Transform the plain bars into a unit visualization where each individual movie is represented as its own 3D object, with a distinct shape and material per genre.

- Look for `TODO-3` in the code (`TODO-3a`, `TODO-3b`, `TODO-3c`)
- **TODO-3a**: Give each genre a unique geometry.
- **TODO-3b**: Replace `createBars()` with a unit visualization — each movie is a separate 3D object, stacked vertically per year
- **TODO-3c**: Update `createLegend()` to use genre-specific shapes and materials

### 4. Reflect on Pros and Cons of 3D Visualization (2 points)

Write a short reflection comparing this 3D visualization with the 2D bar chart from A1. Consider the concepts from the "Why and Why Not 3D" lecture.

- **Pros**: What advantages does the 3D visualization offer?
- **Cons**: What drawbacks or challenges does it introduce?
- **Proposed Solutions**: For one con you identify, propose a practical solution (implementation not required)

### 5. Submission

Submit a PDF file in Canvas with the following:

- URL links to your demo and your GitHub repository
- Screenshots of your implementation
- The reflection from Task 4
- If you used GenAI tools (e.g., ChatGPT, Copilot, Claude Code, Codex), clearly attribute their usage in your writeup

---

## Rubrics

| Task | Full Points | Partial Credit | Minimal Attempt | No Marks |
|------|------------|----------------|-----------------|----------|
| **0. Download and Run** | **1 pt** — 3D scene loads and renders without errors. | | **0.5 pts** — Scene loads but has minor errors or warnings. | **0 pts** — Scene does not load or has major errors. |
| **1. Replace Dummy Data** | **1 pt** — Data loads correctly and is aggregated by year and genre. | **0.5 pts** — Data loads but aggregation has minor issues (e.g., missing years or incorrect counts). | **0.25 pts** — Data loading is attempted but does not work correctly. | **0 pts** — Dummy data is unchanged or data fails to load. |
| **2. Add Expressive 3D Objects** | **3 pts** — At least 1 extra 3D object is added; model is properly scaled, positioned, and fits the scene. | **2 pts** — An object is added but has visual issues (e.g., wrong scale, positioning, or rendering problems). | **1 pt** — An attempt is made but the object does not render or is not visible. | **0 pts** — No extra 3D objects are added. |
| **3. Unit Visualization with Unique Shapes** | **3 pts** — Unit visualization is fully implemented (one object per movie); genres are visually distinguishable from each other. | **2 pts** — Unit visualization partially works, or genres are not visually distinct. | **1 pt** — An attempt is made but unit stacking is broken or incomplete. | **0 pts** — No changes to the bar visualization. |
| **4. Reflect on Pros and Cons** | **2 pts** — Clearly discusses pros, cons, and proposes a thoughtful solution for one con. | **1 pt** — Reflection is incomplete (e.g., missing pros, cons, or proposed solution) or lacks insights. | **0.5 pts** — Only a brief or superficial comment is provided. | **0 pts** — No reflection provided. |
