declare module 'react-image-mapper' {
  export interface Area {
    id: number;
    name?: string;
    shape: string;
    coords: number[];
    fillColor?: string;
    strokeColor?: string;
    preFillColor?: string;
    lineWidth?: number;
    [key: string]: any;
  }
  
  export interface Map {
    name: string;
    areas: Area[];
  }
  
  export interface ImageMapperProps {
    src: string;
    map: Map;
    width?: number;
    height?: number;
    imgWidth?: number;
    imgHeight?: number;
    parentWidth?: number;
    responsive?: boolean;
    active?: boolean;
    onClick?: (area: Area, index: number, event: React.MouseEvent) => void;
    onMouseEnter?: (area: Area, index: number, event: React.MouseEvent) => void;
    onMouseLeave?: (area: Area, index: number, event: React.MouseEvent) => void;
    onMouseMove?: (area: Area, index: number, event: React.MouseEvent) => void;
    onImageClick?: (event: React.MouseEvent) => void;
    onImageMouseMove?: (event: React.MouseEvent) => void;
    stayHighlighted?: boolean;
    stayMultiHighlighted?: boolean;
    toggleHighlighted?: boolean;
    fillColor?: string;
    strokeColor?: string;
    lineWidth?: number;
    natural?: boolean;
  }
  
  const ImageMapper: React.FC<ImageMapperProps>;
  
  export default ImageMapper;
} 