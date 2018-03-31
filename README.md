# Marshmalians
Fabiha Ahmed, Max Zlotskiy, Connie Lei, Cynthia Cheng

## Data Description and Source
How race and gender, and college attended affect your income. https://www.payscale.com/college-salary-report/bachelors?page=101

## Relevance/Significance
We're hoping to show trends between race, gender, college attended, and future salary

## Explanation, in broad strokes if necessary, of how you aim to make this data come alive.
We will make this data come alive by showing moving pieces going from college attended, placed on the left side of the screen, across the screen to future income earned. 
https://www.nytimes.com/interactive/2018/03/19/upshot/race-class-white-and-black-men.html

## What will be shown, absent user interaction?
The top five best colleges for salary potential will be the initial graph shown, with the colleges on one side and pieces flowing through the early career salaries in the middle to the mid career salaries on the other side.

## How will user interact with your visualization?
The user will get to search for another college to see on the graph instead, and remove the current colleges shown on the graph. They will also be able to choose a specific race or gender which will show different colored pieces for different races or genders.

## What questions will your visualization allow user to explore? What questions will it provoke?
It will allow the user to find out if colleges affect future salary.

## Explanation of D3 feature utilization.
We plan to use SVG objects to move the peices of moving data to display how different factors affect one's future income. Each dot (representing each person) on the map will be its own div or svg element - this allows us to modify the color of the region and movement with D3. It will form a live animated map. 
