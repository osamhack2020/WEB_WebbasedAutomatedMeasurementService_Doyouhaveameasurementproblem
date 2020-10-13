# WEB_WebbasedAutomatedMeasurementService_Doyouhaveameasurementproblem

: 산업용 계측장비 제어하여 측정값 분석 등 기능 제공하는 웹 서비스

개발 진행 상황 보기👇
[리엑트 프론트엔드 서버 ](https://react-front-server.run.goorm.io/)
[익스프레스 REST API 서버](https://express-server.run.goorm.io/)

# 개발 BlockDiagram

![구성도](https://user-images.githubusercontent.com/5003195/95680229-13bd0a00-0c13-11eb-90b2-5bb008c6b3c5.jpg)

## 개발스택 요약 설명

    - End user에게 보여질 웹은 React.js Bootstrap 기반 서버입니다.

    - 산업용 계측정장비를 원격으로 다루기 위한 node.js express 기반 REST API 서버입니다.

    - GET, POST 명령어를 서버로 보내면, 서버에서 측정장비로 부터 측정된 데이터를 가져와 json 형식의 파일로 클라이언트에게 보내줍니다.

# 컴퓨터 구성 / 필수 조건

- 운영제체 : Linux Only
- [Linux GPIB Package](https://sourceforge.net/projects/linux-gpib/files/linux-gpib%20for%203.x.x%20and%202.6.x%20kernels/4.3.3/)를 설치하고 GPIB장치를 완전히 구성
- [Linux GPIB Package와 호환되는 GPIB 인터페이스](https://linux-gpib.sourceforge.io/doc_html/supported-hardware.html). (ex GPIB-USB-B Adapter).
- GPIB 규격의 측정 장비 (ex [34401A](https://kr.element14.com/productimages/standard/en_GB/1335866-40.jpg))

# 기술 스택(Technique Used)

## Back-end

    - Node.js
    - [Node-Linux-Gpib](https://github.com/jue89/node-linux-gpib.git)
    - Express.js
    - REST API

## Front-end

    - React.js
    - Bootstarp

# 설치 안내(Installation Process) / 구성(Structure)

    :  in Ubuntu 20.04 LTS

- ## 실제 측정장비와 통신

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

  5. 해당 폴더에서 종속 라이브러리 설치
     ```
     $ cd WEB_WebbasedAutomatedMeasurementService_Doyouhaveameasurementproblem
     $ yarn install
     ```
  6. 서버 실행

     ```
     $ yarn start             # front-end 서버 실행
     $ node server/server.js  # back-end 서버 실행
     ```

  7. 실행 확인
     - http://localhost:3000

  ### 장비에서 실제 측정값 추출 : GET 방식

      - Voltage DC : 'MEAS:VOLT:DC?'
        (AC 경우 'MESA:VOLT:AC?' 만 변경해주면 됨.)

      - Resistance : 'MEAS:RES?'

      - Frequency : 'MEAS:FREQ?'

      - Period : 'MEAS:PER?'

- ## 가상 측정장비와 통신 (개발용)

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

  3. 해당 폴더에서 종속 라이브러리 설치
     ```
     $ cd WEB_WebbasedAutomatedMeasurementService_Doyouhaveameasurementproblem
     $ yarn remove linux-gpib       # 가상측정장비 통신에서 사용하지 않는다
     $ yarn install
     ```
  4. 서버 실행

     ```
     $ yarn start                  # front-end 서버 실행
     $ node server_test/server.js  # back-end 서버 실행
     ```

  5. 실행 확인
     - http://localhost:3000

# 팀 로고(Team Logo)

![로고_DyhaMP](https://user-images.githubusercontent.com/5003195/95662255-8de88280-0b70-11eb-9b0a-c1d85243c82a.jpg)

# 팀 정보(Team Information)

- 이재용(ljy13579@naver.com) ,Github_ID : NevErdiEkilLeR

- 김영주(fjvbn2003@gmail.com) , Github_ID : fjvbn2003

- 권기남(ginami0129g@gmail.com) , Github_ID : ginami0129g
