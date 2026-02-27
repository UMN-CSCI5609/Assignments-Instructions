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

### 3. Change Bars to Stacked Bars with Unique Shapes (3 points)

Transform the plain box bars into a stacked bar chart where each genre has a distinct 3D shape and material.

- Look for `TODO-3` in the code (`TODO-3a`, `TODO-3b`, `TODO-3c`)
- **TODO-3a**: Give each genre a unique geometry.
- **TODO-3b**: Replace `createBars()` with `createStackedBars()` — each movie is a separate 3D object, stacked vertically per year
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
