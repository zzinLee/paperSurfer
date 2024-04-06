  # **PaperSurfur**
  
  <img width="341" alt="papersurferHome" src="https://github.com/zzinLee/paperSurfer/assets/91821887/4fe5ac79-f4b8-4629-ac74-436a09c41454">

  <br>
  <br>
  
  참고 문헌 시각화 웹 서비스, PaperSurfer <br>
  당신의 연구에 참고할 논문을 빠르게 파악할 수 있도록 돕습니다.<br>
  
  Reference visualization web service, PaperSurfer <br> 
  It helps you quickly find the references you need for your research. <br>


  <br>
  
  
  ## 🔗 Links

  [![Deploy Site Badge](https://img.shields.io/badge/papersurfer.zzinlee.dev-grey?style=for-the-badge&logo=netlify&link=https://papersurfer.zzinlee.dev)](https://papersurfer.zzinlee.dev)
  [![Notion Badge](https://img.shields.io/badge/papersurfer-grey?style=for-the-badge&logo=Notion&logoColor=white&link=https://zzinlee.notion.site/PAPERSURFER-04cfe46820e74477a5580b581c74816f?pvs=4)](https://zzinlee.notion.site/PAPERSURFER-04cfe46820e74477a5580b581c74816f?pvs=4)
  
  
  <br>
  

  ## 🛠️ Tech Stacks
  
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/tailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
  <img src="https://img.shields.io/badge/zustand-8A385D?style=for-the-badge">
  <img src="https://img.shields.io/badge/D3.js-F9A03C?style=for-the-badge&logo=D3.js&logoColor=white">
  <img src="https://img.shields.io/badge/reactpdf-F12200?style=for-the-badge">
  <br>

<!--
  ### Deploy and Test
  <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
  <img src="https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white">
  <img src="https://img.shields.io/badge/vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white">
-->
  
</div>

<br></br>

<div>

  ## Contents
  * [🪽 Motivation](#-motivation)
  * [🎨 Concept](#-concept)
  * [✨ Feature](#-feature)
    * [(1) 키워드 검색 기능](#1-키워드-검색-기능)
    * [(2) 그래프 뷰 제공과 논문 파도 타기 기능](#2-그래프-뷰-제공과-논문-파도-타기-기능)
    * [(3) 테이블 뷰 제공](#3-테이블-뷰-제공)
    * [(4) PDF 파일 웹 뷰어](#4-pdf-파일-웹-뷰어)
  * [⛰ Challenge](#-challenge)
    * [0. 프로젝트 시작하기 전 논문 데이터 처리에 대한 고민](#0-프로젝트-시작하기-전-논문-데이터-처리에-대한-고민)
      * [0-1. 각 논문을 어떻게 구분할 수 있을까](#0-1-각-논문을-어떻게-구분할-수-있을까)
      * [0-2. 필요한 논문 메타 데이터를 정리하고, 시각화 대상을 명확히 하자](#0-2-필요한-논문-메타-데이터를-정리하고-시각화-대상을-명확히-하자)
    * [1. 참고 문헌 정보는 어디서, 어떻게 가져올 것인가?](#1-참고-문헌-정보는-어디서-어떻게-가져올-것인가)
      * [1-1. 참고 문헌 정보를 어디서 가져올 것인가?](#1-1-참고-문헌-정보를-어디서-가져올-것인가)
      * [1-2. 참고 문헌 정보를 어떻게 가져올 것인가?](#1-2-참고-문헌-정보를-어떻게-가져올-것인가)
    * [2. 그래프 뷰는 어떤 구조로 그릴 것인가?](#2-그래프-뷰는-어떤-구조로-그릴-것인가)
    * [3. 개선된 UI/UX를 위한 Web Storage 사용과 zustand 사용](#3-개선된-uiux를-위한-web-storage-사용과-zustand-사용)
    
    <!-- * [4. PDF를 웹에서 다루기](#4-pdf를-웹에서-다루기) -->
  * [💭 Memoir](#-memoir)
  
</div> 

<br></br>

<!-- 
<div>

  ## 👀 Project Preview
  
</div>
--> 


<div>

  ## 🪽 Motivation
  
  <div align="center">
    <br>
    대학원에서 학위취득을 위해 공부하고 화장품 연구원으로 근무하며 느꼈던 불편함을 해소하고자 하였습니다. <br>
    연구원들은 키워드 검색을 통해 얻은 참고문헌, 그 참고문헌의 참고문헌, ... 계속해서 파도타기 하듯 논문을 수집합니다. <br>
    </br>
    <img width="500" alt="무엇을왜시각화하나요" src="https://github.com/zzinLee/paperSurfer/assets/91821887/de0e18c0-3d68-4253-b81c-ee83fdbabb80">
  </div>

  ### 기존 방식의 불편함
  
  1) 논문의 PDF 파일을 다운로드 받고, 직접 파일을 열어 참고문헌을 확인해야 합니다. <br>
  2) 논문의 신뢰도를 확인하기 위해 직접 인터넷 사이트 *(ex.Google Scholar ...)* 를 방문하여 인용횟수를 확인해야 합니다. <br>

  ### 불편함의 개선
  
  1) PDF 파일을 직접 열어 참고문헌을 확인하는 것 대신 링크 연결을 통해 확인하도록 하였습니다. <br>
  2) 참고문헌과 인용횟수를 일일이 확인하는 것 대신 그래프 시각화를 통해 확인하도록 하였습니다. <br>

  </br>

  ## 🎨 Concept
  <br>

  <div align="center">
    <img width="889" alt="프로젝트컨셉" src="https://github.com/zzinLee/paperSurfer/assets/91821887/12d6bc64-fc05-4853-b90c-d3da14fd463c">
  </div>

  <br></br>

  ## ✨ Feature
  
  연구원들은 논문을 통해 학습하고, 프로토콜 및 연구노트를 작성합니다. <br>
  이 과정에 있어서 논문의 인용관계, 인용횟수 등은 주요한 학습 포인트를 제공합니다. <br>

  이 서비스는 연구원들에게 개별 논문의 참고문헌*Reference*에 대한 그래프 뷰를 제공하고, <br>
  참고문헌을 클릭하면 다시 관련 논문 그래프 뷰를 생성하도록 합니다. <br>

  재귀적으로 생성되는 그래프 뷰를 통해 논문들 간의 관계를 보기 쉽게 제공하고, <br>
  참고할 만한 논문을 빠르게 파악할 수 있도록 돕습니다.

  <br>

  ### (1) 키워드 검색 기능
  
  #### 1) 키워드를 검색창에 검색하고, 원하는 논문을 리스트에 추가할 수 있습니다.

  <div align="center">
    
  ![Feat1-1. Search](https://github.com/zzinLee/paperSurfer/assets/91821887/13d8e7f4-eb18-4007-9302-de79a3da0087)
  
  </div>

  - `새로운 문서` 버튼을 클릭한 후 나타난 `input`에 문서 이름을 입력합니다.
  - 새로 나타난 `문서목록`에서 문서 이름을 클릭합니다.
  - 생성된 논문 검색창에 키워드를 입력하고 검색합니다.
  - 검색이 진행되는 동안, 검색창 우측에 로딩 컴포넌트가 생성됩니다.
  - 로딩 컴포넌트가 사라지면, 검색 완료된 논문 카드가 나타납니다.
  - 논문을 확인하고, `이 문서에 추가` 버튼을 클릭하면 문서에 추가됩니다.

  <br>

  #### 2) 검색 후 확인할 수 있는 카드에서 버튼을 클릭하면 논문을 볼 수 있는 링크로 연결됩니다.

  <div align="center">

  ![Feat1-2. Redirect](https://github.com/zzinLee/paperSurfer/assets/91821887/264436c1-21a7-4bc1-93a3-406ac641ffb9)

  </div>

  - `논문 보러 가기` 버튼을 클릭합니다.
  - 윈도우 팝업이 생성됩니다.
  - 해당 논문을 볼 수 있는 출판사 사이트 혹은 PDF가 있는 웹 주소로 리다이렉트*re-direct*됩니다.

  <br>

  ### (2) 그래프 뷰 제공과 논문 파도 타기 기능

  #### 1) 그래프 뷰 | 그래프 뷰로 보고 싶은 논문을 리스트에 추가한 후, 붓 아이콘 버튼을 클릭하면 로딩 후 그래프 뷰가 나타납니다.

  <div align="center">

  ![Feat2. View](https://github.com/zzinLee/paperSurfer/assets/91821887/a2823133-334f-45a6-adf8-f915e7d41168)

  </div>

  - `D3.js` 를 이용한 그래프 뷰를 제공합니다.
  - 문서 리스트에 추가된 논문의 정보를 가져와 계층구조 그래프로 사용자에게 보여줍니다.

  <br>

  #### 2) 논문 파도 타기 | 그래프 뷰에서 참고논문을 리스트에 저장하면, 또 다른 참고문헌들을 가져올 수 있습니다.

  <div align="center">

  ![Feat nodeRefetch](https://github.com/zzinLee/paperSurfer/assets/91821887/9da4f259-1f22-4fe7-95b1-e5e735a1dc79)

  </div>
  
  - 그래프 뷰에 렌더된 노드를 더블클릭하면, 노드 카드가 팝업되며 해당 논문에 대한 정보를 사용자에게 보여줍니다.
  - 노드카드는 3개의 버튼을 제공합니다.
    - 닫기 (X, 빨간색) | 팝업된 노드 카드를 닫습니다.
    - 읽음 (✔︎, 체크) | 다시 확인할 필요가 없을 때, 논문을 확인했다는 표기를 위하여 선택합니다. 노드의 색을 회색으로 변경합니다. 
    - 저장 (★, 별) | 논문을 문서에 저장합니다. 해당 논문의 참고문헌들을 가져와 그래프뷰에서 보여줍니다.
  
  <br>

  ### (3) 테이블 뷰 제공

  테이블 아이콘 버튼을 클릭하면 리스트에 추가한 논문들의 메타데이터를 한번에 볼 수 있는 테이블 뷰를 사용자에게 보여줍니다. <br> 

  <div align="center">
  
  ![Feat3. TableView](https://github.com/zzinLee/paperSurfer/assets/91821887/d114a83d-872f-4177-85ca-acc95f0f6d11)

  </div>

  <br>

  ### (4) PDF 파일 웹 뷰어

  논문은 PDF 파일 형태로 제공되는 것이 일반적이므로, <br>
  PaperSurfer 웹에서 논문을 볼 수 있는 서비스를 제공하고자 하였습니다. <br>

  #### 1) 로컬에 저장된 PDF 파일을 웹으로 볼 수 있는 서비스를 제공합니다.
  
  <div align="center">
  
  ![Feat4-1. PDFviewer](https://github.com/zzinLee/paperSurfer/assets/91821887/9fc3e394-bece-4e97-b645-910104b2acab)

  </div>

  <br>

  #### 2) PDF 파일에서 원하는 텍스트 라인을 드래그 하여 하이라이트 처리를 할 수 있습니다.

  <div align="center">

  ![Feat4-2. Highlighter](https://github.com/zzinLee/paperSurfer/assets/91821887/dadd08a0-4bcc-4d75-94b9-73f9625bafa8)

  </div>

  
  <br></br>

  # ⛰ Challenge

  ## 0. 프로젝트 시작하기 전, 논문 데이터 처리에 대한 고민
  
  ### 0-1. 각 논문을 어떻게 구분할 수 있을까?

  논문 데이터를 수집하고 저장하기 위해서 논문 간 구분을 지을 수 있는 고유한 값이 있어야 합니다. <br>
  따라서, 실제로 논문이 어떻게 관리되고 있는지 확인해보았습니다. <br>

  - ISSN (International Standard Serial Number)
    - 국제 표준 연속 간행물 번호
    - 인쇄물이나 정기적 전자 간행물을 식별하는데 쓰이는 8자리 고유번호 *(ex. 0000-0000)*
    - 논문은 저널(Journal)과 같이 정기적 간행물에 출판되는 출판물이므로 ISSN 을 갖고 있습니다.

  - DOI (Digital Object Identifier)
    - ISO 표준화를 거친 객체 영구 식별자
    - 인터넷 주소가 변경되어도 그 문서의 새 주소로 찾아갈 수 있도록 영구적으로 부여된 식별자 *(ex. https://doi.org/10.1000/182)*
  
  두 식별자 모두 논문 데이터를 고유의 값(id)으로 관리할 수 있습니다. <br>
  어떤 값을 사용할 지 고민한 결과, 아래와 같이 정리하였습니다. <br>
  
  1. DOI값은 서적, 논문, 자료에 관계없이 디지털 객체일 때 주어지므로 웹 환경에서 사용하기 좋겠다는 판단
  2. 논문 링크를 사용자에게 제공할 예정이므로, <br> 논문이 게시된 인터넷 주소의 변경에 관계 없이 올바른 링크로 리다이렉트*re-direct* 해주는 식별자 필요하다는 판단

  본 프로젝트에서는 위와 같은 이유로 Digital Object Identifier, 즉 **DOI 값이 더 적절한 선택지로 판단하고 적용**하였습니다. <br>

  <br>

  ### 0-2. 필요한 논문 메타 데이터를 정리하고, 시각화 대상을 명확히 하자

  논문 메타 데이터는 끝도 없이 많습니다. <br>
  논문의 저자, 제출*submit*된 날짜, 출판*publish*된 날짜, <br>
  에디터, 제목, 저널명, 저널 호수, 인용 논문, 인용된 횟수, <br>
  라이센스, DOI, ISSN, 등등 너무나도 많습니다. <br>

  연구에 필요한 참고 문헌을 구분하고 판단하기 위한 메타 데이터를 확인할 필요가 있었습니다. <br>
  기존 연구 경험과 주변 연구원님들의 의견을 종합하여 아래와 같이 필요한 메타 데이터를 추렸습니다. <br>

  <br>

  <div style="display: flex;">
      <img width="480" alt="참고문헌" src="https://github.com/zzinLee/paperSurfer/assets/91821887/653b9f80-7540-4c1b-9b4f-6df7c6853942">
      <img width="480" alt="인용횟수" src="https://github.com/zzinLee/paperSurfer/assets/91821887/d7ee66c3-380e-4f15-8989-a3f47fd9bafa">
   </div>

   <br>

  - 연구자가 논문을 구분하기 위하여 필요한 메타데이터
    - 제목
    - 저자
    - DOI
    - 출판일
    - 저널
  
  - 참고문헌 시각화에 필요한 메타데이터
    - 해당 논문의 피인용 횟수
    - 인용 논문 갯수
   
  <br>
   
  이를 바탕으로 인용 논문 갯수와 논문 피인용 횟수를 어떻게 시각화 해 줄 것인지에 대한 고민을 주로 하며 서비스를 구성 및 기획하였습니다. <br>
  
  
  </br>

  <br>

  ## 1. 참고 문헌 정보는 어디서, 어떻게 가져올 것인가?

  ### 1-1. 참고 문헌 정보를 어디서 가져올 것인가?

  참고 문헌을 조회하는 기능을 구현하기 위하여 아래의 2가지 방법을 검토하였습니다.

  <br>
  
  - 논문 PDF 파일 파싱
     - 논문 데이터를 다운로드/업로드 후 참고문헌이 적힌 부분을 파싱한다면 시각화가 가능할 것
     - 검토 결과, 논문은 저작물이므로 원하는 모든 논문을 열어 볼 수 없었음
     - 오픈 액세스*Open Access*에 한정하여 PDF 파일을 다운로드 할 수 있음
  - crossRef API 사용
     - crossRef API 는 학술 출판물의 메타 데이터 조회 서비스로 RestfulAPI 를 제공
     - 오픈 액세스 논문 뿐만 아니라 유료 저널의 논문들의 메타 데이터 제공
     - [crossref API Swagger](https://api.crossref.org/swagger-ui/index.html#/Works/get_works)

  <br>

  이번 프로젝트에서 PDF를 파싱하여 데이터를 얻는 기술을 도입해보고 싶었지만, <br>
  PDF 파싱을 통해 기능을 구현하게 되면 오픈 액세스를 갖는 논문에만 접근 가능하다는 치명적인 단점이 있었습니다. <br>
  <br>
  따라서, crossRef API를 사용하여 유료 저널에 대한 메타 데이터를 얻고, <br> 
  정확한 정보 제공이 가능하도록 서비스를 설계하였습니다. <br>

<br>

  ### 1-2. 참고 문헌 정보를 어떻게 가져올 것인가?

  문헌 정보는 crossRef API를 사용, Swagger API 문서를 활용하여 정보를 얻을 수 있었습니다. <br> 
  문헌을 하나의 노드로 취급하고 참고 문헌을 자손노드로 취급할 때 <br> 
  자손 노드의 데이터를 얻기 위해서 재귀 구조로 GET 요청을 호출하였습니다. <br>

  <br>
  <img width="840" alt="crossRefAPI사용" src="https://github.com/zzinLee/paperSurfer/assets/91821887/70933275-f384-468f-b972-075d44ce9fe7">
  <br>

  <br>

  이때 API 로 받아오는 데이터는 중첩된 데이터, 정제되지 않는 정보 등으로 구성되어 오류가 자주 발생했습니다. <br>
  아래는 검색창에서 검색어를 입력하여 보내는 API 로 받은 응답 데이터를 간략히 나타낸 이미지 입니다. <br>

  <br>
    <img width="840" alt="검색API" src="https://github.com/zzinLee/paperSurfer/assets/91821887/cf413940-9146-42a5-99f3-e3daa4ad7e20">
  <br>
  <br>

  응답 데이터 내 `items` 프로퍼티에 할당된 배열은 객체를 원소로 갖습니다. <br>
  이때 객체 내 값은 모두 문제 없어 보이지만, 실제로 API를 호출하여 받은 일부 데이터들은 목업 데이터와 상이한 형태를 보였습니다.<br>

  <br>
  
  실제 API 를 사용하며 마주한 문제는 아래의 3가지 사항이었습니다. <br>

  - 논문이 아닌 서적 데이터를 주는 경우 | 객체마다 갖고 있는 프로퍼티가 다른 문제
  - 오래된 논문의 데이터를 주는 경우 | 정보의 부재 (undefined 반환)
  - 데이터가 예상치 못한 포맷을 갖는 경우 

  이로 인해 객체마다 갖고 있는 프로퍼티가 다르거나, `undefined`를 반환하는 정보가 많아지거나 <br>
  수학 마크업(`mml`), 태그(`<i></i>`) 등으로 감싸진 형태의 string 을 반환하기도 하였습니다. <br>
  또, 데이터에 빈 배열이 있거나 프로퍼티가 조회되지만 값이 유효하지 않은 경우 등 에러 요소가 잦았습니다. <br>

  - API의 filter 기능을 적극 활용하여 데이터를 1차로 정제
  - `?.` 옵셔널 체이닝*Optional chaining* 을 통해 에러를 발생시키지 않고 중첩된 프로퍼티의 `undefined`값을 받을 수 있도록 조치
  - 처리할 수 없는 태그`<>`는 제거하고, 올바른 문자열을 반환하도록 String decoding 함수를 정의하여 논문 메타 데이터가 게시되는 곳에 적용
  
  위의 해결책을 통해 문제를 해결할 수 있었습니다.

  </br>
  
  ## 2. 그래프 뷰는 어떤 구조로 그릴 것인가?

  그래프 구조는 계층형을 사용하였습니다. <br>
  이 서비스에서 그리고자 하는 그래프 뷰는 하나의 문서에 대해서 참고문헌 여러 개를 자손으로 갖고, <br> 
  또 그 논문이 여러 개의 참고논문을 갖는 형태이기 때문입니다. <br>

  <br>
  
  <img width="840" alt="D3그래프뷰" src="https://github.com/zzinLee/paperSurfer/assets/91821887/b62a6342-af42-4417-8c26-c46f01b8c2a8">

  <br>
  <br>
  
  그래프 뷰는 D3.js 를 이용하였습니다. 이 때, 중첩된 json 객체인 루트 노드를 `data prop`으로 전달하고 <br>
 `data prop` 변동 시 `PaperChart.jsx` 컴포넌트에 렌더링을 해주도록 하였습니다. <br>

  <br>

```js
const transplantChildren = (root, target, childrenList) => {
  if (root.doi === target.doi) { //대상 노드라면, children을 변경합니다.
    root.children = childrenList;

    return root;
  }

  if (root.children) { //재귀를 이용, doi값 비교하여 대상 노드를 찾습니다.
    for (const node of root.children) {
      transplantChildren(node, target, childrenList);
    }
  }

  return root;
};
```
<br>

  위와 같이, 재귀로직과 DFS를 통해 DOI값을 비교하고 타겟노드를 찾아 해당 노드의 `children` 배열을 변경하여 <br>
  계층 구조를 유지하는 그래프 뷰를 사용자에게 보여주고 계속해서 참고 문헌 파도 타기를 진행할 수 있도록 하였습니다. <br>
  
  </br>

  ## 3. 개선된 UI/UX를 위한 Web Storage 사용과 zustand 사용
  
  그래프 뷰에서 사용자에게 논문 파도 타기 기능을 제공하려면 많은 fetch 요청을 보내야만 합니다. <br>
  이러한 작업은 비용이 큰 연산이므로 이 연산을 자주 할수록 UX와 성능이 저하되므로 이 비용을 최대한 줄이고 싶었습니다. <br>
  
  또한, 시각화를 위해 다루고 있는 데이터는 루트 노드를 기준으로 계속해서 중첩되는 형태이며 이것이 곧 렌더링으로 연결되므로, <br>
  이를 관리하는 전역 상태에서 불변성을 유지하고 조금 더 편리하게 상태를 업데이트 할 수 있는 방법이 필요했습니다. <br>
  
  <br>
    <img width="840" alt="zustand" src="https://github.com/zzinLee/paperSurfer/assets/91821887/842f130f-4ea3-4e61-b2f6-4f39b7dceeef">
  <br>
  <br>

  이에 대한 고민을 전역 상태 라이브러리의 미들웨어를 통해 해소하고자 하였습니다. <br>
  
  - 데이터를 전역 상태로 관리하여 데이터를 가져오는 비용을 일정 부분 해결할 것
  - 로그인 기능이 없는 현재 서비스에서 사용자가 납득할 만한 데이터 저장 기능을 제공할 것
  - 그래프 뷰에 `prop` 으로 전달해 주는 데이터를 불변성을 유지시킴으로써 효율적 렌더링이 가능할 것

  
  <!-- ### 3-1. zustand의 미들웨어의 활용 -->
<!-- persist 가 어떤 web API 를 사용하는지 -->
<!-- immer 가 어떤 방식으로 데이터를 저장하는지 혹은 기존의 방식과 어떻게 다른지 -->

  <!-- ### 3-2. Web storage 결정하기 (localStorage & sessionStorage) -->

<br>

  ### Web storage 활용
  데이터를 요청하는 데에 소요되는 비용이 크므로 중복된 호출은 최대한 삼가야 합니다. <br>
  따라서 계속 API를 요청 하기 보다 web storage에 저장하여 사용자에게 제공하는 것이 타당하다 판단하였습니다. <br>
  
  - `storage` 종류가 어떤 것이 있나?
    - 브라우저에서 데이터를 저장할 수 있는 방법에는 `sessionStorage` 와 `localStorage`, `Indexed DB` 가 있음
    - `sessionStorage` 페이지가 리로드, 복구, 열리는 동안 (페이지 세션동안) 사용 가능한 저장소 - 데이터 삭제 시점은 세션 종료 시
    - `localStorage` 브라우저가 닫히고 다시 열리는 동안 지속되는 저장소 (따로 삭제해주는 로직 필요) - 로컬스토리지를 따로 삭제해주는 로직 필요
    - `Indexed DB` 브라우저에 데이터를 영구적으로 저장할 수 있는 방법 중 하나로 비동기를 지원

  - `web storage`를 위 목적으로 쓰는게 맞나?
    - 웹 스토리지는 특정 데이터를 클라이언트 측에서 저장할 수 있도록 제공해주는 기능이므로 현재 상황에서 적합하다고 판단

  - `web storage`를 도입하면 상태에 데이터를 저장할 필요가 없어질까?
    - 처음 웹 스토리지 사용을 고민할 때 웹스토리지와 전역상태 모두 단일 앱에 대한 데이터를 저장하고 있다는 점이 유사
    - 그러나 상태 관리와 웹 스토리지는 목적이 다르다
    - 웹 스토리지는 데이터를 잠시 저장하는 목적이며, 상태관리는 렌더링과 관련된 로직을 저장하기 위함
    - 따라서 목적이 다른 두 데이터 저장소는 병행하여 운용해야 한다고 판단

  위와 같은 고려를 거쳐, 그래프 뷰를 위한 데이터는 웹스토리지 중 `session Storage` 에 저장하기로 결정하였습니다. <br>
  이때 전역 상태 관리와 웹 스토리지 관리를 병행하기 위해 방법을 찾던 도중, <br>
  상태를 Web Storage API와 연결 시켜주는 zustand의 persist middleware 를 적용하여 쉽게 관리할 수 있었습니다. <br>

</br>
<!--
  ## 4. PDF를 웹에서 다루기
  <br></br> 
-->
  
</div>

<div>
  
  ## 💭 Memoir

  이번 프로젝트는 관련 도메인을 가진 상태에서 진행하게 되어 주변 연구원분들께 사용 후기를 물어보고 개선한 경험이 특히 즐거웠습니다. <br>
  papersurfer 프로젝트 개발을 진행하면서 크게 2가지의 어려움과 깨달음이 있었습니다. <br>

   - 첫번째. 생각보다 외부 API를 사용하는 것은 귀찮고 RESTful API는 꼭 필요하다.
   - 두번째. 상태관리의 세계는 넓다.

  ### 첫번째
  crossrefAPI 는 RESTful API로 데이터를 손쉽게 가져올 수는 있었으나, <br> 
  데이터 자체를 가공하는 작업은 생각보다 귀찮고 어려운 작업이었습니다. <br>
  처음 PDF 를 파싱해서 작업하는 방식을 생각하였을 때에는 파싱 작업이 워낙 어렵기 때문에 API를 사용하면 금방 끝날 작업이라고 생각했지만 <br>
  그럼에도 불구하고, API를 통해 얻은 데이터는 원하지 않는 데이터 혹은 예측 불가능한 데이터를 가져왔기에 <br> 
  생각보다 많은 시간을 소요한 작업이지 않았나, 생각하게 되었습니다. <br>
  한편 쿼리와 필터링을 어떻게 해주냐에 따라 다른 데이터를 가져오는 작업이 재미있게 느껴지기도 했습니다. <br>
    
  ### 두번째
  상태관리로 생각보다 많은 것을 할 수 있었습니다. <br>
  이런 게 있을까? 하면, 웬만한 상태관리 툴에서는 그 기능을 제공하고 있었달까요. <br>
  렌더링 최적화, 웹 스토리지와의 연동, 불변성 유지 등등 상태관리만 잘해도 리액트가 편해지는 마법같은 순간이 있었습니다. <br>
  zustand나 redux 외에도 Mobx, recoil 등의 다양한 상태관리 툴을 써보고 <br>
  atomic 패턴, flux 패턴 등 다양한 패턴을 경험해보고 싶은 마음이 커지는 프로젝트였습니다. <br>

  <br>

  짧은 기간에 원하는 기능을 완벽히 갖춘 프로젝트가 나온 것은 아니지만, <br>
  충분히 사용할 가치가 있는 웹 서비스가 나온 것 같아 뿌듯하기도 합니다. <br>
  추후에 해당 웹 페이지에서 로컬에서 업로드한 PDF 파일을 다룰 수 있는 PDF 웹 편집 기능을 추가한다면 <br>
  연구원을 대상으로 하는 해당 프로젝트의 가치가 더욱 높아질 것 같다는 생각에 설레입니다. <br>
  앞으로도 더 많은 연구원들이 더 편리한 연구를 할 수 있도록 papersurfer 서비스가 도움이 될 수 있다면 좋겠습니다. <br>
  
</div>
