const express = require("express")
const { generateAIResponse } = require("../services/aiService.js")

const router = express.Router()

router.post("/ai", async (req, res) => {
  try {
    const result = await generateAIResponse(req.body)
    res.json({ result })
  } catch (err) {
    res.status(500).json({ error: "AI failed" })
  }
})

module.exports = router
