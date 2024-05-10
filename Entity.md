# MakeMyDay

1. USER_TB
    - 유저 인덱스
    - 인스타그램 ID
    - 생년월일
    - 사용자 가입 날짜 (YYYY-MM-DD HH:MM:SS)

1. CAKE_TB
    - 케이크 인덱스
    - 인스타그램 ID
    - 케이크 닉네임
    - 생성 날짜 (YYY-MM-DD HH:MM:SS)
    - 배경 타입(0~8)
    - 케이크 타입(0~8)

3. LETTER_TB
    - 촛불 인덱스
    - 등록 날짜 (YYYY-MM-DD HH:MM:SS)
    - 작성자 닉네임
    - 상태(Enable, Disable)
    - 촛불 타입(0~7)

5. IMAGE_TB
    - 케이크 배경 1~9
    - 케이크 타입 tiramisu, vailla, chocolate, mango, strawberry, kiwi, grape, cheese, green tea
    - 촛불 타입 red, orange, yellow, green, blue, puple, black, white


<!-- MySQL을 써야하는 이유 : MySQL은 읽기 중심의 작업에서 PostgreSQL 보다 효율적이다 PostgreSQL 처럼 다양하고 유연한 기능과 플러그인들을 제공하지는 않지만(MySQL 8.0에선 단점이였던 Join 방식이 중첩루프밖에 안되던걸 Hash Join을 추가해서 해결함) 지금 설계중인것처럼 간단하고 단순한 Toy Project에는 다양하고 복잡한 기능들이 필요하지도 않을뿐더러 속도와 안정성 면에서는 오히려 방해가 된다 -->
