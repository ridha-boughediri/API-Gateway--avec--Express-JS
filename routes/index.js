const express = require('express');
const router = express.Router();
const axios = require('axios');
const registry = require('./registry.json');

router.all('/:apiName/:path', async (req, res) => {
  console.log(req.params.apiName);

  if (registry.services && registry.services[req.params.apiName]) {
    // Check if registry exists and API name is valid
    try {
      const response = await axios({
        method: req.method,
        url: registry.services[req.params.apiName].url + req.params.path,
        headers: req.headers,
        data: req.body,
      });
      res.status(response.status).json(response.data); // Set status and send response data
    } catch (error) {
      console.error('Error forwarding request:', error);
      // Implement appropriate error handling (e.g., send error response to client)
    }
  } else {
    console.log("API name not found in registry");
    // Handle case where API name is not found (e.g., send 404 Not Found)
    res.status(404).json({ message: 'API not found' });
  }
});

module.exports = router;
