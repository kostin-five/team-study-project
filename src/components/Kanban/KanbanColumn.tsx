import React from "react";
import { Droppable } from "react-beautiful-dnd";
import type { KanbanColumnType, KanbanTask } from "./KanbanBoard";
import KanbanCard from "./KanbanCard.tsx";
import styles from "./KanbanColumn.module.css";

interface KanbanColumnProps {
  columnId: string;
  column: KanbanColumnType;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ columnId, column }) => {
  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div
          className={styles.column}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h3>{column.name}</h3>
          {column.items.map((item: KanbanTask, index: number) => (
            <KanbanCard key={item.id} item={item} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default KanbanColumn;
