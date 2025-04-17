# blog-cms-evore

In order to run this project you need to start both the client and the API.

## Start Frontend

1. `cd frontend`
2. `npm run dev`

## Start API

1. `cd api`
2. `npx prisma migrate dev --name init`
3. `npx prisma generate`
3. `npm run seed` to add admin account to database
4. `npm run start`

**🔍 To see the API documentation, here is the Postman documentation link:**
<https://documenter.getpostman.com/view/30011289/2sB2cd3cxc>

### Admin User Credentials
- **Email:** admin@evore.com
- **Password:** admin123 

## Tech
- Next.js
- Express.js
- MySQL
- Prisma
- Tailwind