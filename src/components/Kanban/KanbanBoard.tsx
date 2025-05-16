import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import type { DropResult } from "react-beautiful-dnd";
import KanbanColumn from "./KanbanColumn";
import styles from "./KanbanBoard.module.css";

export interface KanbanTask {
  id: string;
  content: string;
}
export interface KanbanColumnType {
  name: string;
  items: KanbanTask[];
}

const initialColumns: Record<string, KanbanColumnType> = {
  todo: {
    name: "To Do",
    items: [
      { id: "task-1", content: "Task 1: Design homepage" },
      { id: "task-2", content: "Task 2: Write documentation" },
    ],
  },
  inProgress: {
    name: "In Progress",
    items: [{ id: "task-3", content: "Task 3: Develop API" }],
  },
  done: {
    name: "Done",
    items: [{ id: "task-4", content: "Task 4: Setup CI/CD" }],
  },
};

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId === destination.droppableId) {
      // Reorder within the same column
      const column = columns[source.droppableId];
      const newItems = Array.from(column.items);
      const [movedItem] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, movedItem);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: newItems,
        },
      });
    } else {
      // Move to a different column
      const sourceCol = columns[source.droppableId];
      const destCol = columns[destination.droppableId];
      const sourceItems = Array.from(sourceCol.items);
      const destItems = Array.from(destCol.items);
      const [movedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, movedItem);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceCol,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destCol,
          items: destItems,
        },
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.board}>
        {Object.entries(columns).map(([columnId, columnData]) => (
          <KanbanColumn
            key={columnId}
            columnId={columnId}
            column={columnData}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
