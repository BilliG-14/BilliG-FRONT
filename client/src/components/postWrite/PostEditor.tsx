import React, { useState, useEffect } from 'react';

// TOAST UI Editor import
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

export default function PostEditor() {
  return (
    <>
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
      />
    </>
  );
}
/*
import React, { useState, useEffect, useRef } from 'react';
import Button from '../../components/Button/Button';
import { useNavigate, useParams } from 'react-router-dom';

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

import 'prismjs/themes/prism.css';
import Prism from 'prismjs';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

import styles from './Write.module.css';
import store from '../../utils/store';

let timer;
const debounce = (cb, delay) => {
  clearTimeout(timer);
  timer = setTimeout(() => cb(), delay);
};

const Write = ({ onSubmit, onUpdate }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const titleRef = useRef();
  const editorRef = useRef();

  const postData = store.getData('posts').find((e) => e.id === Number(postId));
  const initialValue = {
    id: new Date().getTime(),
    title: '',
    content: '',
    author: '',
    img: [],
  };
  const [windowSize, setWindowSize] = useState('vertical');
  const postTemplate = useRef(initialValue);

  const handleChange = ({ target }) => {
    const title = titleRef.current.value;
    const content = editorRef.current?.getInstance().getMarkdown();
    postTemplate.current.title = title;
    postTemplate.current.content = content;
    debounce(() => {
      store.setData('current_post', postTemplate.current);
    }, 600);
  };

  const handleResize = () => {
    window.innerWidth > 1000 ? setWindowSize('vertical') : setWindowSize('tab');
  };

  const onUploadImage = (blob, cb) => {
    initialValue.img.push(blob);
    return false;
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    editorRef.current?.getInstance().reset();
    const loginUser = store.getData('logedInUser');

    if (!loginUser) {
      navigate('/login', { replace: true });
    }

    const currentPost = postId ? postData : store.getData('current_post');

    if (loginUser) {
      postTemplate.current.author = loginUser.id;
      if (!currentPost) {
        return;
      } else if (currentPost) {
        postId && (postTemplate.current.id = currentPost.id);
        titleRef.current.value = currentPost.title;
        editorRef.current?.getInstance().setMarkdown(currentPost.content, true);
      }

      return () => {
        window.removeEventListener('resize', handleResize);
        if (document.readyState === 'complete') {
          console.log('페이지 이동');
          store.removeStore('current_post');
        } else if (document.readyState === 'interactive') {
          console.log('새로고침');
        }
      };
    }
  }, [navigate]);

  return (
    <div className={styles.editor}>
      <h1>제목</h1>
      <input
        type="text"
        className={styles.title}
        placeholder="제목을 입력 해 주세요"
        ref={titleRef}
        name="title"
        onChange={handleChange}
      />
      <hr />
      <Editor
        initialValue={' '}
        placeholder="내용을 입력해 주세요"
        previewStyle={windowSize}
        height="calc(100% - 10rem)"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        toolbarItems={[
          // 툴바 옵션 설정
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'image', 'link'],
          ['code', 'codeblock'],
        ]}
        plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
        onChange={handleChange}
        // theme="dark"
        ref={editorRef}
        name="content"
        hooks={{
          addImageBlobHook: onUploadImage,
        }}
      />
      <div className={styles['btn-container']}>
        <Button
          onClick={
            postId
              ? onUpdate(postId, postTemplate.current)
              : onSubmit(postTemplate.current)
          }
          to={postId ? `/post/${postId}` : '/'}
        >
          {postId ? '수정하기' : '게시하기'}
        </Button>
      </div>
    </div>
  );
};

export default Write;
*/
