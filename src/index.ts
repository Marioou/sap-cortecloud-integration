import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'SAP-CorteCloud Integration API' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
