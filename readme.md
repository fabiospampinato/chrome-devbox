# DevBox ([DOWNLOAD](https://chrome.google.com/webstore/detail//TODO))

A collection of utilities for web developers.

## Dashboard

The dashboard is a way to quickly access each tool.

## Utilities

| [Actions]()        | [Native Tools]()      | [Custom Tools]()         |
| ------------------ | --------------------- | ------------------------ |
| [Clear Console]()  | [FPS Meter]()         | [Element Outliner]()     |
| [Start Debugger]() | [Layer Outliner]()    | [Lag Radar]()            |
|                    | [Paint Highlighter]() | [Mutation Highlighter]() |
|                    |                       | [Rulers]()               |

## Actions

Actions are ephimeral functions that just do one thing when invoked.

### Clear Console

Clears the console. Useful for clearing out debug logging before interacting with the app again.

### Start Debugger

Starts the debugger. Useful for debugging things like popovers which may otherwise close themselves as soon as the window loses focus.

## Native Tools

Native tools are debugging utilities implemented by the browser itself, and require using the Chrome Debugging Protocol to trigger them, and they work even if the DevTools window is not open.

### FPS Meter

Renders the current frames per second (FPS) of the page. Useful for checking the smoothness of an interaction.

### Layer Outliner

Renders an outline around each rendering layer in the page. Useful to make sure the layers that are used make sense, as having too many of them can be slow.

### Paint Highlighter

Renders a rectangle over areas that are repainted by the browser. Useful for checking that the browser is not repaiting too much stuff unnecessarily, which would be slow.

## Custom Tools

Custom tools are additional utilities that are implemented in userland by the extension.

### Element Outliner

Renders an outline around each element in the page, along with a label counting itself and its children, unless that level would be 1 (i.e. only if the element has children).

Useful for checking that we aren't paying for things we can't see (unopened popovers etc.), and for checking that what we can see is using a reasonable number of elements.

### Mutation Highlighter

//TODO

### Rulers

Renders a pair of rulers on the page, optionally with a grid too. Useful for checking that things are properly aligned in the page.

## License

MIT © Fabio Spampinato
