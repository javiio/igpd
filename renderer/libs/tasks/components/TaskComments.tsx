import React, { useState, useEffect } from 'react';
import { Timestamp } from 'firebase/firestore';
import { Icon, IconButton, Input } from '~core-ui';
import { useTask } from '../';
import type { CommentData } from '../';

export const TaskComments = () => {
  const { task, update } = useTask();
  const [body, setBody] = useState('');
  const [comments, setComments] = useState<CommentData[]>(task.comments ?? []);

  useEffect(() => {
    setComments(task.comments ?? []);
  }, [task]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (body.trim() === '') return;

    const _comments = [{ body, createdAt: Timestamp.now() }, ...comments];
    setComments(_comments);
    setBody('');
    await update({ comments: _comments });
  };

  const handleRemove = async (i: number) => {
    const _comments = [...comments];
    _comments.splice(i, 1);
    setComments(_comments);
    await update({ comments: _comments });
  };

  return (
    <div>
      <div className="flex space-x-2 items-center">
        <Icon name="comment" />
        <h3 className="font-extralight text-lg">
          {`Comments (${comments.length})`}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-2 my-2 group">
        <Input
          type="text"
          value={body}
          onChange={handleInputChange}
          placeholder="Add new comment..."
          className="px-2 py-1 w-48 focus:flex-1 transition-all delay-100"
        />
        <IconButton name="plus" type="submit" className="hidden group-focus-within:block" />
      </form>

      <div className="flex-row space-y-0">
        {comments.map((comment, i) => (
          <div key={i} className="px-0 py-2 border border-transparent relative group">
            <p>{comment.body}</p>

            <IconButton
              name="remove"
              size={4}
              className="absolute right-2 top-[5px] hidden group-hover:block"
              onClick={async () => { await handleRemove(i); }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
