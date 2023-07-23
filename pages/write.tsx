import ButtonCustom from '@/components/ButtonCustom';
import { css } from '@emotion/react';
import { EditorState, convertToRaw } from 'draft-js';
import { NextPage } from 'next';
import { useRef, useState } from 'react';
import FadeIn from '@/components/FadeIn';
import dynamic from 'next/dynamic';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import BackBTN from '@/components/BackBTN';

const EditorCustom = dynamic(() => import('@/components/EditorCustom'), {
  loading: () => <div>Loading...</div>,
});

const Write: NextPage = () => {
  const router = useRouter();

  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined,
  );

  // 글 제목 담는 곳
  const titleRef = useRef<HTMLInputElement>(null);

  // 이미지 파일명 담는 곳
  const imgRef = useRef<HTMLInputElement>(null);

  // 글 등록 요청 함수
  // onClick으로 데이터 body에 담아 보냄
  // title, content(json Raw File), img
  const handleSave = async () => {
    try {
      const response: AxiosResponse<any> = await axios.post('/api/write', {
        title: titleRef.current?.value,
        content: JSON.stringify(convertToRaw(editorState!.getCurrentContent())),
        img: imgRef.current?.value,
      });

      if (response.status === 200) {
        alert('Success');
        router.push('/');
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main
      css={css`
        position: relative;
        padding: 0px 20px;
        padding-top: 50px;
      `}
    >
      <FadeIn index={1}>
        <div className="flex">
          <input
            className="flex-1"
            ref={titleRef}
            css={css`
              box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.2);
              margin: 20px 0px;
              padding: 10px 30px;
            `}
            placeholder="제목"
          />
          <input
            className="flex-2"
            ref={imgRef}
            css={css`
              box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.2);
              margin: 20px 0px;
              padding: 10px 30px;
            `}
            placeholder="이미지 파일명"
          />
        </div>
      </FadeIn>

      <FadeIn index={2}>
        <div>
          <EditorCustom
            editorState={editorState}
            onEditorStateChange={setEditorState}
          />
        </div>
      </FadeIn>

      <FadeIn index={3}>
        <div
          css={css`
            position: relative;
            display: flex;
            justify-content: space-between;
            padding: 0px 30px;
          `}
        >
          <Link href="/">
            <BackBTN />
          </Link>

          <ButtonCustom onClick={handleSave}>등록하기</ButtonCustom>
        </div>
      </FadeIn>
    </main>
  );
};

export default Write;
