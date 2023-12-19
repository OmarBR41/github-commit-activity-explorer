# Post-Assignment Question & Answer

## Describe the major design/build decisions and why you made them

- Adding a hook for `useFetch` to isolate the fetch logic, keeping all the loading and error cases in a single hook.
  - Also added a `useDebounce` hook to apply debounce easily to a `useFetch`, but I feel this one still needs more tweaking to make it easier to implement.
- Using Context to manage the global state, since there are multiple components sharing data and handlers.

## How long did the assignment take (in hours)? Please break down your answer into buckets (e.g. "Learning Framework" "Coding", "Debugging")

Total: ~6.5 hours.

- Reading the GitHub API documentation and testing the fetch calls (0.5 mins)
- Building the main project structure and layout UI (2 hrs)
- Coding the logic for fetching and storing the dat (2.5 hrs)
- Graphing the results with a custom tooltip (1.5 hrs)

## If you could go back and give yourself advice at the beginning of the project, what would it be?

- To use Zustand or Redux. I wanted to use React's Context API, but I feel it grew quite a bit, making it now a little hard to read and extend.
- I would split the state into multiple stores with reducers to make it more maintainable.

## Did you learn anything new?

- Yeah! It was a while since I've used a Charts library and Recharts ended up being quite easy to implement and work with, and I liked its design.
- The implementation of both `useFetch` + `useDebounce`. I've used versions of these hooks in other simpler projects, but handling multiple data types in a slightly bigger app was more challenging and required me to refactor and think better about the logic behind the implementation of both hooks together.

## Do you feel that this assignment allowed you to showcase your abilities effectively?

- Yes, it allowed me to work with multiple APIs using fetch calls, custom hooks, data management with React Context, and build an original UI interface using multiple libraries and components.

## Are there any significant web development-related skills that you possess that were not demonstrated in this exercise? If so, what are they?

- I think this exercise covers pretty much the basic skills used on frontend development, like what I mentioned on the previous answer.
- Other web development-related skills could be testing, database management, GraphQL APIs, deployment, SEO, performance metrics.
