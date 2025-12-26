'use client';

import { useState, useRef } from 'react';

interface SortableItem {
  id: string;
  order: number;
}

interface SortableListProps<T extends SortableItem> {
  items: T[];
  onReorder: (items: T[]) => void;
  renderItem: (item: T, index: number, isDragging: boolean) => React.ReactNode;
  direction?: 'vertical' | 'horizontal' | 'grid';
  gap?: number;
}

export default function SortableList<T extends SortableItem>({
  items,
  onReorder,
  renderItem,
  direction = 'vertical',
  gap = 8,
}: SortableListProps<T>) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragNode = useRef<HTMLDivElement | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    dragNode.current = e.target as HTMLDivElement;
    e.dataTransfer.effectAllowed = 'move';

    // Add slight delay for visual feedback
    setTimeout(() => {
      if (dragNode.current) {
        dragNode.current.style.opacity = '0.5';
      }
    }, 0);
  };

  const handleDragEnter = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === dropIndex) {
      return;
    }

    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);

    // Update order values
    const reorderedItems = newItems.map((item, index) => ({
      ...item,
      order: index,
    }));

    onReorder(reorderedItems);
  };

  const handleDragEnd = () => {
    if (dragNode.current) {
      dragNode.current.style.opacity = '1';
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
    dragNode.current = null;
  };

  const getContainerStyle = (): React.CSSProperties => {
    if (direction === 'horizontal') {
      return {
        display: 'flex',
        flexDirection: 'row',
        gap: `${gap}px`,
        overflowX: 'auto',
      };
    }
    if (direction === 'grid') {
      return {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: `${gap}px`,
      };
    }
    return {
      display: 'flex',
      flexDirection: 'column',
      gap: `${gap}px`,
    };
  };

  const getItemStyle = (index: number): React.CSSProperties => {
    const isBeingDragged = draggedIndex === index;
    const isDropTarget = dragOverIndex === index;

    return {
      cursor: 'grab',
      transition: 'transform 0.2s, box-shadow 0.2s',
      transform: isDropTarget ? 'scale(1.02)' : 'scale(1)',
      boxShadow: isDropTarget ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
      opacity: isBeingDragged ? 0.5 : 1,
      position: 'relative' as const,
    };
  };

  return (
    <div style={getContainerStyle()}>
      {items.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragEnter={(e) => handleDragEnter(e, index)}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
          style={getItemStyle(index)}
        >
          {dragOverIndex === index && draggedIndex !== null && draggedIndex !== index && (
            <div
              style={{
                position: 'absolute',
                top: direction === 'vertical' ? '-4px' : 0,
                left: direction === 'horizontal' ? '-4px' : 0,
                right: direction === 'vertical' ? 0 : 'auto',
                bottom: direction === 'horizontal' ? 0 : 'auto',
                width: direction === 'horizontal' ? '4px' : '100%',
                height: direction === 'vertical' ? '4px' : '100%',
                backgroundColor: '#3b82f6',
                borderRadius: '2px',
                zIndex: 10,
              }}
            />
          )}
          {renderItem(item, index, draggedIndex === index)}
        </div>
      ))}
    </div>
  );
}
