function health(req, res) {
  res.json({ status: 'Node API is running ok' });
}

module.exports = { health };
