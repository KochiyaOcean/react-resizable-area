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

  calcCurrentSize = ({ width: currentWidth, height: currentHeight }) => {
    const { maximumWidth, minimumWidth, maximumHeight, minimumHeight, parentContainer } = this.props
    const { width: parentWidth, height: parentHeight } = parentContainer.getBoundingClientRect()
    const maxWidth = parentWidth * maximumWidth.percent + maximumWidth.px
    const minWidth = parentWidth * minimumWidth.percent + minimumWidth.px
    const curWidth = parentWidth * currentWidth.percent + currentWidth.px + currentWidth.tempPx
    const maxHeight = parentHeight * maximumHeight.percent + maximumHeight.px
    const minHeight = parentHeight * minimumHeight.percent + minimumHeight.px
    const curHeight = parentHeight * currentHeight.percent + currentHeight.px + currentHeight.tempPx
    const ret = { width: currentWidth, height: currentHeight }
    if (curWidth > maxWidth) {
      ret.width = maximumWidth
    }
    if (curWidth < minWidth) {
      ret.width = minimumWidth
    }
    if (curHeight > maxHeight) {
      ret.height = maximumHeight
    }
    if (curHeight < minHeight) {
      ret.height = minimumHeight
    }
    return ret
  }

  handleDragStartFactory = handler => e => {
    e.preventDefault()
    const { disable } = this.props
    this.handler = {
      width: !disable.width && handler.width,
      height: !disable.height && handler.height,
    }
    if (!this.handler.width && !this.handler.height) return
    this.startX = e.clientX
    this.startY = e.clientY
    const curSize = this.getCurrentSize()
    this.startWidth = curSize.width
    this.startHeight = curSize.height
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseMove = e => {
    e.preventDefault()
    const deltaX = e.clientX - this.startX
    const deltaY = e.clientY - this.startY
    let { width: curWidth, height: curHeight } = { ...this.state }
    if (this.handler.width) {
      curWidth = {
        ...curWidth,
        tempPx: curWidth.tempPx + deltaX,
      }
    }
    if (this.handler.height) {
      curHeight = {
        ...curHeight,
        tempPx: curHeight.tempPx + deltaY,
      }
    }
    this.setState({
      ...this.state,
      curWidth,
      curHeight,
    })
    this.props.onResizing({ width: curWidth, height: curHeight })
  }

  handleMouseUp = e => {
    e.preventDefault()
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
    let { width: curWidth, height: curHeight } = { ...this.state }
    const { usePercentageResize, parentContainer } = this.props
    const { width: parentWidth, height: parentHeight } = parentContainer.getBoundingClientRect()
    if (this.handler.width) {
      if (usePercentageResize.width) {
        curWidth = {
          ...curWidth,
          percent: curWidth.percent + curWidth.tempPx / parentWidth,
        }
      } else {
        curWidth = {
          ...curWidth,
          px: curWidth.px + curWidth.tempPx,
        }
      }
    }
    if (this.handler.height) {
      if (usePercentageResize.height) {
        curHeight = {
          ...curHeight,
          percent: curHeight.percent + curHeight.tempPx / parentHeight,
        }
      } else {
        curHeight = {
          ...curHeight,
          px: curHeight.px + curHeight.tempPx,
        }
      }
    }
    const size = this.calcCurrentSize({ width: curWidth, height: curHeight })
    this.setState({
      ...this.state,
      width: {
        ...size.width,
        tempPx: 0,
      },
      height: {
        ...size.height,
        tempPx: 0,
      },
    })
    this.props.onResized(size)
  }

  render () {
    const containerStyle = {
      width: this.mapSizeOptionToCSS(this.state.width),
      height: this.mapSizeOptionToCSS(this.state.height),
      maxWidth: this.mapSizeOptionToCSS(this.props.maximumWidth),
      minWidth: this.mapSizeOptionToCSS(this.props.minimumWidth),
      maxHeight: this.mapSizeOptionToCSS(this.props.maximumHeight),
      minHeight: this.mapSizeOptionToCSS(this.props.minimumHeight),
    }
    return (
      <div id={this.props.id} className={`resizable-component ${this.props.className}`} style={containerStyle}>
        {this.props.children}
        <div
          onMouseDown={this.handleDragStartFactory({ width: true, height: false })}
          onDoubleClick={this.handleRightDoubleClick}
          className='resize-handle-right'
        />
        <div
          onMouseDown={this.handleDragStartFactory({ width: false, height: true })}
          onDoubleClick={this.handleBottomDoubleClick}
          className='resize-handle-bottom'
        />
        <div
          onMouseDown={this.handleDragStartFactory({ width: true, height: true })}
          onDoubleClick={this.handleCornerDoubleClick}
          className='resize-handle-corner'
        />
      </div>
    )
  }
}
