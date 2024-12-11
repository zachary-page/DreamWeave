const express = require('express');
const app = express();
const port = process.env.PORT || 5000; // Use environment port or default to 5000

app.get('/', (req, res) => {
  res.send('Hello from DreamWeave Backend!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});