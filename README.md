# BilliG

### 💁‍♀️ 안녕하세요! 빌려주고 빌리는 **BilliG** 입니다 🙆

<br/>
<br/>
<br/>

## 1. 서비스 소개

**서비스 도메인**

https://billig-v3.vercel.app/

<br/><br />

#### 기술 스택

![](https://velog.velcdn.com/images/gyuri092/post/dbb539e8-c09e-463c-9b3a-d6f70b7639a6/image.png)
<br /><br /><br /><br />

#### 웹서비스 개요

<img src="https://post-phinf.pstatic.net/MjAxODA1MTFfMjgg/MDAxNTI2MDE3Nzg4NzMy.yQLmmQwgk2Hp5la1F0DHz_0u6nDw6KB9p8LWHTv54eAg.mTk20tQBpooTksMFyc1mNBDUA_-grZOetiD2ehbzN5Ig.JPEG/%EA%B0%80%EC%9E%A5_%EC%89%AC%EC%9A%B4_%EB%8F%85%ED%95%99_%EC%9D%BC%EB%B3%B8%EC%96%B4_21_02.jpg?type=w1200" width="30%"/>

    - "아이디어 회의를 통해 잠깐 쓸 물건을 구매하기엔 부담되고,
    사고싶은 물건을 구매하기전에 빌려서 사용하면 좋겠다 그리고 물건을 빌려주면서 수익을 얻을 수 있으면 어떨까?
    라는 아이디어에서 <물품 대여 서비스> 를 기획하게 되었습니다."

<br />

#### 페르소나

![developer](https://cdn.maily.so/p6wefegm4wzha7wktoaf2rwvo9i0)

💡 주수태 (30세, zustand) : <strong>"한번 쓸 제품을 구매하는게 부담스러워요. 중고 제품을 사는게 아니라 제품을 대여하고 싶어요."</strong>

<br />

## 2. 주요 기능 설명

**웹서비스의 유용성, 편의성 및 시각화의 실용성에 대한 설명**

- 주요 기능 (주된 활용성) 및 서브 기능 소개
  1. 카테고리별 조회
  2. 검색 기능
  3. 빌려주기/빌리기 게시물 내 거래 프로세스
  4. 채팅 기능
     <br />
- 프로젝트만의 차별점, 기대 효과
  1. 사용자간의 자유로운 거래가 가능하다.
  2. 없다.
  3. 감사합니다.

<br />

## 3. 서비스 구성도

<details>
<summary>서비스 구조도</summary>
<div markdown="1">

WORKFLOW (figjam)
![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3f9e8c59-dbf0-47e6-937f-aa8d5e651015/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221229T053237Z&X-Amz-Expires=86400&X-Amz-Signature=8bfe45614b542fa27ea99239195d12689b4a928ed218903ab2662cd46e0f25aa&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

</div>
</details>
<br/>
<details>
<summary>와이어프레임</summary>
<div markdown="1">
UI 작성 (figma)

![uiFigma](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ebbf8d50-16e9-4762-b987-4fe9d31c2427/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221229T053127Z&X-Amz-Expires=86400&X-Amz-Signature=590fd9e44cf8a4c3a35a9c0c3c846d8279cf006c097751c71848bfd43d6a894f&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

</div>
</details>

<br/>
<details>
<summary>API 명세</summary>
<div markdown="1">

- [유저 관련](https://documenter.getpostman.com/view/14584609/2s8YzZPymE)

- [공지사항 및 채팅](https://documenter.getpostman.com/view/14584609/2s8YzZPyv2)

- [신고 관련](https://documenter.getpostman.com/view/14584609/2s8Z6sZvEL)

- [카테고리 관련](https://documenter.getpostman.com/view/24980951/2s8YzZQzD6)

- [게시물 관련](https://documenter.getpostman.com/view/24980951/2s8YzZPyv3)
</div>
</details>
<br/>

## \* 페이지별 상세 설명

<br />
1. 메인화면, 홈 화면, 카테고리별 보기, 검색

<br/>

| 기능             | 설명                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------ |
| 메인화면         | 빌리지가 제공하는 서비스를 설명합니다.                                                     |
| 홈               | 카테고리 별 최신상품을 조회합니다.                                                         |
| 카테고리 별 조회 | pagination을 통해 카테고리별 게시글들을 조회합니다.                                        |
| 검색             | 등록된 게시물 기준 인기있는 해시태그를 제공하고, 해시태그 기반으로 검색 결과를 제공합니다. |

<details>
<summary>시연영상</summary>
<div markdown="1">

|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| ![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d322cf02-4859-4d91-8fb5-1e58de01340f/%EB%A9%94%EC%9D%B8.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221229T060858Z&X-Amz-Expires=86400&X-Amz-Signature=aee0409cd15e9836044380c4ea7609bd945c9dedc16ee12008cd5327c8ad9c88&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22%25EB%25A9%2594%25EC%259D%25B8.gif%22&x-id=GetObject) | ![](https://velog.velcdn.com/images/gyuri092/post/9135fb8b-379e-4d6c-b4d2-eef4e2e03630/image.gif) |
| 메인화면                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 홈 화면                                                                                           |
| ![](https://velog.velcdn.com/images/gyuri092/post/95bb714a-8105-43a7-bbef-d2b016e416db/image.gif)                                                                                                                                                                                                                                                                                                                                                                                                                                              | ![](https://velog.velcdn.com/images/gyuri092/post/a89f05b4-7301-40a2-99fd-ead7b5f5f43d/image.gif) |
| 카테고리 별 조회                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 검색 화면                                                                                         |

</div>
</details>
<br/>
<br/>
2. 사용자 회원가입, 로그인

<br/>

| 기능     | 설명                                           |
| -------- | ---------------------------------------------- |
| 회원가입 | 회원정보를 입력하여 가입할 수 있습니다.        |
| 로그인   | 이메일과 비밀번호를 통해 로그인할 수 있습니다. |

<details>
<summary>시연영상</summary>
<div markdown="1">

|                                                                                                    |
| -------------------------------------------------------------------------------------------------- |
| ![](https://cdn.discordapp.com/attachments/1057790792715997294/1057791118416293918/Untitled_1.gif) |
| 회원가입, 로그인                                                                                   |

</div>
</details>
<br/>
<br/>

2-1. 비로그인 유저

<br/>

| 기능          | 설명                                                  |
| ------------- | ----------------------------------------------------- |
| 비로그인 유저 | 로그인 권한이 필요할 경우 로그인 화면으로 이동합니다. |

<details>
<summary>시연영상</summary>
<div markdown="1">

|                                                                                                   |
| ------------------------------------------------------------------------------------------------- |
| ![](https://velog.velcdn.com/images/gyuri092/post/9c196966-b2e7-4d61-91d7-a6e09c64f09f/image.gif) |
| 비로그인 유저 플로우                                                                              |

</div>
</details>
<br/>
<br/>
3. 게시글 작성/조회/수정/삭제

<br/>

| 기능             | 설명                                                                                                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 게시글 작성/조회 | 사용자는 빌려주기 게시물, 빌리기 게시물을 작성할 수 있습니다. <br/> 원하는 이미지를 등록한 후 에디터를 이용해서 상세설명을 작성할 수 있고, 해시태그를 등록할 수 있습니다. |
| 게시글 수정/삭제 | 작성자에 한해서 수정/삭제 버튼이 보이고, <br/>거래 전일때만 게시글을 수정하거나 삭제할 수 있습니다 .                                                                      |

<details>
<summary>시연영상</summary>
<div markdown="1">

|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f33de186-e3ae-4488-9e2a-fa86e0a20846/%EA%B8%80%EC%9E%91%EC%84%B1.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221229T093805Z&X-Amz-Expires=86400&X-Amz-Signature=5c2a886e4ac5eb4a3c862f5dee7f9df4e29cbb5ea0c04e12d54b5c3c644c3977&X-Amz-SignedHeaders=host&x-id=GetObject)                                                    | ![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/dbba8d7d-471c-4124-938f-bbbfff85aac0/%EB%B9%8C%EB%A6%AC%EA%B8%B0-%EB%B9%8C%EB%A0%A4%EC%A4%80_%EC%9C%A0%EC%A0%80%EA%B0%80_%EB%B0%98%EB%82%A9%EC%99%84%EB%A3%8C.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221229T114901Z&X-Amz-Expires=86400&X-Amz-Signature=19ec56662135d29032788269a1bb05f86fe3e83e6868f2464bc61bfbee7e37f6&X-Amz-SignedHeaders=host&x-id=GetObject)                  |
| 게시글 작성/조회                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 게시글 수정                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/de31dee9-f998-4b68-98e8-a2a8becd898a/%EA%B8%80%EC%82%AD%EC%A0%9C%28%EA%B1%B0%EB%9E%98%EC%A0%84%EC%83%81%ED%83%9C%29.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221229T093804Z&X-Amz-Expires=86400&X-Amz-Signature=515f9a6ecf501f50f751c667e9658140a276e338775059a5d9a4c49f7d130e08&X-Amz-SignedHeaders=host&x-id=GetObject) | ![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/28167149-b683-471d-aeb1-27cef006f944/%EA%B8%80%EC%82%AD%EC%A0%9C%EA%B8%80%EC%88%98%EC%A0%95-%EA%B1%B0%EB%9E%98%EC%A4%91%EC%9D%BC%EB%95%8C%EB%8A%94_%EB%B6%88%EA%B0%80%EB%8A%A5.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221229T093805Z&X-Amz-Expires=86400&X-Amz-Signature=c9e7de95185b3e49a18d6047b505b300f0fafbb963354235025d6854b4666b60&X-Amz-SignedHeaders=host&x-id=GetObject) |
| 게시글 삭제                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 거래중 상태에선 수정/삭제 불가                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

</div>
</details>
<br/>
<br/>
3-1. 게시글 내 거래 프로세스

<br/>

| 기능               | 설명                                                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 거래하기           | 채팅을 통해 전달받은 대여인/차용인의 이메일을 적어 대여인/차용인, 대여기간을 등록할 수 있습니다. <br/>                                     |
| 수령완료           | 차용인이 대여물품을 수령하면 누르는 버튼입니다. <br/> 수령완료 버튼을 눌러야지만 대여인이 반납완료(거래종료)처리를 할 수 있습니다.         |
| 반납완료(거래종료) | 대여인이 대여해준 물품을 다시 받은 후 거래종료 상태를 만드는 버튼입니다. <br/> 차용인이 수령완료 처리를 하지 않으면 반납을 할 수 없습니다. |

<details>
<summary>시연영상</summary>
<div markdown="1">
<br/>

**빌려주기**
| | |
| --- | -------- |
| ![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/63ff54a8-08de-4568-a3ed-e2d2f0841dda/%EB%B9%8C%EB%A0%A4%EC%A3%BC%EA%B8%B0-%EB%B9%8C%EB%A6%AC%EB%8A%94_%EC%9C%A0%EC%A0%80_%EB%93%B1%EB%A1%9D.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221229T114850Z&X-Amz-Expires=86400&X-Amz-Signature=1f1e5ba01d1cec8dcae30ab959de705bbc7930e33ee9c3484d0a0b92d20fb01c&X-Amz-SignedHeaders=host&x-id=GetObject) | ![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/633209b0-d858-46cd-a8b3-c4e2b5b1f1b0/%EB%B9%8C%EB%A0%A4%EC%A3%BC%EA%B8%B0-%EB%B9%8C%EB%A6%B0_%EC%9C%A0%EC%A0%80%EA%B0%80_%EC%88%98%EB%A0%B9%EC%99%84%EB%A3%8C.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221229T114849Z&X-Amz-Expires=86400&X-Amz-Signature=f018874f5437fa1d6148ddb4061777221695157d63b36e02f77ee62467483382&X-Amz-SignedHeaders=host&x-id=GetObject) |
| 거래하기 | 수령완료 |
| ![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/0948db4c-d6d0-4775-8f70-ee91489da4b0/%EB%B9%8C%EB%A0%A4%EC%A3%BC%EA%B8%B0-%EB%B9%8C%EB%A0%A4%EC%A4%80%EC%9C%A0%EC%A0%80%EA%B0%80_%EB%B0%98%EB%82%A9%EC%99%84%EB%A3%8C.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221229T114850Z&X-Amz-Expires=86400&X-Amz-Signature=ba42fb3ae89b8ae710ab4b822104560234b8bab6953eda25da020264b7b050a9&X-Amz-SignedHeaders=host&x-id=GetObject) |
| 반납완료 |
<br/>

**빌리기**
| | |
| --- | -------- |
| ![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9514a7fe-b84c-4f72-a4fe-b9592e4834fb/%EB%B9%8C%EB%A6%AC%EA%B8%B0-_%EB%B9%8C%EB%A0%A4%EC%A3%BC%EB%8A%94_%EC%9C%A0%EC%A0%80_%EB%93%B1%EB%A1%9D.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221229T114901Z&X-Amz-Expires=86400&X-Amz-Signature=135838a21272ea31fe2af9cfbb4b4f034ec163b5226a64ec9a9a339836d7e7e3&X-Amz-SignedHeaders=host&x-id=GetObject) | ![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/6471a508-388a-4724-b0e1-0fb2d31a714f/%EB%B9%8C%EB%A6%AC%EA%B8%B0-%EB%B9%8C%EB%A6%AC%EB%8A%94_%EC%9C%A0%EC%A0%80%EA%B0%80_%EC%88%98%EB%A0%B9%EC%99%84%EB%A3%8C.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221229T114901Z&X-Amz-Expires=86400&X-Amz-Signature=07073a02707a987a464689c730e30250fc1cca8e4734de8cc9405569b576e764&X-Amz-SignedHeaders=host&x-id=GetObject) |
| 거래하기 | 수령완료 |
| ![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/dbba8d7d-471c-4124-938f-bbbfff85aac0/%EB%B9%8C%EB%A6%AC%EA%B8%B0-%EB%B9%8C%EB%A0%A4%EC%A4%80_%EC%9C%A0%EC%A0%80%EA%B0%80_%EB%B0%98%EB%82%A9%EC%99%84%EB%A3%8C.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221229T114901Z&X-Amz-Expires=86400&X-Amz-Signature=19ec56662135d29032788269a1bb05f86fe3e83e6868f2464bc61bfbee7e37f6&X-Amz-SignedHeaders=host&x-id=GetObject) |
| 반납완료 |

</div>
</details>
<br/>
<br/>
4. 채팅

<br/>

| 기능            | 설명                                                                                                                                                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 채팅하기/채팅방 | 다른 사람과 실시간 대화가 가능하며, room을 구현하여 사용자별 1대1 채팅할 수 있습니다. 대여 물품 상세페이지에서 채팅하기 버튼을 통해 접근하여 최초 채팅방을 생성하며, 이후 메인 화면 우측 하단의 채팅 아이콘으로 접근할 수도 있습니다. |

<details>
<summary>시연영상</summary>
<div markdown="1">

|                                                                                                   |
| ------------------------------------------------------------------------------------------------- |
| ![](https://velog.velcdn.com/images/gyuri092/post/6bf04592-4d30-4fcd-b8f7-002047203ba9/image.gif) |
| 채팅                                                                                              |

</div>
</details>
<br/>
<br/>
5. 마이 페이지

<br/>

| 기능               | 설명                                                                             |
| ------------------ | -------------------------------------------------------------------------------- |
| 개인정보 수정      | 회원 정보를 수정합니다.                                                          |
| 비밀번호 변경/탈퇴 | 비밀번호를 수정하고, 탈퇴가 가능합니다.                                          |
| 내 활동 조회       | 사용자가 올린 게시물(빌려주기/빌리기)을 확인할 수 있습니다.                      |
| 내 거래 조회       | 사용자가 대여인/차용인으로 등록되어 있는 글들을 거래 현황에 따라 볼 수 있습니다. |

<details>
<summary>시연영상</summary>
<div markdown="1">

|                                                                                                   |                                                                                                   |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| ![](https://velog.velcdn.com/images/gyuri092/post/8d20de9e-1983-4d00-9532-fcf0239d99b5/image.gif) | ![](https://velog.velcdn.com/images/gyuri092/post/73fea6d6-a809-4d0c-a6f2-877bcc83bed5/image.gif) |
| 개인정보 수정                                                                                     | 비밀번호 변경/탈퇴                                                                                |
| ![](https://velog.velcdn.com/images/gyuri092/post/c02cc4f8-7be6-4637-9854-feb087b97123/image.gif) | ![](https://velog.velcdn.com/images/gyuri092/post/4f7ee600-f939-4199-b000-4a8d8e524eee/image.gif) |
| 내 활동 조회                                                                                      | 내 거래 조회                                                                                      |

</div>
</details>
<br/>
<br/>
6. 공지사항

<br/>

| 기능     | 설명                        |
| -------- | --------------------------- |
| 공지사항 | 공지사항 조회가 가능합니다. |

<details>
<summary>시연영상</summary>
<div markdown="1">

|                                                                                                   |
| ------------------------------------------------------------------------------------------------- |
| ![](https://velog.velcdn.com/images/gyuri092/post/e5f76f88-cb54-4d18-8953-55532d1dd3a2/image.gif) |
| 공지사항 조회                                                                                     |

</div>
</details>
<br/>
<br/>
7. 관리자

<br/>

| 기능          | 설명                                              |
| ------------- | ------------------------------------------------- |
| 회원 관리     | 회원 조회, 신고내역 확인, 회원 정지가 가능합니다. |
| 게시물 관리   | 게시한 모든 글의 조회, 삭제가 가능합니다.         |
| 카테고리 관리 | 카테고리 추가, 수정, 삭제가 가능합니다.           |
| 공지사항 관리 | 공지사항 글 작성, 삭제, 조회가 가능합니다.        |

<details>
<summary>시연영상</summary>
<div markdown="1">

|                                                                                                            |                                                                                                    |
| ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| ![](https://cdn.discordapp.com/attachments/1057790792715997294/1057790907329552404/2022-12-29_7.38.12.gif) | ![](https://cdn.discordapp.com/attachments/1057790792715997294/1057791285525745724/Untitled_2.gif) |
| 공지사항 작성, 조회                                                                                        | 신고내역 삭제 가능                                                                                 |
| ![](https://cdn.discordapp.com/attachments/1057790792715997294/1057791453708955798/Untitled_3.gif)         |
| 신고내역 확인 후 계정 정지                                                                                 |

</div>

</details>
<br/>
<br/>
8. 404

<br/>

| 기능          | 설명                                                        |
| ------------- | ----------------------------------------------------------- |
| 404 Not found | 해당 서버 내에서 파일을 찾지 못했을 때 나오는 페이지입니다. |

<details>
<summary>시연화면</summary>
<div markdown="1">

|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/46f357b0-0b07-4a1f-83af-668c51bf03d1/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221229T092917Z&X-Amz-Expires=86400&X-Amz-Signature=e62072a782826ccfb3526eaf4ce3ce5d6ae2394489685c4732689c4f6524ac73&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject) |
| 404 Not Found                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

</div>

</details>
<br/>
<br/>
<br/>

## 4. 프로젝트 팀원 역할 분담

| 이름                    | 담당 업무            |
| ----------------------- | -------------------- |
| :whale:한대근           | 팀장/프론트엔드 개발 |
| :rabbit:권민영          | 프론트엔드 개발      |
| :high_brightness:오승연 | 프론트엔드 개발      |
| :snowflake:권규리       | 프론트엔드 개발      |
| :fire:손병진            | 백엔드 개발          |
| :hocho:유의석           | 백엔드 개발          |

<br/>

**멤버별 responsibility**

1. 한대근: 팀장/프론트엔드 담당

- 기획 단계: UI 디자인, workflow 작성, Basic/Advanced 기능 구체화
- 개발 단계: 프로젝트 초기셋팅, SubMain, Mypage, SearchPage, 로그인유지 구현
- 수정 단계: 기획/스크럼 진행, 팀 Task 관리(칸반보드), 발표준비

<br/>

2. 권규리: 프론트엔드 담당

- 기획 단계: figma ui 디자인, workflow 작성, 대여 프로세스 구체화
- 개발 단계: socket.io 채팅 기능 구현, nav, footer ui 구현
- 수정 단계: socket.io 채팅 에러 수정 및 추가 기능 도입 및 진행

<br/>

3. 권민영: 프론트엔드 담당

- 기획 단계: figma UI 디자인, workflow 작성
- 개발 단계: 게시글 작성, 조회, 수정, 삭제 구현/빌리지 로고 구현
- 수정 단계: 게시글 작성 시 에디터 적용

<br/>

4. 오승연: 프론트엔드 담당

- 기획 단계: UI 디자인, workflow 작성
- 개발 단계: 메인화면 UI, 카테고리별 게시물 목록, 관리자 페이지, 로그인/회원가입 UI, 이미지 디자인
- 수정 단계: 발표 자료 준비, 채팅창 CSS 수정 작업

<br/>

5. 손병진: 백엔드 담당

- 기획 단계: 디비 구조 정리 및 역할 분담
- 개발 단계: 유저, 채팅 관련 작업 진행
- 수정 단계: 가상머신, 클라우드타입을 활용한 배포

<br/>

6. 유의석: 백엔드 담당

- 기획 단계: 디비 구조 정리 및 역할 분담
- 개발 단계: 상품, 배포 관련 작업 진행
- 수정 단계: ec2, ssl 인증을 활용한 https 배포

<br/>

## 5. 제작 환경

1. SCRUM

- 평일 13시 스크럼 진행
- 필요시 수시로 프론트/백엔드/전체 스크럼 잡아서 진행

<br/>

2. 커밋메시지 컨벤션

- `git commit -m "kind : Content"`
- `feat` : 새로운 기능 추가
- `fix` : 버그 수정 (이슈 존재 시 `#number`)
- `docs` : README 수정 시 사용,
- `test` : 테스트 코드 관련,
- `update` : 빌드 업무 수정, 패키지 매니저 수정

<br/>

## 6. 실행 방법

**- 프론트엔드:**

실행방법(Execution method)

    ```
    git clone https://kdt-gitlab.elice.io/sw_track/class_03/web_project_2/team14/initialization.git
    yarn install
    yarn start
    ```

.env 설정(.env setting)

    ```
    MONGODB_URL = {YOUR_MONGODB_URL}
    PORT = {PORT}

    REACT_APP_KAKAO_MAP_KEY = {YOUR_KAKAO_MAP_KEY}
    REACT_APP_AWS_EC2 = {AWS_EC2}
    ```

<br/>

**- 백엔드:**

```bash
1. mongodb 실행
2. yarn start (혹은 npm start)
```

<br/>

## 7. 버전

- 0.0.3

<br/>
