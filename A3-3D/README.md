## Your Tasks in A3

### 1. Download and Run the Code** (1 point)

-  Install three.js by runing
   ```
   npm i -S three
   npm i --save-dev @types/three
   ```
- Put the provided `3d` folder into your `static` folder. This folder contains 3D models and texture images we will use in this assignment.
- Put `Helper-3D.ts` into `src/lib/` folder
- As always, copy and paste the content of `A3.svelte` into your `src/routes/A3/+page.svelte` file.

With `npm run dev`, you should see a 3D demo in `http://localhost:5173/A2`.

### 2. Replace the Dummy Data with Real Ones (3 points)

In the current 3D demo, dummy data is used for visualization. 
Please replace this dummy data with real data from the summer movie dataset.

Use async/await to load the data before initializing the 3D scene, ensuring that the scene is populated correctly with the relevant information.
Modify the camera, text, or bar positions to ensure there is no visual occlusion.

### 3. Reflect on the Cons and Pros of 3D Visualization (6 points)

Write a reflection discussing the advantages and drawbacks of this 3D visualization compared with the 2D bar chart we created in A1. Consider the concepts discussed in the "Why and Why Not 3D" lecture.
Specifically:
- Pros: What are the advantages of this 3D visualizations? 
- Cons: What are the potential drawbacks or challenges when using this 3D visualizations? 
- Proposed Solutions: For one of the cons you identify, propose potential solutions that could address these issues. You are not required to implement these solutions, but your suggestions should be thoughtful and practical.

### 4. Submission

Submit a PDF file in Canvas with the following:

- URL links to your demo and your GitHub repository.
- The reflection outlined in Task 3.
