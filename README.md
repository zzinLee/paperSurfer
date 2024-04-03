<div align=center>

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
  <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
  <img src="https://img.shields.io/badge/tailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/D3.js-F9A03C?style=for-the-badge&logo=D3.js&logoColor=white">
  <img src="https://img.shields.io/badge/zustand-8A385D?style=for-the-badge">
  <img src="https://img.shields.io/badge/reactpdf-F12200?style=for-the-badge">
  <br>
  
</div>

<br></br>

<div>

  ## Contents
  * [🪽 Motivation](#-motivation)
  * [🎨 Concept](#-concept)
  * [✨ Feature](#-feature)
    * [(1) 키워드 검색 기능](#1-키워드-검색-기능)
    * [(2) 그래프 뷰 제공](#2-그래프-뷰-제공)
    * [(3) 테이블 뷰 제공](#3-테이블-뷰-제공)
    * [(4) PDF 파일 웹 뷰어](#4-pdf-파일-웹-뷰어)
  * [⛰ Challenge](#-challenge)
  
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

  ### (2) 그래프 뷰 제공

  #### 1) 그래프 뷰로 보고 싶은 논문을 리스트에 추가한 후, 붓 아이콘 버튼을 클릭하면 로딩 후 그래프 뷰가 나타납니다.

  <div align="center">

  ![Feat2. View](https://github.com/zzinLee/paperSurfer/assets/91821887/a2823133-334f-45a6-adf8-f915e7d41168)

  </div>

  - `D3.js` 를 이용한 그래프 뷰를 제공합니다.
  - 문서 리스트에 추가된 논문의 정보를 가져와 계층구조 그래프로 사용자에게 보여줍니다.

  <br>

  #### 2) 그래프 뷰에서 참고논문을 리스트에 저장하면, 또 다른 참고문헌들을 가져올 수 있습니다.

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

  테이블 뷰를 보기 원하는 논문을 리스트에 추가한 후, <br> 테이블 아이콘 버튼을 클릭하면 논문의 메타 정보를 갖는 테이블 뷰가 나타납니다.

  <div align="center">
  
  ![Feat3. TableView](https://github.com/zzinLee/paperSurfer/assets/91821887/d114a83d-872f-4177-85ca-acc95f0f6d11)

  </div>

  <br>

  ### (4) PDF 파일 웹 뷰어

  #### 1) 로컬에 저장된 PDF 파일을 웹으로 볼 수 있는 서비스를 제공합니다.
  
  <div align="center">
  
  ![Feat4-1. PDFviewer](https://github.com/zzinLee/paperSurfer/assets/91821887/9fc3e394-bece-4e97-b645-910104b2acab)

  </div>

  <br>

  #### 2) PDF 파일에서 원하는 텍스트 라인을 드래그 하여 하이라이트 처리를 할 수 있습니다.

  <div align="center">

  ![Feat4-2 Highlighter](https://github.com/zzinLee/paperSurfer/assets/91821887/dadd08a0-4bcc-4d75-94b9-73f9625bafa8)

  </div>

  
  <br></br>

  ## ⛰ Challenge

  ### 1. 참고 문헌 정보는 어디서, 어떻게 가져올 것인가?

  ### 2. 그래프는 어떤 구조로 그릴 것인가?

  ### 3. 개선된 UI/UX를 위한 Web Storage 사용과 zustand 사용
  
  ### 4. PDF를 웹에서 다루기
  
</div>

