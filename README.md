# Vandux

![Build status](https://api.travis-ci.org/benbowes/redux-style-store-vanilla-js.svg?branch=master)

**So you want a Redux solution for components, but you have server rendered DOM that you have no control over?**

Here is an ES6 Pub/Sub pattern with a State Machine pattern combined with Reducers for said situation.

Would I recommend using this over something like React on the server and client? Nope, I would not.

What this will work well for, is those cases when you do not have a universal render, still need SEO compliance, and want predictable/testable state management.

## Demo

https://benbowes.github.io/vandux/dist/?vandux-debug

## Codepen example

https://codepen.io/benbowes/pen/RxrWBE

## Getting started

`npm install -D vandux` or `yarn add vandux`

Then connect your html with a Vandux store. A full example can be found in here: https://github.com/benbowes/vandux/tree/master/src/examples

**Note that Vandux is not currently intended to be a global store**, it is intended to be used at a component/module level. Providing your components with the ability to show you what happened when. You can have several Vandux stores, all working independently.

## A Vandux code example

#### Some html you'd like to "connect" with a Vandux store

```html
<div class="wrapper" data-vx="componentA">
  <p>Name: <span data-vx="componentA__name"></p>
  <p>Title: <span data-vx="componentA__title"></p>

  <p><input type="text" data-vx="componentA__update-name" placeholder="Alter 'Name'"></input></p>
  <p><input type="text" data-vx="componentA__update-title" placeholder="Alter 'Title'"></input></p>
</div>
```

Assuming this folder structure for componentA ...
```
- componentA/
  - reducer.js
  - render.js
  - index.js
```

#### Your entry file

```js
import componentA from './componentA';

document.addEventListener('DOMContentLoaded', () => {
  componentA({ name: '', title: '' }); // Pass in initial state
});
```

#### componentA/index.js

```js
// Component setup function.
// Initial state is passed in to the component, connecting the component with the store.
// It will render with it's initial state automatically using an action of type `INIT`.

import { createStore } from 'vandux';
import reducer from './reducer';
import render from './render';


// Creates a relationship between event listeners and the store.

function addListeners(el, store) {
  el.querySelector('[data-vx=componentA__update-name]').addEventListener('keyup', e =>
    store.publish('UPDATE_NAME', { name: e.target.value }));

  el.querySelector('[data-vx=componentA__update-title]').addEventListener('keyup', e =>
    store.publish('UPDATE_TITLE', { name: e.target.value }));
}

// Setup function, Connecting the component with the store.

export default (initialState) => {
  const el = document.querySelector('[data-vx="componentA"]');

  const store = createStore({ reducer, initialState }).connect([
    'UPDATE_NAME',
    'UPDATE_TITLE'
  ], el, render);

  addListeners(el, store);
};
```

#### componentA/reducer.js

```js
export default function reducer(state = {}, action) {
  switch (action.type) {

    case 'UPDATE_NAME':
      return { ...state, name: action.data.name };

    case 'UPDATE_TITLE':
      return { ...state, title: action.data.title };

    default: return state;
  }
}
```

#### componentA/render.js

```js
let $name;
let $title;

// Render function - perform DOM manipulations in here.

export default function render(state, el, event) {
  $name = $name || el.querySelector('[data-vx=componentA__name]');
  $title = $title || el.querySelector('[data-vx=componentA__title]');

  // Add data to the DOM

  $title.textContent = state.title;
  $name.textContent = state.name;
}
```

## Debug mode
Add the query param `?vandux-debug=true` to your URL to see this kind of output in your browser console. It will show you what happened when, helping you debug race conditions.

```js
wrapper,componentB INIT {name: "", title: ""}
wrapper,componentB UPDATE_NAME {name: "a", title: ""}}
wrapper,componentB UPDATE_NAME {name: "aa", title: ""}
wrapper,componentB UPDATE_NAME {name: "aaa", title: ""}
```
Note the first items are the values of the attributes on the html component - so you can identify which component published the event.

## Thoughts on security

If you are planning to use this with `innerHTML`, be sure to use something like this to sanitise your html https://www.npmjs.com/package/sanitize-html.

Happy coding!
