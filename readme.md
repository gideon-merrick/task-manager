# Task Manager

## Prerequisites

- Node.js
- Git
- Docker

## Installation instructions

1. clone the GitHub repository
```
git clone https://github.com/gideon-merrick/task-manager.git
cd task-manager
```
2. install dependencies
```
npm i
```

3. setup environment variables
```
cp .env.example .env
```

4. start and setup the database
```
docker compose up -d
npx prisma migrate dev
npx prisma generate
```

5. run the development server
```
npm run dev
```
