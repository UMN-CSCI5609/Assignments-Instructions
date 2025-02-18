## Your Tasks in A2:

### 1. Create a Multi-View Visualization (3 points)

We will create a multi-view visualization similar to this [demo](https://qianwen.info/my-vis-5609/A2).
As usually, we have created some template code for you to start working with.

- Add the `Line.svelte` and `Scatter.svelte` into `src/lib` folder. Add the lines below to `src/lib/index.ts`
  ```ts
  import Scatter from './Scatter.svelte'
  import Line from './Line.svelte'

  export {Scatter, Line}
  ```
- Copy and Paste the content of `A2.svelte` into `src/routes/A2/+page.svelte` (create the `A2` folder and the `+page.svelte` file yourself).

  After this, run `npm run dev`, you should see a dashboard at `http://localhost:5173/A2`. It will resemble the demo, but without interactions and missing the line in the line chart.

- Complete the following required functions as per the instructions provided in the template code. As usually, comments starting with `tip` indicate the section you work on. I used tip1, tip2, tip3, and tip4 for each of the required functions.
  - 1. Implement click interaction in the scatter plot (0.5 pt)  
  - 2. Add a line to the line chart (0.5 pt)
  - 3. Add brush interaction to the line chart, which will update the scatter plot (1 pt)
  - 4. Dynamically bind data attributes to the x, y, and size channels of the scatter plot using a dropdown selection (1 pt)

### 2.Reflect the design of the dashboard (3 points):

Answer the following questions in your PDF report:
- Why do we use opacity = 0.5 for points in the scatter plot? What would happen if the default transparency of all points were set to 1?
- In the current implementation, all attributes can be bound with the three visual channels, leading to inappropriate encodings (e.g., using the x-axis for the title of 895 movies). Which attribute should be removed from the dropdown list for each channel?
- I use the line chart for the year distribution to showcase how to implement the path generator. But is using curve the best choice here? Anything wrong with using the basic curve?


### 3. Conduct Exploratory Datate Analysis (EDA) (4 points)
Using the implemented multi-view visualization, we will conduct an exploratory analysis to explore *"Which factors influence the ratings of summer movies?"*

- First, please list three potential factors that might influence the rating of summer movies based on your prior knowledge or intuition. 
- Then, use the multi-view visualization to investigate the influence of the three proposed factors.
- At least one of your proposed factors should influence/correlate with the movie rating. If all the three factors do no influence the rating, please consider new ones.
- You can either use only the visualizations from step 1 or implement your own additional visualizations for the analysis.

### 4. Submission
Please submit your work as a single PDF on Canvas with the following:
- As usually, the URLs to your demo and your github repo.
- Anwser the three questions in the reflection section
- Document down your EDA: list the three factors you considered, provide screenshots of the visual analytics for each factor, and provide a paragraph for each factor to explain the analysis and your conclusion.
