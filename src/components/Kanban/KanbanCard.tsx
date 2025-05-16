import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card } from "antd";
import type { KanbanTask } from "./KanbanBoard";
import styles from "./KanbanCard.module.css";

interface KanbanCardProps {
  item: KanbanTask;
  index: number;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.cardWrapper}
        >
          <Card size="small" className={styles.card}>
            {item.content}
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanCard;
