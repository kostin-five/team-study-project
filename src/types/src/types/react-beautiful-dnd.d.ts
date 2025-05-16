declare module "react-beautiful-dnd" {
  import * as React from "react";

  export interface DraggableLocation {
    droppableId: string;
    index: number;
  }

  export interface DropResult {
    draggableId: string;
    type: string;
    source: DraggableLocation;
    destination: DraggableLocation | null;
    reason: "DROP" | "CANCEL";
    mode: "FLUID" | "SNAP";
    combine?: any;
  }

  export interface DragDropContextProps {
    onDragEnd: (result: DropResult) => void;
    children: React.ReactNode;
  }

  export const DragDropContext: React.FC<DragDropContextProps>;

  export interface DroppableProvided {
    innerRef: React.Ref<any>;
    droppableProps: any;
    placeholder?: React.ReactElement;
  }

  export interface DroppableProps {
    droppableId: string;
    children: (
      provided: DroppableProvided,
      snapshot: { isDraggingOver: boolean }
    ) => React.ReactNode;
  }

  export const Droppable: React.FC<DroppableProps>;

  export interface DraggableProvided {
    draggableProps: any;
    dragHandleProps: any;
    innerRef: React.Ref<any>;
  }

  export interface DraggableProps {
    draggableId: string;
    index: number;
    children: (
      provided: DraggableProvided,
      snapshot: { isDragging: boolean }
    ) => React.ReactNode;
  }

  export const Draggable: React.FC<DraggableProps>;
}
