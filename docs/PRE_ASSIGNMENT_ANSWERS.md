# Pre-Assignment Question & Answer

## What do you think are the greatest areas of risk in completing the project?

- Preventing the API from getting too many requests.
- Displaying correctly and smoothly the data in the graph.

## What changes/additions would you make to the design?

- Display more information about each repository during the search or after selecting it.
- Tabs to group different graphs and store multiple lists of repositories.

## List two or three features that you would consider implementing in the future that would add significant value to the project

- Grouping the selected repositories into tabs or lists to compare repositories of different topics or owners or anything desired by the user.
- Add another input for tags to narrow down the results into a more specific query.
- Toggle the visibility of a repo in the graph with a button, instead of having to remove it from the array.
- Sort the selected repositories.

## Are there any clarifying questions you would ask? If you're able to make assumptions about these and continue, please record and share your assumptions

- Should we limit the number of results from the API?
  - The API's default limit is 30, so it's safe to leave it untouched, but it could retrieve thousands of results and cause issues with the performance or the UI
- What should happen if the user selects a repository that's already stored?
  - The simplest solution would be to notify the user of the error.
  - Another option is not render it or disable it while rendering the suggestions.
