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
    width: {
      ...this.props.initWidth,
      tempPx: 0,
    },
    height: {
      ...this.props.initHeight,
      tempPx: 0,
    },
  }

  mapSizeOptionToCSS = ({ px, tempPx, percent }) => `calc(${(px || 0) + (tempPx || 0)}px ${percent < 0 ? '-' : '+'} ${Math.abs(percent || 0)}%)`

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
    const maxWidthPx = parentWidth * maxWidth.percent + maxWidth.px
    const minWidthPx = parentWidth * minWidth.percent + minWidth.px
    const curWidthPx = parentWidth * curWidth.percent + curWidth.px + curWidth.tempPx
    const maxHeightPx = parentHeight * maxHeight.percent + maxHeight.px
    const minHeightPx = parentHeight * minHeight.percent + minHeight.px
    const curHeightPx = parentHeight * curHeight.percent + curHeight.px + curHeight.tempPx
    const ret = { width: curWidth, height: curHeight }
    if (curWidthPx > maxWidthPx) {
      ret.width = maxWidth
    }
    if (curWidthPx < minWidthPx) {
      ret.width = minWidth
    }
    if (curHeightPx > maxHeightPx) {
      ret.height = curHeight
    }
    if (curHeightPx < minHeightPx) {
      ret.height = minHeight
    }
    return ret
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
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
    const { width: parentWidth, height: parentHeight } = parentContainer.getBoundingClientRect()
    this.parentWidth = parentWidth
    this.parentHeight = parentHeight
    const size = this.calcCurrentSize(this.state)
    this.curState = size
    this.start = true
    requestAnimationFrame(this.tick)
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
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
    this.props.onResized(this.curState)
    this.start = false
  }

  tick = ts => {
    this.setState(this.curState)
    if (this.start) {
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
          onDoubleClick={this.handleRightDoubleClick}
          className='resize-handle-right'
          style={resizeHandleRightStyle}
        />
        <div
          onMouseDown={this.handleDragStartFactory({ width: false, height: true })}
          onDoubleClick={this.handleBottomDoubleClick}
          className='resize-handle-bottom'
          style={resizeHandleBottomStyle}
        />
        <div
          onMouseDown={this.handleDragStartFactory({ width: true, height: true })}
          onDoubleClick={this.handleCornerDoubleClick}
          className='resize-handle-corner'
          style={resizeHandleCornerStyle}
        />
      </div>
    )
  }
}
