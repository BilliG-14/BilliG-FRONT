import React, { useState, useEffect, useRef } from 'react';

// TOAST UI Editor import
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import styled, { createGlobalStyle } from 'styled-components';
import { descriptionStore } from 'store/PostWriteStore';

export default function PostEditor() {
  const { description, setDescription } = descriptionStore();

  const editorRef = useRef<Editor>(null);

  function handleEditorValue() {
    setDescription(editorRef.current?.getInstance().getHTML());
  }

  console.log(description);
  return (
    <>
      <StyleToastDiv>
        <Editor
          initialValue={' '}
          placeholder="내용을 입력해 주세요"
          initialEditType="wysiwyg"
          hideModeSwitch={true}
          useCommandShortcut={true}
          toolbarItems={[
            // 툴바 옵션 설정
            ['heading', 'bold', 'italic', 'strike'],
            ['hr', 'quote'],
            ['table', 'link'],
            ['code', 'codeblock'],
          ]}
          ref={editorRef}
          onChange={handleEditorValue}
        />
      </StyleToastDiv>
    </>
  );
}

const StyleToastDiv = styled.div`
  & button {
    background: url('data:image/png;base64,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');
    background-repeat: no-repeat;
    background-position: 0 2px;
  }
`;
