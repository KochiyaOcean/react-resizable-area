# react-resizable-area

Create a resizable component with percentage size support.

## Demo

[Link](https://kochiyaocean.github.io/react-resizable-area/demo/)

## Installation
Install the package using npm:

```
npm install react-grid-layout
```

## Example

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { ResizableArea } from 'react-resizable-area'

class Main extends React.Component {
  state = {}
  render () {
    return (
      <ResizableArea
        minimumHeight={{px: 0, percent: 50}}
        minimumWidth={{px: 0, percent: 50}}
        initHeight={{px: 0, percent: 80}}
        initWidth={{px: 0, percent: 80}}
        defaultHeight={{px: 0, percent: 80}}
        defaultWidth={{px: 0, percent: 80}}
        maximumHeight={{px: 0, percent: 100}}
        maximumWidth={{px: 0, percent: 100}}
        parentContainer={document.querySelector('.resizable-container')}
        >
        <div
          style={{backgroundColor: '#03a9f4', width: '100%', height: '100%'}}
          ref={e => !this.state.container && this.setState({ container: e })}
          >
          <ResizableArea
            minimumHeight={{px: 0, percent: 10}}
            minimumWidth={{px: 0, percent: 10}}
            initHeight={{px: 20, percent: 50}}
            initWidth={{px: 20, percent: 50}}
            defaultHeight={{px: 0, percent: 50}}
            defaultWidth={{px: 0, percent: 50}}
            maximumHeight={{px: 0, percent: 80}}
            maximumWidth={{px: 0, percent: 80}}
            parentContainer={this.state.container}
            >
            <div style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
            </div>
         </ResizableArea>
        </div>
      </ResizableArea>
    )
  }
}

ReactDOM.render(
  <Main />,
  document.querySelector('.resizable-container')
)
```

## Methods

### `setSize: { width: { px: number, percent: number }, height: { px: number, percent: number } }`

Set size of component directly

## Props

### `id: string`

ID of the resizable component

### `className: string`

Extra className of the resizable component

### `children: node`

The component that resized by resizable component

### `parentContainer: node`

The DOM node that CSS prop `width` & `height` relative to.

### `disable: { width: bool, height: bool }`

Disable resize on width / height direction

### `usePercentageResize: { width: bool, height: bool }`

Resize the component by changing percentage or px

### `minimumWidth: { px: number, percent: number }`

The minimum width of the component

Present as `calc({px}px + {percent}%)`

### `minimumHeight: { px: number, percent: number }`

The minimum height of the component

### `maximumWidth: { px: number, percent: number }`

The maximum width of the component

### `maximumHeight: { px: number, percent: number }`

The maximum height of the component

### `initWidth: { px: number, percent: number }`

The initial width of the component

### `initHeight: { px: number, percent: number }`

The initial height of the component

### `defaultWidth: { px: number, percent: number }`

The default width of the component (double click on right edge will reset to this size)

### `defaultHeight: { px: number, percent: number }`

The default height of the component (double click on bottom edge will reset to this size)

### `onResizing: function ({ width, height })`

Callback that fired on component resizing

### `onResized: function ({ width, height })`

Callback that fired on resize completed.
