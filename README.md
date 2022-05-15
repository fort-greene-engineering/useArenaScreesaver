# useArenaScreensaver 🌐

A simple hook that will overlay a screensaver of images from an [are.na](https://www.are.na/) 🌐 channel when users of your site become idle.


# Usage
### Installation  🌱
```
npm i use-arena-screensaver
```
or
```
yarn add use-arena-screensaver
```
### Importing
```
import useArenaScreensaver from 'use-arena-screensaver'
```

### Options
| option  | type | description | example |
| ------------- | ------------- | ------------- | ------------- |
| `timeout`  | number  | Time a user needs to be idle on site before screensaver becomes active  | `1000 * 60 * 2` |
| `timeBetween`  | number  | Time between images appearing once screensaver is active  | `500` |
| `arenaSlug`  | string  | Slug of the are.na channel you want the screensaver to pull from | `things-i-saved-to-my-camera-roll` |

### Example
```jsx
import useArenaScreensaver from 'use-arena-screensaver';

function App() {
  useArenaScreensaver({ arenaSlug: "favorite-muzes", timeout: 1000 * 60 * 5 });
  return (
    ...
  );
}
```
