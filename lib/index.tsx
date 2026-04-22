import React, { useState, useRef, forwardRef, useImperativeHandle, type ReactNode } from 'react'

export interface SizeOption {
  px?: number
  percent?: number
}

export interface ResizeAxis {
  width?: boolean
  height?: boolean
}

export interface SizeState {
  width: SizeOption
  height: SizeOption
}

export interface ResizableAreaProps {
  id?: string
  className?: string
  children?: ReactNode
  disable?: ResizeAxis
  usePercentageResize?: ResizeAxis
  parentContainer?: Element
  minimumWidth?: SizeOption
  minimumHeight?: SizeOption
  maximumWidth?: SizeOption
  maximumHeight?: SizeOption
  initWidth?: SizeOption
  initHeight?: SizeOption
  defaultWidth?: SizeOption
  defaultHeight?: SizeOption
  onResizing?: (size: SizeState) => void
  onResized?: (size: SizeState) => void
}

export interface ResizableAreaHandle {
  setSize: (size: SizeState) => void
}

function sizeToCSS({ px = 0, percent = 0 }: SizeOption): string {
  return `calc(${px}px ${percent < 0 ? '-' : '+'} ${Math.abs(percent)}%)`
}

function toPx(s: SizeOption, parent: number): number {
  return parent * (s.percent ?? 0) / 100 + (s.px ?? 0)
}

function constrainSize(
  current: SizeState,
  pw: number,
  ph: number,
  dw: SizeOption,
  dh: SizeOption,
  maxW: SizeOption,
  minW: SizeOption,
  maxH: SizeOption,
  minH: SizeOption,
  usePct: ResizeAxis,
): SizeState {
  const { px: dwpx = 0, percent: dwpct = 0 } = dw
  const { px: dhpx = 0, percent: dhpct = 0 } = dh

  const calcMaxW = usePct.width
    ? { px: dwpx, percent: ((maxW.px ?? 0) - dwpx) / pw * 100 + (maxW.percent ?? 0) }
    : { px: ((maxW.percent ?? 0) - dwpct) / 100 * pw + (maxW.px ?? 0), percent: dwpct }

  const calcMinW = usePct.width
    ? { px: dwpx, percent: ((minW.px ?? 0) - dwpx) / pw * 100 + (minW.percent ?? 0) }
    : { px: ((minW.percent ?? 0) - dwpct) / 100 * pw + (minW.px ?? 0), percent: dwpct }

  const calcMaxH = usePct.height
    ? { px: dhpx, percent: ((maxH.px ?? 0) - dhpx) / ph * 100 + (maxH.percent ?? 0) }
    : { px: ((maxH.percent ?? 0) - dhpct) / 100 * ph + (maxH.px ?? 0), percent: dhpct }

  const calcMinH = usePct.height
    ? { px: dhpx, percent: ((minH.px ?? 0) - dhpx) / ph * 100 + (minH.percent ?? 0) }
    : { px: ((minH.percent ?? 0) - dhpct) / 100 * ph + (minH.px ?? 0), percent: dhpct }

  const ret: SizeState = { ...current }
  if (toPx(current.width, pw) > toPx(calcMaxW, pw)) ret.width = calcMaxW
  if (toPx(current.width, pw) < toPx(calcMinW, pw)) ret.width = calcMinW
  if (toPx(current.height, ph) > toPx(calcMaxH, ph)) ret.height = calcMaxH
  if (toPx(current.height, ph) < toPx(calcMinH, ph)) ret.height = calcMinH
  return ret
}

