import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TaskDetails } from '../';
import type { Task } from '../';

interface TaskBoardItemProps {
  task: Task
};

export const TaskBoardItem = ({ task }: TaskBoardItemProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <motion.div
        layoutId={task.id}
        className="bg-gray-800 rounded-md p-2 text-sm"
        onClick={() => setShowDetails(true)}
      >
        {task.name}
      </motion.div>

      <AnimatePresence>
        {showDetails && (
          <>
            <motion.div
              className="absolute inset-0 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div className="absolute inset-0">
              <motion.div
                layout
                layoutId={task.id}
                className="max-w-2xl h-[calc(100vh-8rem)] mt-12 m-auto rounded-lg z-10 border border-slate-700 bg-slate-800"
              >
                <TaskDetails
                  task={task}
                  onClose={() => setShowDetails(false)}
                />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
