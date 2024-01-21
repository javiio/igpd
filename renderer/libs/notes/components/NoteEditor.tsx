import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import { Loading, Error } from '~core-ui';
import EditorTheme from './EditorTheme';
import { useNote } from '../';

const Placeholder = ({ placeholder }: { placeholder?: string }) => {
  return <div className="editor-placeholder">{placeholder ?? 'Enter text...'}</div>;
};

const editorConfig = {
  namespace: 'gpdone',
  theme: EditorTheme,
  onError (error) {
    throw error;
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

interface NoteEditorProps {
  noteId: string
  placeholder?: string
}

export const NoteEditor = ({ noteId }: NoteEditorProps) => {
  const { editorState, handleChange, isLoading, error } = useNote(noteId);

  if (error) {
    return <Error />;
  }

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && editorState && (
        <LexicalComposer initialConfig={{ ...editorConfig, editorState }}>
          <div className="editor-container bg-slate-950/50 rounded-md">
            <div className="editor-inner">
              <RichTextPlugin
                contentEditable={<ContentEditable className="editor-input" />}
                placeholder={<Placeholder />}
                ErrorBoundary={LexicalErrorBoundary}
              />
              <HistoryPlugin />
              <AutoFocusPlugin />
              <ListPlugin />
              <LinkPlugin />
              <TabIndentationPlugin />
              <OnChangePlugin onChange={handleChange} ignoreSelectionChange />
              <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            </div>
          </div>
        </LexicalComposer>
      )}
    </>
  );
};
