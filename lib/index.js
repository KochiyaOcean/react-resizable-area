import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class ResizableArea extends Component {
  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    disable: PropTypes.shape({
      width: PropTypes.bool,
      height: PropTypes.bool,
    }),
    usePercentageResize: PropTypes.shape({
      width: PropTypes.bool,
      height: PropTypes.bool,
    }),
    parentContainer: PropTypes.node,
    minimumWidth: PropTypes.shape({
      px: PropTypes.number,
      percent: PropTypes.number,
    }),
    minimumHeight: PropTypes.shape({
      px: PropTypes.number,
      percent: PropTypes.number,
    }),
    maximumWidth: PropTypes.shape({
      px: PropTypes.number,
      percent: PropTypes.number,
    }),
    maximumHeight: PropTypes.shape({
      px: PropTypes.number,
      percent: PropTypes.number,
    }),
    initWidth: PropTypes.shape({
      px: PropTypes.number,
      percent: PropTypes.number,
    }),
    initHeight: PropTypes.shape({
      px: PropTypes.number,
      percent: PropTypes.number,
    }),
    defaultWidth: PropTypes.shape({
      px: PropTypes.number,
      percent: PropTypes.number,
    }),
    defaultHeight: PropTypes.shape({
      px: PropTypes.number,
      percent: PropTypes.number,
    }),
    onResizing: PropTypes.func,
    onResized: PropTypes.func,
  }

  static defaultProps = {
    disable: {
      width: false,
      height: false,
    },
    usePercentageResize: {
      width: true,
      height: true,
    },
    parentContainer: document.body,
    minimumWidth: {
      px: 150,
      percent: 0,
    },
    minimumHeight: {
      px: 350,
      percent: 0,
    },
    maximumWidth: {
      px: 0,
      percent: 100,
    },
    maximumHeight: {
      px: 0,
      percent: 100,
    },
    initWidth: {
      px: 0,
      percent: 30,
    },
    initHeight: {
      px: 0,
      percent: 100,
    },
    defaultWidth: {
      px: 0,
      percent: 30,
    },
    defaultHeight: {
      px: 0,
      percent: 100,
    },
    onResizing: e => null,
    onResized: e => null,
  }

  state = {
    width: this.props.initWidth,
    height: this.props.initHeight,
  }

  setSize = ({ width, height }) => {
    this.setState({
      width,
      height,
    })
  }

  mapSizeOptionToCSS = ({ px, percent }) => `calc(${(px || 0)}px ${percent < 0 ? '-' : '+'} ${Math.abs(percent || 0)}%)`

  calcCurrentSize = ({ width: curWidth, height: curHeight }) => {
    const {
      defaultWidth,
      defaultHeight,
      maximumWidth,
      minimumWidth,
      maximumHeight,
      minimumHeight,
      usePercentageResize,
    } = this.props
    const { parentWidth, parentHeight } = this
    const maxWidth = usePercentageResize.width ? {
      px: defaultWidth.px,
      percent: (maximumWidth.px - defaultWidth.px) / parentWidth * 100 + maximumWidth.percent,
    } : {
      px: (maximumWidth.percent - defaultWidth.percent) / 100 * parentWidth + maximumWidth.px,
      percent: defaultWidth.px,
    }
    const minWidth = usePercentageResize.width ? {
      px: defaultWidth.px,
      percent: (minimumWidth.px - defaultWidth.px) / parentWidth * 100 + minimumWidth.percent,
    } : {
      px: (minimumWidth.percent - defaultWidth.percent) / 100 * parentWidth + minimumWidth.px,
      percent: defaultWidth.px,
    }
    const maxHeight = usePercentageResize.height ? {
      px: defaultHeight.px,
      percent: (maximumHeight.px - defaultHeight.px) / parentHeight * 100 + maximumHeight.percent,
    } : {
      px: (maximumHeight.percent - defaultHeight.percent) / 100 * parentHeight + maximumHeight.px,
      percent: defaultHeight.px,
    }
    const minHeight = usePercentageResize.height ? {
      px: defaultHeight.px,
      percent: (minimumHeight.px - defaultHeight.px) / parentHeight * 100 + minimumHeight.percent,
    } : {
      px: (minimumHeight.percent - defaultHeight.percent) / 100 * parentHeight + minimumHeight.px,
      percent: defaultHeight.px,
    }
    const maxWidthPx = parentWidth * maxWidth.percent / 100 + maxWidth.px
    const minWidthPx = parentWidth * minWidth.percent / 100 + minWidth.px
    const curWidthPx = parentWidth * curWidth.percent / 100 + curWidth.px
    const maxHeightPx = parentHeight * maxHeight.percent / 100 + maxHeight.px
    const minHeightPx = parentHeight * minHeight.percent / 100 + minHeight.px
    const curHeightPx = parentHeight * curHeight.percent / 100 + curHeight.px
    const ret = { width: curWidth, height: curHeight }
    if (curWidthPx > maxWidthPx) {
      ret.width = maxWidth
    }
    if (curWidthPx < minWidthPx) {
      ret.width = minWidth
    }
    if (curHeightPx > maxHeightPx) {
      ret.height = maxHeight
    }
    if (curHeightPx < minHeightPx) {
      ret.height = minHeight
    }
    return ret
  }

  handleDoubleClickFactory = handler => e => {
    e.preventDefault()
    this.removeDragEventListener()
    const { disable, defaultWidth, defaultHeight } = this.props
    const masked = {
      width: !disable.width && handler.width,
      height: !disable.height && handler.height,
    }
    if (!masked.width && !masked.height) return
    let state = {}
    if (masked.width) {
      state = {
        ...state,
        width: {
          ...defaultWidth,
        },
      }
    }
    if (masked.height) {
      state = {
        ...state,
        height: {
          ...defaultHeight,
        },
      }
    }
    this.curState = state
    requestAnimationFrame(this.tick)
    this.props.onResized(state)
  }

  handleDragStartFactory = handler => e => {
    e.preventDefault()
    const { disable, parentContainer } = this.props
    this.handler = {
      width: !disable.width && handler.width,
      height: !disable.height && handler.height,
    }
    if (!this.handler.width && !this.handler.height) return
    this.startX = e.clientX
    this.startY = e.clientY
    const { width: parentWidth, height: parentHeight } = parentContainer.getBoundingClientRect()
    this.parentWidth = parentWidth
    this.parentHeight = parentHeight
    const size = this.calcCurrentSize(this.state)
    this.curState = size
    this.orgState = size
    this.dragUpdate = true
    requestAnimationFrame(this.tick)
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseMove = e => {
    e.preventDefault()
    const deltaX = e.clientX - this.startX
    const deltaY = e.clientY - this.startY
    let { width: curWidth, height: curHeight } = { ...this.state }
    const { width: orgWidth, height: orgHeight } = this.orgState
    const { usePercentageResize } = this.props
    if (this.handler.width) {
      if (usePercentageResize.width) {
        curWidth = {
          ...curWidth,
          percent: orgWidth.percent + deltaX / this.parentWidth * 100,
        }
      } else {
        curWidth = {
          ...curWidth,
          px: orgWidth.px + deltaX,
        }
      }
    }
    if (this.handler.height) {
      if (usePercentageResize.height) {
        curHeight = {
          ...curHeight,
          percent: orgHeight.percent + deltaY / this.parentHeight * 100,
        }
      } else {
        curHeight = {
          ...curHeight,
          px: orgHeight.px + deltaY,
        }
      }
    }
    this.curState = { width: curWidth, height: curHeight }
    this.props.onResizing(this.curState)
  }

  handleMouseUp = e => {
    e.preventDefault()
    const size = this.calcCurrentSize(this.curState)
    this.curState = {
      ...this.state,
      ...size,
    }
    this.props.onResized(this.curState)
    this.removeDragEventListener()
    requestAnimationFrame(this.tick)
  }

  removeDragEventListener = () => {
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
    this.dragUpdate = false
  }

  tick = ts => {
    this.setState(this.curState)
    if (this.dragUpdate) {
      requestAnimationFrame(this.tick)
    }
  }

  render () {
    const { disable, className, id, children } = this.props
    const containerStyle = {
      width: this.mapSizeOptionToCSS(this.state.width),
      height: this.mapSizeOptionToCSS(this.state.height),
      maxWidth: this.mapSizeOptionToCSS(this.props.maximumWidth),
      minWidth: this.mapSizeOptionToCSS(this.props.minimumWidth),
      maxHeight: this.mapSizeOptionToCSS(this.props.maximumHeight),
      minHeight: this.mapSizeOptionToCSS(this.props.minimumHeight),
      position: 'relative',
    }
    const resizeHandleRightStyle = {
      position: 'absolute',
      right: -5,
      top: 0,
      height: '100%',
      width: 10,
      cursor: !disable.width ? 'ew-resize' : 'auto',
    }
    const resizeHandleBottomStyle = {
      position: 'absolute',
      left: 0,
      bottom: -5,
      height: 10,
      width: '100%',
      cursor: !disable.height ? 'ns-resize' : 'auto',
    }
    const resizeHandleCornerStyle = {
      position: 'absolute',
      right: -5,
      bottom: -5,
      height: 10,
      width: 10,
      cursor: !disable.width && !disable.height
        ? 'nwse-resize' : !disable.width
          ? 'ew-resize' : !disable.height
            ? 'ns-resize' : 'auto',
    }
    return (
      <div
        id={id}
        className={`resizable-component${className != null ? ' ' + className : ''}`}
        style={containerStyle}
      >
        {children}
        <div
          onMouseDown={this.handleDragStartFactory({ width: true, height: false })}
          onDoubleClick={this.handleDoubleClickFactory({ width: true, height: false })}
          className='resize-handle-right'
          style={resizeHandleRightStyle}
        />
        <div
          onMouseDown={this.handleDragStartFactory({ width: false, height: true })}
          onDoubleClick={this.handleDoubleClickFactory({ width: false, height: true })}
          className='resize-handle-bottom'
          style={resizeHandleBottomStyle}
        />
        <div
          onMouseDown={this.handleDragStartFactory({ width: true, height: true })}
          onDoubleClick={this.handleDoubleClickFactory({ width: true, height: true })}
          className='resize-handle-corner'
          style={resizeHandleCornerStyle}
        />
      </div>
    )
  }
}
