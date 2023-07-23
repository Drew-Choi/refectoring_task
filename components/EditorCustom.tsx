import dynamic from 'next/dynamic';
import style from './EditorCustom.module.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Dispatch, SetStateAction } from 'react';
import { EditorProps } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { useRouter } from 'next/router';

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  {
    ssr: false,
  },
);

const EditorCustom = ({
  editorState,
  onEditorStateChange,
  readOnly = false,
}: {
  editorState: EditorState | undefined;
  onEditorStateChange?: Dispatch<SetStateAction<EditorState | undefined>>;
  readOnly?: boolean;
}) => {
  return (
    <div className={style.container}>
      <Editor
        toolbarHidden={readOnly}
        editorState={editorState}
        toolbarClassName="editorToolbar-hidden"
        wrapperClassName={`wrapper-class ${style.editorWrap}`}
        editorClassName={`editor-class  ${
          readOnly ? style.editor_readOnly : style.editor
        }`}
        onEditorStateChange={onEditorStateChange}
        toolbar={{ option: ['inline', 'list', 'textAlign', 'link'] }}
        localization={{ locale: 'ko' }}
        readOnly={readOnly}
      />
    </div>
  );
};

export default EditorCustom;
