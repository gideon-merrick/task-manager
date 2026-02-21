```
git clone https://github.com/gideon-merrick/task-manager.git
cd task-manager
docker compose up -d
cp .env.example .env
npm i
npx prisma migrate dev
npx prisma generate
npm run dev
```
