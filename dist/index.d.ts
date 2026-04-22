import React, { type ReactNode } from 'react';
export interface SizeOption {
    px?: number;
    percent?: number;
}
export interface ResizeAxis {
    width?: boolean;
    height?: boolean;
}
export interface SizeState {
    width: SizeOption;
    height: SizeOption;
}
export interface ResizableAreaProps {
    id?: string;
    className?: string;
    children?: ReactNode;
    disable?: ResizeAxis;
    usePercentageResize?: ResizeAxis;
    parentContainer?: Element;
    minimumWidth?: SizeOption;
    minimumHeight?: SizeOption;
    maximumWidth?: SizeOption;
    maximumHeight?: SizeOption;
    initWidth?: SizeOption;
    initHeight?: SizeOption;
    defaultWidth?: SizeOption;
    defaultHeight?: SizeOption;
    onResizing?: (size: SizeState) => void;
    onResized?: (size: SizeState) => void;
}
export interface ResizableAreaHandle {
    setSize: (size: SizeState) => void;
}
export declare const ResizableArea: React.ForwardRefExoticComponent<ResizableAreaProps & React.RefAttributes<ResizableAreaHandle>>;
