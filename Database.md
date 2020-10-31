# DB & Schema 설계
    개발 프로젝트에 활용된 DB 및 Schema 설계

---

## Database Diagram

<p align = "center">
<img src="https://user-images.githubusercontent.com/5003195/97778126-55a8f280-1bb8-11eb-8167-00ea014e5129.png" width="800px" height="500px"></img>
</p>
<h4 align="center">웹 서비스 제공을 위한 DB 및 산업계측기 제어를 위해 활용</h4>

---

<br></br>
<br></br>


## Database Summary

| Table Name  | Table Data Summary |
| --- | ---- |
| Uesrs   | 사용자와 관리자 구분되어 관리와 대부분 기능과의 연계 및 개인정보 미요구 |
| history   | 산업계측기를 제어하여 측정한 결과값 관리 테이블이며, 향후 예측정비를 위한 데이터베이스 테이블 |
| procedures   | 각 산업계측기별 측정해야할 절차가 정해져있으며, 해당 측정절차 허용오차로 합/불 판정 테이블 |
