# DB & Schema 설계
    개발 프로젝트에 활용된 DB 및 Schema 설계

---

## Database Diagram

<p align = "center">
<img src="https://user-images.githubusercontent.com/5003195/97770862-7e11fc00-1b7a-11eb-953d-38ed31d37437.png" width="800px" height="500px"></img>
</p>

---

<br></br>



## Database Summary

| Table Name  | Table Data Summary |
| --- | ---- |
| Uesrs   | 사용자와 관리자 구분되어 관리와 대부분 기능과의 연계 및 개인정보 미요구 |
| history   | 산업계측기를 제어하여 측정한 결과값 관리 테이블이며, 향후 예측정비를 위한 데이터베이스 테이블 |
| procedures   | 각 산업계측기별 측정해야할 절차가 정해져있으며, 해당 측정절차 허용오차로 합/불 판정 테이블 |