export const ResizableArea = forwardRef<ResizableAreaHandle, ResizableAreaProps>((
  {
    id,
    className,
    children,
    disable = { width: false, height: false },
    usePercentageResize = { width: true, height: true },
    parentContainer,
    minimumWidth = { px: 150, percent: 0 },
    minimumHeight = { px: 350, percent: 0 },
    maximumWidth = { px: 0, percent: 100 },
    maximumHeight = { px: 0, percent: 100 },
    initWidth = { px: 0, percent: 30 },
    initHeight = { px: 0, percent: 100 },
    defaultWidth = { px: 0, percent: 30 },
    defaultHeight = { px: 0, percent: 100 },
    onResizing,
    onResized,
  },
  ref,
) => {
  const [size, setSize] = useState<SizeState>({ width: initWidth, height: initHeight })

  // Tracks the handlers currently registered on document so they can be removed
  const activeListeners = useRef<{ move: (e: MouseEvent) => void; up: (e: MouseEvent) => void } | null>(null)

  useImperativeHandle(ref, () => ({ setSize }), [setSize])

  const stopDrag = () => {
    if (!activeListeners.current) return
    document.removeEventListener('mousemove', activeListeners.current.move)
    document.removeEventListener('mouseup', activeListeners.current.up)
    activeListeners.current = null
  }

  const createDragHandler = (w: boolean, h: boolean) => (e: React.MouseEvent) => {
    e.preventDefault()
    const active = { width: !disable.width && w, height: !disable.height && h }
    if (!active.width && !active.height) return

    stopDrag()

    const container = parentContainer ?? document.body
    const { width: pw, height: ph } = container.getBoundingClientRect()
    const orgState = constrainSize(size, pw, ph, defaultWidth, defaultHeight, maximumWidth, minimumWidth, maximumHeight, minimumHeight, usePercentageResize)
    const startX = e.clientX
    const startY = e.clientY
    let latestSize = orgState

    const handleMove = (ev: MouseEvent) => {
      ev.preventDefault()
      const deltaX = ev.clientX - startX
      const deltaY = ev.clientY - startY
      let { width: curW, height: curH } = orgState

      if (active.width) {
        curW = usePercentageResize.width
          ? { ...curW, percent: (curW.percent ?? 0) + deltaX / pw * 100 }
          : { ...curW, px: (curW.px ?? 0) + deltaX }
      }
      if (active.height) {
        curH = usePercentageResize.height
          ? { ...curH, percent: (curH.percent ?? 0) + deltaY / ph * 100 }
          : { ...curH, px: (curH.px ?? 0) + deltaY }
      }
      latestSize = { width: curW, height: curH }
      setSize(latestSize)
      onResizing?.(latestSize)
    }

    const handleUp = (ev: MouseEvent) => {
      ev.preventDefault()
      const finalSize = constrainSize(latestSize, pw, ph, defaultWidth, defaultHeight, maximumWidth, minimumWidth, maximumHeight, minimumHeight, usePercentageResize)
      setSize(finalSize)
      onResized?.(finalSize)
      stopDrag()
    }

    activeListeners.current = { move: handleMove, up: handleUp }
    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleUp)
  }

  const createDoubleClickHandler = (w: boolean, h: boolean) => (e: React.MouseEvent) => {
    e.preventDefault()
    stopDrag()
    const active = { width: !disable.width && w, height: !disable.height && h }
    if (!active.width && !active.height) return
    const next: SizeState = { ...size }
    if (active.width) next.width = { ...defaultWidth }
    if (active.height) next.height = { ...defaultHeight }
    setSize(next)
    onResized?.(next)
  }

  const containerStyle: React.CSSProperties = {
    width: sizeToCSS(size.width),
    height: sizeToCSS(size.height),
    maxWidth: sizeToCSS(maximumWidth),
    minWidth: sizeToCSS(minimumWidth),
    maxHeight: sizeToCSS(maximumHeight),
    minHeight: sizeToCSS(minimumHeight),
    position: 'relative',
  }

  const rightHandleStyle: React.CSSProperties = {
    position: 'absolute',
    right: -5,
    top: 0,
    height: '100%',
    width: 10,
    cursor: !disable.width ? 'ew-resize' : 'auto',
  }

  const bottomHandleStyle: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    bottom: -5,
    height: 10,
    width: '100%',
    cursor: !disable.height ? 'ns-resize' : 'auto',
  }

  const cornerHandleStyle: React.CSSProperties = {
    position: 'absolute',
    right: -5,
    bottom: -5,
    height: 10,
    width: 10,
    cursor: !disable.width && !disable.height
      ? 'nwse-resize'
      : !disable.width
        ? 'ew-resize'
        : !disable.height
          ? 'ns-resize'
          : 'auto',
  }

  return (
    <div
      id={id}
      className={`resizable-component${className != null ? ' ' + className : ''}`}
      style={containerStyle}
    >
      {children}
      <div
        onMouseDown={createDragHandler(true, false)}
        onDoubleClick={createDoubleClickHandler(true, false)}
        className="resize-handle-right"
        style={rightHandleStyle}
      />
      <div
        onMouseDown={createDragHandler(false, true)}
        onDoubleClick={createDoubleClickHandler(false, true)}
        className="resize-handle-bottom"
        style={bottomHandleStyle}
      />
      <div
        onMouseDown={createDragHandler(true, true)}
        onDoubleClick={createDoubleClickHandler(true, true)}
        className="resize-handle-corner"
        style={cornerHandleStyle}
      />
    </div>
  )
})

ResizableArea.displayName = 'ResizableArea'
