import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { LayoutGroup } from 'framer-motion';
import { IconButton } from '~core-ui';
import { NewTaskForm, TaskBoardItem, type Task } from '~tasks';
import type { Project, BoardList } from '..';

interface ProjectBoardListProps {
  project: Project
  list: BoardList
  tasks?: Task[]
  index: number
};

export const ProjectBoardList = ({ project, list, tasks, index }: ProjectBoardListProps) => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <LayoutGroup>
      <div className="h-[calc(100vh-12.5rem)] shrink-0">
        <Draggable draggableId={list.id} index={index}>
          {(provided) => (
            <div
              className="list"
              {...provided.draggableProps}
              ref={provided.innerRef}
            >
              <div className="w-64 bg-slate-950 rounded-lg">
                <div
                  {...provided.dragHandleProps}
                  className="flex justify-between px-4 py-2"
                >
                  <h4 >{list.name}</h4>
                  <IconButton
                    name="plus"
                    onClick={() => setShowAddForm(true)}
                  />
                </div>

                <Droppable droppableId={list.id} type="TASK">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="p-2 flex flex-col space-y-3 overflow-y-auto max-h-[calc(100vh-15.5rem)] shrink-0 bg-slate-950 rounded-lg"
                    >
                      {showAddForm && (
                        <NewTaskForm
                          project={project}
                          list={list}
                          onClose={() => setShowAddForm(false)}
                        />
                      )}
                      {tasks?.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="task"
                            >
                              <TaskBoardItem key={task.id} task={task} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          )}
        </Draggable>
      </div>
    </LayoutGroup>
  );
};
