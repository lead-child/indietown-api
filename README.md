# 인디타운 API

## Prisma

- [Prisma 개발 문서](https://www.prisma.io/docs)
  - [스키마 작성하기](https://www.prisma.io/docs/concepts/components/prisma-schema)

### 1. 시작하기

Docker Compose로 서버 실행에 필요한 이미지를 실행합니다.

```
docker-compose -f ./docker-compose.yml up -d
```

### 2. 마이그레이션하기

스키마 수정 후 개발 DB에 수정사항을 반영하기 위해 마이그레이션을 해야합니다.

```
yarn prisma migrate dev --name {migration_name}
```

마이그레이션이 성공했다면 `/prisma/migrations` 폴더 아래 마이그레이션 SQL이 생성됩니다.

### DB 데이터 관리하기

- Prisma Stduio로 웹에서 데이터를 관리할 수 있습니다.

```
yarn prisma stduio
```
