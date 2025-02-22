## Preparation
We will continue using the project folder from A0. 
Please move the `src/routes/+page.svelte` you created in A0 into `src/routes/A0/+page.svelte`, which can be now accessed via `http://localhost:5173/A0`. 
Similarly, we will create `src/routes/A1/+page.svelte` for this assignment.

We will need to install d3 for this assignment. Run
```
npm i -S d3
npm i --save-dev @types/d3
```

## Introduce the Summer Movies DataSet
In this assignment, we will explore summer movies ( movies with "summer" in their title ) using visualization. [This dataset](https://github.com/Visual-Intelligence-UMN/5609Visualization-Assignments/blob/main/A1-Visual-Encoding/summer_movies.csv) is coming from [IMDb Non-Commercial Datasets](https://developer.imdb.com/non-commercial-datasets/).
Please download the dataset and put it in the `static` folder of your project.

Variables in `summer_movies.csv`

| variable        | class     | description                                                                                                        |
| :-------------- | :-------- | :----------------------------------------------------------------------------------------------------------------- |
| tconst          | character | alphanumeric unique identifier of the title                                                                        |
| title_type      | character | the type/format of the title (movie, video, or tvMovie)                                                            |
| primary_title   | character | the more popular title / the title used by the filmmakers on promotional materials at the point of release         |
| original_title  | character | original title, in the original language                                                                           |
| year            | integer   | the release year of a title                                                                                        |
| runtime_minutes | integer   | primary runtime of the title, in minutes                                                                           |
| genres          | character | includes up to three genres associated with the title (comma-delimited)                                            |
| simple_title    | character | the title in lowercase, with punctuation removed, for easier filtering and grouping                                |
| average_rating  | double    | weighted average of all the individual user ratings on IMDb                                                        |
| num_votes       | integer   | number of votes the title has received on IMDb (titles with fewer than 10 votes were not included in this dataset) |


## Your Tasks

### 1. Load Data
A template code has been provided in this folder. 
- Add the `types.ts` file to your `src` folder
- Copy and paste the content of the `A1.svelte` into your `src/routes/A1/+page.svelte` file. Follow the tips included in the template code to properly format the CSV file.

If the data is properly formated, run `npm run dev`, open `http://localhost:5173/A1`, you should see something like this in your browser's console.  
<img width="300" alt="image" src="https://github.com/user-attachments/assets/7beb6da8-4205-48b3-8ec8-476d16d5785d" />




### 2. Draw Genre Distribution

- Add the `Bar.svelte` to your `src/lib` folder. And add the content below to `src/lib/index.ts`
  ```
  import Bar from './Bar.svelte'
  export {Bar}
  ```
  
- Import and use the Bar compoenent to your A1 page `src/routes/A1/+page.svelte`:
  - Add the import statement ```import Bar from "$lib/Bar.svelte";``` to the `<script>` section.
  - Use the Bar component by adding  ``` <Bar {movies} /> ``` to the bottom of the file.
  
- Following the instructions to finalize the implementation of `Bar.svelte`.  Comments start with `tip` indicate the sections you need to complete.


### 3. Sketch Visual Designs
For **each** of the following questions, sketch at least three different visualizations. 
Please explore diverse visual encodings for each question. 
Explain each of your sketches (data attributes, marks, and visual channels), compare the three sketches and decide one design that is better than the others in effectively addressing the question.

- Q1: How do the annual top three movie genres (by number of movies) change over time?
- Q2: Are there any correlations between different genres? For example, which genre often co-occurs with comedy in a movie?

### 4. Implement Your Visualizations

Finally, implement the chosen design for each question and publish them in your Github Page. 
Answer the two questions using your visualizations.

### 5. Submission
In Canvas, please submit a PDF report, including 
- a) your sketches of 3x2 visualizations, explaining the visual encodings (the meaning of x axis, y axis, color, size, etc) 
- b) justifications for choosing one visualization over others for each question
- c) a screenshot of the two implemented visualizations
- d) the insights you gained regarding each question from the implemented visualization
- e) links to your github page and repository. 
  
**Important:** Do not run new deployment or update your main branch after the submission deadline, as this may result in point deductions. 

**Grading:**

|        | **100%**                                                                                     | **80%**                                                        | **50%**                                                    |
|--------------------------------------|----------------------------------------------------------------------------------------------|----------------------------------------------------------------|------------------------------------------------------------|
| **Data Loading (1 pts)**               | Data loads without errors and is formatted correctly.                                         |       | Dataset loads but is incorrectly formatted  |
| **Genre Distribution (1 pts)**    | Bar chart works as shown in the demo, with clear labeling and hover-on interactions.         | Bar chart works but lacks clear labeling (e.g., axis, numbers on bars) or hover interactions. | Bar chart has obvious bugs or fails to display data correctly.       |
| **Q1: Sketch Visualizations (1.5 pts)**| Provides 3 diverse designs, explains the data attributes and visual encodings clearly | Designs overlap significantly, or explanations lack clarity.   | Fewer than 3 designs are provided, or none of the 3 designs can anwser the question. |
| **Q1: Choose One Design (0.5 pts)**        | Justifies why chosen a certain design    |     | Justification is vague or incomplete.         |
| **Q1: Implement Visualizations (1.4)** | The chosen visualization is implemented. | Visualization works but lacks clear labeling. | Implementation has obvious bugs. |
| **Q1: Report Insights (0.6 pts)**      | A short paragraph clearly answers the question using the visualization. |      | A paragraph is provided but lacks clarity or insight |
| **Q2: Sketch Visualizations (1.5 pts)**| Provides 3 diverse designs, explains data attribute types and visual encodings clearly | Designs overlap significantly, or explanations lack clarity.   | Fewer than 3 designs are provided, or none of the 3 designs can anwser the question. |
| **Q2: Choose One Design (0.5 pts)**        | Justifies why chosen a certain design    |     | Justification is vague or incomplete.         |
| **Q2: Implement Visualizations (1.4)** | The chosen visualization is implemented. | Visualization works but lacks clear labeling. | Implementation has obvious bugs. |
| **Q2: Report Insights (0.6 pts)**      | A short paragraph clearly answers the question using the visualization. |      | A paragraph is provided but lacks clarity or insight |

