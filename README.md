# fancy_APIs

## APIs
/logic
- method : POST
- data type : json
- description
  - 사용자의 id, pw를 받아 로그인 인증 및 세션 성립(쿠키)
  - Requset Body에 user_name, user_passwd를 포함하여 전송(현재 보안 설정 x)

/lookup
- method : GET
- data type : json
- description
  - 해당 goods_id에 대한 goods 정보 조회(id, musician_id, name, price, type)
  - 요청 시 query parameter로 goods_id를 포함하여 전송

/auth
- method : POST
- data type : json
- description
  - 해당 앨범에 대한 구입을 인증
  - 요청 시 Request Body에 serial_number를 포함하여 전송(현재 보안 설정 x)
  - 인증 완료 시 "앨범 인증이 완료되었습니다." 메세지 수신
  
  
## DB
### Table : User
- column : id, name, passwd, address, authenticated, email

### Table : Goods
- column : id, musician_id, name, price, type(album, poster 등)

### Table : Album
- column : id, serial_number, check_certified(인증 여부, true or false), certified_by(인증한 유저의 ID)
