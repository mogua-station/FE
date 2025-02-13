![image](https://github.com/user-attachments/assets/2b5baf68-b3e3-47f7-a321-466bd26e8274)

# møgua
> 배포 사이트
> 
https://mogua.vercel.app/welcome

## møgua-station

> **code-it** 단기심화 `프론트엔드` 트랙 6기 <br/> 개발기간: `01.03.25 - 02.12.25`

<br/>

**Frontend**

| <img src="https://github.com/joshuayeyo.png" width="100"> | <img src="https://github.com/Stilllee.png" width="100"> |
| :-------------------------------------------------------: | :-----------------------------------------------------: |
|          [곽정원](https://github.com/joshuayeyo)          |         [이에스더](https://github.com/Stilllee)         |
|                  **프론트 배포, CI-CD**                   |               **유저 페이지, 프로필 수정**                |
|                  **로그인, 랜딩페이지**                   |                            **리뷰 활동**                             |

| <img src="https://github.com/ITHPARK.png" width="100"> | <img src="https://github.com/wjsdncl.png" width="100"> |
| :----------------------------------------------------: | :----------------------------------------------------: |
|          [박태현](https://github.com/ITHPARK)          |          [정민재](https://github.com/wjsdncl)          |
|                **찜한 모임, 모임 상세**                |               **메인페이지, 모임 생성**                |

<br/>

**Backend & 디자이너**
| <img src="https://avatars.githubusercontent.com/u/192950560?s=48&v=4" width="100"> | <img src="https://avatars.githubusercontent.com/u/192950560?s=48&v=4" width="100"> |
| :-------------------------------------------------------: | :-----------------------------------------------------: |
| [김기현]() | [김은지]() |
| **백엔드** | **디자이너** |

<br>

## 시작 가이드

### Requirements

- Node.js v20.10.0 or higher
- React v18 or higher

### Installation

```bash
$ git clone https://github.com/mogua-station/fe.git
$ cd fe
$ npm i
$ npm run dev
```

## Stacks

### Environment

![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

### Config

![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)

### Development

![React18](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Next.js14](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)

### Communication

![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)

## 화면 구성

### 랜딩 페이지

- 프로젝트에 대한 간략한 설명을 담은 랜딩페이지입니다.

<img width="1920" alt="スクリーンショット 0007-02-13 7 27 34" src="https://github.com/user-attachments/assets/b0704c11-170b-4ab2-9417-8fc0a06ea096" />

### 모임

#### 모임 찾기 페이지

- 모든 **스터디 | 과외** 모임을 찾을 수 있는 페이지입니다.
- **필터 및 정렬 기능**을 통해 원하는 모임을 쉽게 찾을 수 있습니다.
- 서버사이드에서 `fetch`로 초기 데이터를 가져오고, 클라이언트에서는 React Query를 활용해 초기 데이터를 사용합니다.

<img width="1920" alt="スクリーンショット 0007-02-13 7 40 59" src="https://github.com/user-attachments/assets/0fa6d7c2-818d-4e95-84a9-52140e4eca44" />

#### 모임 생성 페이지

- **스터디 | 과외** 모임을 생성할 수 있습니다.
- **모집 기간, 진행 기간**을 설정하여 일정 관리가 가능합니다.

<img width="1920" alt="スクリーンショット 0007-02-13 7 39 59" src="https://github.com/user-attachments/assets/9b1d03ae-04ed-436e-89b7-ae0342324be9" />

#### 모임 상세 페이지

- 각 모임의 정보 (`모임 현황`, `모임 유형`, `일정`, `참여 인원`, `상세 정보`, `주최자 정보`)를 확인하며 참여 신청을 할 수 있는 페이지 입니다.
- 모임 참여 신청과, 참여 취소로 참여자 정보가 바뀌면 바로 서버에서 다시 데이터를 가져와 최신화 됩니다.
- 회원, 비회원 모두 찜하기 기능을 사용할 수 있습니다.
- 클립보드에 링크를 복사 할 수 있습니다.
- 해당 페이지에서 요청하는 각 기능에 대한 `react-toastify`가 출력됩니다.

<img width="1920" alt="スクリーンショット 0007-02-13 7 40 34" src="https://github.com/user-attachments/assets/f17aaede-5df4-47a2-88c4-f0da6de0d8a7" />
### 로그인 | 회원가입

#### 로그인 인트로 페이지 (/sign-in)

- 로그인 | 회원가입에 진입하기 전, 선택창입니다.
- møgua에서는 카카오 로그인 | 자체 로그인을 모두 지원하고 있습니다.

<img width="1920" alt="スクリーンショット 0007-02-13 7 27 58" src="https://github.com/user-attachments/assets/b0777e1e-341c-4012-aa5d-b3aa657cc299" />

#### 로그인 페이지 (/sign-in/basic)

- 가입하신 `email`, `password`를 입력하여 로그인을 하게 됩니다.
- møgua는 `input`값을 실시간으로 감지하여 이메일, 비밀번호의 형식을 체크해서 유저에게 알려줍니다.

<img width="1920" alt="スクリーンショット 0007-02-13 7 29 01" src="https://github.com/user-attachments/assets/5dfc63d4-b225-4572-b50d-cf1547519b7e" />

#### 회원가입 페이지 (/sign-up)

- `nickname`, `email`, `password`, `Confirm Password` 값을 **input**으로 받게 됩니다.
- møgua에서의 회원가입과 로그인은 **동시에** 진행되니, 다시 로그인 페이지로 돌아갈 필요가 없어요!

<img width="1920" alt="スクリーンショット 0007-02-13 7 29 11" src="https://github.com/user-attachments/assets/589a691c-4686-4417-b7cb-e6fe6cc15eb3" />

#### 회원가입 완료 페이지 (/sign-up/success)

- 회원가입이 완료되면, 새로운 유저를 환영하게 되는 페이지입니다. 이제 møgua에서 함께 즐거운 여행을 떠나보아요!

<img width="1920" alt="スクリーンショット 0007-02-13 7 37 44" src="https://github.com/user-attachments/assets/d1b58aa4-13b8-4def-97c2-02fb13c32a88" />

### 유저

#### 유저 페이지

- 프로필 정보와 4가지 활동 탭(`내 모임`/`내 리뷰`/`만든 모임`/`수강평`)으로 구성되어 있습니다.
  - 내 모임: 참여 중인 스터디/과외 목록
  - 내 리뷰: 스터디/과외별로 구분되며, 각각 '작성 가능한 리뷰'와 '작성한 리뷰' 목록 제공
  - 만든 모임: 생성한 스터디/과외 목록
  - 수강평: 과외선생님이 생성한 과외에 대한 리뷰 목록
- 데이터는 10개씩 무한 스크롤로 자동 로딩되며, 로딩 중에는 스켈레톤 UI를 보여줍니다.
- 페이지 진입 시 새로운 데이터를 요청하고, 이후 10분간은 탭 전환 시에도 캐시된 데이터를 바로 확인할 수 있습니다.
- 본인 페이지에서만 프로필 수정과 리뷰 관리가 가능합니다.
- `과외선생님`은 수강평 탭이 추가로 제공됩니다.

| 마이페이지 (일반유저)                                                                | 다른 유저페이지 (과외선생님)                                                         |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| ![](https://github.com/user-attachments/assets/c9ce5dba-ad7e-4e0f-977f-6153235226c7) | ![](https://github.com/user-attachments/assets/6dcd5fa3-eefa-4562-9c52-b75a8738b221) |

#### 유저 프로필 수정 페이지

- 기존 정보(`닉네임`, `이메일`, `자기소개`, `태그`)가 기본값으로 표시되며, 이메일을 제외한 모든 정보를 수정할 수 있습니다.
- 프로필 이미지는 선택 즉시 미리보기로 확인되며, IndexedDB를 활용해 새로고침해도 유지됩니다.
- 변경사항이 없거나 유효하지 않은 값이 있으면 수정이 제한됩니다.
- 페이지 이탈 시 확인 모달이 표시되어 실수를 방지합니다.

![](https://github.com/user-attachments/assets/fc4fd5d0-7813-4150-bbbc-4ae071b2016c)

#### 리뷰 작성/수정

- 3단계 평점 시스템(그냥 그래요/괜찮아요/추천해요)으로 평가합니다.
- 평점과 리뷰 내용은 필수로 입력해야 하며, 사진은 1장까지 선택적으로 첨부할 수 있습니다.
- 수정 시에는 기존 리뷰 정보가 기본값으로 표시되며, 변경사항이 있어야만 수정이 가능합니다.
- 작성/수정 완료 시 유저 페이지의 리뷰 목록이 자동으로 업데이트됩니다.

| 리뷰 작성                                                                            | 리뷰 수정                                                                            |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| ![](https://github.com/user-attachments/assets/59d67797-8f15-4f61-82f6-4fcc896eda06) | ![](https://github.com/user-attachments/assets/a05c1390-6cc0-46c6-ab34-abd07111e5ee) |

#### 리뷰 삭제

- 유저 페이지에서 더보기 메뉴를 통해 즉시 삭제할 수 있습니다.
- 삭제 전 확인 모달을 통해 실수를 방지합니다.
- 삭제 즉시 리뷰 목록에서 제거되며, 관련 데이터가 자동으로 업데이트됩니다.
  ![](https://github.com/user-attachments/assets/dd67c768-1c2b-4306-8be0-cc779fcd2d38)

### 북마크 페이지

- 유저가 찜한 목록들을 확인할 수 있는 페이지 입니다.
- 비회원 유저일 시 `localStorage`에 저장된 값이 출력되게 됩니다.
- 비회원 유저로 찜한 목록들은 로그인하면 모두 해당 유저의 찜한 목록으로 추가 됩니다.
- 북마크 취소 시 현재 페이지에서 사라지게 됩니다.
- 찜한 목록은 10개씩 페이징 처리되어 무한스크롤이 구현 되어있습니다.
- **`스터디 | 과외`**, **`지역별`**, **`최근 등록순 | 모집 마감순 | 참여인원 많은순`**으로 데이터 필터링이 가능합니다.

<img width="1920" alt="スクリーンショット 0007-02-13 7 42 00" src="https://github.com/user-attachments/assets/f141573e-4974-4606-ab91-5d0abe1d1453" />

## 신경쓴 기능

### 유저 이미지 업로드

- møgua는 서버의 부하를 줄이고 더 나은 유저의 경험을 위해 `indexedDB`를 사용해 이미지를 저장해요!
- 새로고침을 하더라도 **페이지를 떠나지 않는 한**, 업로드한 이미지는 그대로 **유지**된답니다.

### 비로그인 유저의 찜하기 기능

- 유저가 회원가입을 해야만이 관심이 있는 모임을 저장할 수 있는 부담스러운 상황을 위하여 회원가입 없이도 모임을 찜해 놓을 수 있어요!
- 비로그인 유저의 찜한 모임은 `localStorage` 에 저장되어 페이지를 떠나도 유지가 됩니다!
- 비로그인 상태에서 찜하기를 해놓은 모임은 로그인 시 해당 유저의 찜한 목록으로 추가돼요

### 찜하기 기능 UX

- 회원 찜하기 기능에서 네트워크 환경마다 다른 처리속도와 요청 완료 시 UI 반영까지의 속도를 고려하여 유저의 이탈 또는 불필요한 동작을 방지하기 위하여 **React Query로** **낙관적 업데이트**를 적용했어요!
  | 적용 전 | 적용 후 |
  |----------------------|---------------------------|
  | ![](https://github.com/user-attachments/assets/f8cae672-3de3-4c98-bad0-49f259b1b656) | ![](https://github.com/user-attachments/assets/8e7faf8b-b931-45b4-84e7-ce48c5e7459f) |

낙관적 업데이트 적용으로 네트워크 환경에 영향을 받지 않고 UI 업데이트를 하도록하여 사용자의 이탈 또는 불필요한 동작을 방지할 수 있도록 UX를 개선했어요!

### 반응형 스켈레톤 UI를 활용한 로딩 상태 처리

- 유저페이지에서는 사용자 기기의 화면 크기에 따라 적절한 개수의 스켈레톤 UI를 보여주도록 구현했습니다.
- 모바일과 태블릿에서는 3개, 데스크탑에서는 6개의 스켈레톤을 표시하여 자연스러운 레이아웃을 유지하면서도 로딩 중임을 효과적으로 전달합니다.

| 태블릿                                                                               | 데스크탑                                                                             |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| ![](https://github.com/user-attachments/assets/b466040f-2b52-47f8-b848-7ee7a3366919) | ![](https://github.com/user-attachments/assets/c199d5d1-3349-481a-b8b9-2bde5bb477c5) |
