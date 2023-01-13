# Football World Cup Score Board - Coding Exercise

## My comments

This project was coded and intended to be simple; no router, no context state, no async operations, no other third party library by purporse.
The `finish game` and `update score` actions were implemented inline, on every list item.
I used the React `useReducer` hook to handle the app state, instead of `useState` by purpose.
There are not unit test but the requirements `use cases` tests in `src/App.test.tsx`.
