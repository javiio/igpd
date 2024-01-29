import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ProjectBoardList, type Project } from '..';
import { useTasks } from '~tasks';

interface ProjectBoardProps {
  project: Project
};

export const ProjectBoard = ({ project }: ProjectBoardProps) => {
  const { listsTasks } = useTasks();

  const handleDragEnd = async (result) => {
    const { destination, draggableId, type } = result;
    if (type === 'TASK') {
      await updateTaskList(draggableId, destination.droppableId);
    }
  };

  return (
    <div className="overflow-x-auto h-[calc(100vh-11.5rem)]">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="COLUMN">
          {(provided) => (
            <div
              className="flex space-x-2 px-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {project?.lists?.map((list, index) => (
                <ProjectBoardList
                  key={list.id}
                  project={project}
                  list={list}
                  tasks={listsTasks.get(list.id)}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
