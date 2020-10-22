># 개발 진행 상황

---
- [리엑트 프론트엔드 서버](https://react-front-server.run.goorm.io/)

- [익스프레스 REST.API 서버](https://express-server.run.goorm.io/)
---
<br></br>
>## 개발 BlockDiagram

<p align = "center">
<img src="https://user-images.githubusercontent.com/5003195/96605615-609a9200-1331-11eb-9fec-13f98c099167.jpg")
</p>


<br></br>
>## 개발스택 요약 설명

  - End user에게 보여질 웹은 React.js Bootstrap 기반 서버입니다.
  - 산업용 계측정장비를 원격으로 다루기 위한 node.js express 기반 REST API 서버입니다.
  - GET, POST 명령어를 서버로 보내면, 서버에서 측정장비로 부터 측정된 데이터를 가져와 json 형식의 파일로 클라이언트에게 보내줍니다.

---
<br></br>

# 컴퓨터 구성 / 필수 조건

- 운영제체 : Linux Only
- [Linux GPIB Package](https://sourceforge.net/projects/linux-gpib/files/linux-gpib%20for%203.x.x%20and%202.6.x%20kernels/4.3.3/)를 설치하고 GPIB장치를 완전히 구성
- [Linux GPIB Package와 호환되는 GPIB 인터페이스](https://linux-gpib.sourceforge.io/doc_html/supported-hardware.html). (ex GPIB-USB-B Adapter).
- GPIB 규격의 측정 장비 (ex [34401A](https://kr.element14.com/productimages/standard/en_GB/1335866-40.jpg))


<br></br>

# 기술 스택(Technique Used)

>## Back-end
---
<table><tbody>
 <tr>
  <td width="60">
   <div align="center"><a href="https://nodejs.org" target="_blank"> <img src="https://devicons.github.io/devicon/devicon.git/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a><br>Node.js</div>
  </td>
  <td width="60">
   <div align="center"><a href="https://expressjs.com" target="_blank"> <img src="https://devicons.github.io/devicon/devicon.git/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a><br>Express</div>
  </td>
  <td width="60">
   <div align="center"><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://devicons.github.io/devicon/devicon.git/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a><br>Javascript</div>
  </td>
  <td width="60">
   <div align="center"><a href="https://restfulapi.net/" target="_blank"> <img src="https://user-images.githubusercontent.com/5003195/96896791-e6047a80-14c8-11eb-9882-2a7848b1aed4.png" alt="restapi" width="40" height="40"/> </a><br>Rest.api</div>
  </td>
  <td width="60">
   <div align="center"><a href="https://www.linux.org/" target="_blank"> <img src="https://devicons.github.io/devicon/devicon.git/icons/linux/linux-original.svg" alt="linux" width="40" height="40"/> </a><br>Linux</div>
  </td>
 </tr>
 </tbody></table>

* In Addtion to GPIB Drivers  
      - : [Node-Linux-Gpib](https://github.com/jue89/node-linux-gpib.git)

>## Front-end

---

<table><tbody>
 <tr>
  <td>
   <div align="center"><a href="https://reactjs.org/" target="_blank"> <img src="https://devicons.github.io/devicon/devicon.git/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a><br>React.js</div>
  </td>
  <td>
   <div align="center"><a href="https://getbootstrap.com/" target="_blank"> <img src="https://user-images.githubusercontent.com/5003195/96897521-a4280400-14c9-11eb-9bd4-6e786f6d3545.png" alt="bootstrap" width="40" height="40"/> </a><br>bootstrap</div>
  </td>
  <td width="60">
   <div align="center"><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://devicons.github.io/devicon/devicon.git/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a><br>Javascript</div>
  </td>
  <td>
   <div align="center"><a href="https://www.w3.org/html/" target="_blank"> <img src="https://devicons.github.io/devicon/devicon.git/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a><br>Html5</div>
  </td>
  <td>
   <div align="center"><a href="https://babeljs.io/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/babeljs/babeljs-icon.svg" alt="babel" width="40" height="40"/> </a><br>Babel</div>
  </td>
 </tr>
 </tbody></table>

 >## DB
<table><tbody>
 <tr>
  <td>
   <div align="center"><a href="https://www.mysql.com/" target="_blank"> <img src="https://user-images.githubusercontent.com/5003195/96897836-fe28c980-14c9-11eb-8b00-7359e65539e6.jpg" alt="MySQL" width="40" height="40"/> </a><br>MySQL</div>
  </td>
 </tr>
 </tbody></table>

---

<br></br>

---

# 설치 안내(Installation Process) / 구성(Structure)

* in Ubuntu 20.04 LTS

>- ## 실제 측정장비와 통신

  1. Git, Node.js, Yarn 설치
     ```
     $ sudo apt-get install git
     $ sudo apt-get install node.js
     $ npm -g install yarn
     ```
  2. Linux GPIB Package 빌드
     ```
     $ sudo apt-install wget
     $ wget -O linux-gpib-4.3.3.tar.gz https://sourceforge.net/projects/linux-gpib/files/latest/download
     $ tar xfz linux-gpib-4.3.3.tar.gz && cd linux-gpib-4.3.3.tar.gz
     $ tar xfz linux-gpib-user-4.3.3.tar.gz && cd linux-gpib-user-4.3.3.tar.gz
     $ sudo ./configure
     $ sudo make && sudo make install
     ```
  3. GPIB 인터페이스(GPIB-USB-B) 구성

     - gpib.conf를 환경에 맞게 수정한다.

       ```
       $ cd /user/local/etc && vi gpib.conf
       ```

       Interface{} 와 Device{} 모듈 수정해야 한다.

     - GPIB-USB-B 디바이스 장치 할당 번호 확인 한다.

       ```
       $ lsusb
       ```

       펌웨어 로드 할 시 GPIB-USB-B의 BUS

     - GPIB-USB-B 펌웨어를 다운받고 로드한다.
       ```
       $ apt-get install fxload
       $ git clone https://github.com/fmhess/linux_gpib_firmware.git
       $ cd linux_gpib_firmware/ni_gpib_usb_b/
       $ fxload -D /dev/bus/usb/BUS/DEVICE -I niusbb_firmware.hex -s niusbb_loader.hex
       $ modprobe ni_usb_gpib
       ```
     - 정상적으로 연결되었는지 확인한다.
       ```
       $ gpib_config
       ```

  4. 프로젝트 로컬 PC에 저장하기.

     ```
     $ git clone https://github.com/osamhack2020/WEB_WebbasedAutomatedMeasurementService_Doyouhaveameasurementproblem.git
     ```

  5. 해당 폴더에서 종속 라이브러리 설치 및 DB 연결
     ```
     $ cd WEB_WebbasedAutomatedMeasurementService_Doyouhaveameasurementproblem
     $ yarn install
     $ yarn add mysql
     ```
  6. 서버 실행

     ```
     $ yarn start             # front-end 서버 실행
     $ node server/server.js  # back-end 서버 실행
     ```

  7. 실행 확인
     - http://localhost:3000


<br></br>

>- ## 장비에서 실제 측정값 추출 : GET 방식

  - Voltage DC : 'MEAS:VOLT:DC?'
    (AC 경우 'MESA:VOLT:AC?' 만 변경해주면 됨.)

  - Resistance : 'MEAS:RES?'

  - Frequency : 'MEAS:FREQ?'

  - Period : 'MEAS:PER?'


<br></br>
---

>- ## 가상 측정장비와 통신 (개발용)

  1. Git, Node.js, Yarn 설치
     ```
     $ sudo apt-get install git
     $ sudo apt-get install node.js
     $ npm -g install yarn
     ```
  2. 프로젝트 로컬 PC에 저장하기.

     ```
     $ git clone https://github.com/osamhack2020/WEB_WebbasedAutomatedMeasurementService_Doyouhaveameasurementproblem.git
     ```

  3. 해당 폴더에서 종속 라이브러리 설치 및 DB 연동
     ```
     $ cd WEB_WebbasedAutomatedMeasurementService_Doyouhaveameasurementproblem
     $ yarn remove linux-gpib       # 가상측정장비 통신에서 사용하지 않는다
     $ yarn install
     $ yarn add mysql
     ```
  4. 서버 실행

     ```
     $ yarn start                  # front-end 서버 실행
     $ node server_test/server.js  # back-end 서버 실행
     ```

  5. 실행 확인
     - http://localhost:3000