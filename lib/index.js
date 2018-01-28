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
    onResizing: e => null,
    onResized: e => null,
  }

  state = {
    width: this.props.initWidth,
    height: this.props.initHeight,
  }

  mapSizeOptionToCSS = ({ px, percent }) => `calc(${(px || 0)}px ${percent < 0 ? '-' : '+'} ${Math.abs(percent || 0)}%)`

  calcCurrentSize = ({ width: curWidth, height: curHeight }) => {
    const {
      initWidth,
      initHeight,
      maximumWidth,
      minimumWidth,
      maximumHeight,
      minimumHeight,
      usePercentageResize,
    } = this.props
    const { parentWidth, parentHeight } = this
    const maxWidth = usePercentageResize.width ? {
      px: initWidth.px,
      percent: (maximumWidth.px - initWidth.px) / parentWidth * 100 + maximumWidth.percent,
    } : {
      px: (maximumWidth.percent - initWidth.percent) / 100 * parentWidth + maximumWidth.px,
      percent: initWidth.px,
    }
    const minWidth = usePercentageResize.width ? {
      px: initWidth.px,
      percent: (minimumWidth.px - initWidth.px) / parentWidth * 100 + minimumWidth.percent,
    } : {
      px: (minimumWidth.percent - initWidth.percent) / 100 * parentWidth + minimumWidth.px,
      percent: initWidth.px,
    }
    const maxHeight = usePercentageResize.height ? {
      px: initWidth.px,
      percent: (maximumHeight.px - initHeight.px) / parentHeight * 100 + maximumHeight.percent,
    } : {
      px: (maximumHeight.percent - initHeight.percent) / 100 * parentHeight + maximumHeight.px,
      percent: initWidth.px,
    }
    const minHeight = usePercentageResize.height ? {
      px: initWidth.px,
      percent: (minimumHeight.px - initHeight.px) / parentHeight * 100 + minimumHeight.percent,
    } : {
      px: (minimumHeight.percent - initHeight.percent) / 100 * parentHeight + minimumHeight.px,
      percent: initWidth.px,
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
    const { disable, initWidth, initHeight } = this.props
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
          ...initWidth,
        },
      }
    }
    if (masked.height) {
      state = {
        ...state,
        height: {
          ...initHeight,
        },
      }
    }
    this.curState = state
    requestAnimationFrame(this.tick)
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
    this.dragUpdate = true
    requestAnimationFrame(this.tick)
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseMove = e => {
    e.preventDefault()
    const deltaX = e.clientX - this.startX
    const deltaY = e.clientY - this.startY
    this.startX = e.clientX
    this.startY = e.clientY
    let { width: curWidth, height: curHeight } = { ...this.state }
    const { usePercentageResize } = this.props
    if (this.handler.width) {
      if (usePercentageResize.width) {
        curWidth = {
          ...curWidth,
          percent: curWidth.percent + deltaX / this.parentWidth * 100,
        }
      } else {
        curWidth = {
          ...curWidth,
          px: curWidth.px + deltaX,
        }
      }
    }
    if (this.handler.height) {
      if (usePercentageResize.height) {
        curHeight = {
          ...curHeight,
          percent: curHeight.percent + deltaY / this.parentHeight * 100,
        }
      } else {
        curHeight = {
          ...curHeight,
          px: curHeight.px + deltaY,
        }
      }
    }
    const size = this.calcCurrentSize({ width: curWidth, height: curHeight })
    const state = {
      ...this.state,
      ...size,
    }
    this.curState = state
    this.props.onResizing(state)
  }

  handleMouseUp = e => {
    e.preventDefault()
    this.removeDragEventListener()
    this.props.onResized(this.curState)
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
      cursor: 'ew-resize',
    }
    const resizeHandleBottomStyle = {
      position: 'absolute',
      left: 0,
      bottom: -5,
      height: 10,
      width: '100%',
      cursor: 'ns-resize',
    }
    const resizeHandleCornerStyle = {
      position: 'absolute',
      right: -5,
      bottom: -5,
      height: 10,
      width: 10,
      cursor: 'nwse-resize',
    }
    return (
      <div id={this.props.id} className={`resizable-component ${this.props.className}`} style={containerStyle}>
        {this.props.children}
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
