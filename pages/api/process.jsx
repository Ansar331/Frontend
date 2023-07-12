import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { word } = req.body;
    const response = await axios.post('http://localhost:8000/api/process', { word });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error while processing word:', error);
    res.status(500).json({ error: 'Error processing word' });
  }
}
