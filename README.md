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
| `backgroundOpacity`  | number  | how dark the background tint should be | `0.4` |
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
![Screen Shot 2022-05-16 at 4 48 55 PM](https://user-images.githubusercontent.com/26094593/168680411-b0080f52-18e3-40d9-8807-dcf0f20b2079.png)

