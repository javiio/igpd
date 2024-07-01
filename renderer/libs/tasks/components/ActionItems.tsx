import React from 'react';
import { Icon } from '~core-ui';
import { useTask, ActionItemsList, calcCompletedActionItems } from '..';

export const ActionItems = () => {
  const { task } = useTask();

  return (
    <div>
      <div className="flex justify-between mb-2 items-center">
        <div className="flex space-x-2 items-center">
          <Icon name="actionItems" />
          <h3 className="font-extralight text-lg">Action Items</h3>
        </div>
        <div className="flex space-x-2 items-center">
          <Icon name="checkbox" size={4} />
          <span>
            {calcCompletedActionItems(task.actionItems)}/{task.actionItems.length}
          </span>
        </div>
      </div>

      <ActionItemsList actionItems={task.actionItems} />
    </div>
  );
};
