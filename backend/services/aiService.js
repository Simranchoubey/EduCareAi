const generateAIResponse = async (profile) => {
  const prompt = `
You are EduCare AI, a smart education advisor.

Your job is to analyze student profiles and give structured, practical, and realistic guidance.

Always respond in this format:

1. Summary
2. Analysis
3. Recommendation
4. Reasoning
5. Next Steps

Rules:
- Be realistic
- Avoid generic responses
- Be structured and clear

User Profile:
${JSON.stringify(profile)}
`

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct",
      messages: [
        { role: "system", content: prompt }
      ]
    })
  })

  const data = await response.json()
  return data.choices[0].message.content
}

module.exports = { generateAIResponse }
