import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './databaseConnection';
import { roleRoute } from './routes/role.route';
import { userRoute } from './routes/user.route';

dotenv.config();

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', userRoute());
app.use('/', roleRoute());

app.listen(PORT, async () => {
  await connectToDatabase().then(() => {
    console.log('Connected to database');
  });

  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
