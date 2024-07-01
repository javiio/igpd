import React, { useState } from 'react';
import { Icon, Button } from '~core-ui';
import { useTask, ActionItemsList, calcCompletedActionItems } from '..';

export const ActionItems = () => {
  const { task } = useTask();
  const [hideCompleted, setHideCompleted] = useState(false);

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
          <Button
            variant="link"
            size="sm"
            className="mb-0"
            onClick={() => setHideCompleted(!hideCompleted)}
          >
            {hideCompleted ? 'Show all' : 'Hide completed'}
          </Button>
        </div>
      </div>

      <ActionItemsList
        actionItems={task.actionItems}
        hideCompleted={hideCompleted}
      />
    </div>
  );
};
