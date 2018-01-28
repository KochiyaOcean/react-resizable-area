'use strict';

const React = window.React;
const ReactDOM = window.ReactDOM;
const { ResizableArea } = window.ReactResizeableArea;

class Main extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {}, _temp;
  }

  render() {
    return React.createElement(
      ResizableArea,
      {
        minimumHeight: { px: 0, percent: 50 },
        minimumWidth: { px: 0, percent: 50 },
        initHeight: { px: 0, percent: 80 },
        initWidth: { px: 0, percent: 80 },
        maximumHeight: { px: 0, percent: 100 },
        maximumWidth: { px: 0, percent: 100 },
        parentContainer: document.querySelector('.resizable-container')
      },
      React.createElement(
        'div',
        {
          style: { backgroundColor: '#03a9f4', width: '100%', height: '100%' },
          ref: e => !this.state.container && this.setState({ container: e })
        },
        React.createElement(
          ResizableArea,
          {
            minimumHeight: { px: 0, percent: 10 },
            minimumWidth: { px: 0, percent: 10 },
            initHeight: { px: 20, percent: 50 },
            initWidth: { px: 20, percent: 50 },
            maximumHeight: { px: 0, percent: 80 },
            maximumWidth: { px: 0, percent: 80 },
            parentContainer: this.state.container
          },
          React.createElement('div', { style: { backgroundColor: 'white', width: '100%', height: '100%' } })
        )
      )
    );
  }
}

ReactDOM.render(React.createElement(Main, null), document.querySelector('.resizable-container'));
