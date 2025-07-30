
import express from 'express'
import cors from 'cors'
import axios from 'axios'


const app = express();
app.use(cors());

// Debug middleware - log all incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.get('/api/horoscope', async (req, res) => {
  try {
    const { sign } = req.query;
    const apiUrl = `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}&day=today`;
    
    const response = await axios.get(apiUrl);
    
    // Disable caching for this endpoint
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.json(response.data);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  console.log(`Test endpoint: http://localhost:${PORT}/api/horoscope?sign=aries`);
});
