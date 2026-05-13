const express = require("express");
const router = express.Router();

const knowledgeBase = {
  visa: "Student visa requirements vary by country. USA requires F-1 visa (SEVIS fee ~$350). Canada needs a study permit. UK requires a Student visa with CAS. Germany requires a national visa D. Processing times range from 2-12 weeks. Always apply 3 months before program start.",
  scholarship: "Major scholarships: Fulbright (USA), Chevening (UK), DAAD (Germany), Vanier (Canada). Also check university-specific merit scholarships, country government scholarships, and field-specific awards. Most deadlines are 6-12 months before program start.",
  gre: "GRE is required by many US/Canada MS programs. Target: Quant 160+, Verbal 155+, AWA 4.0+ for top schools. Computer-based exam, fee $220. Valid 5 years. Some schools are now GRE-optional. GMAT required for MBA programs.",
  ielts: "IELTS Academic minimum scores: 6.5 overall for most universities, 7.0+ for top schools. Individual band minimum usually 6.0. Register at IDP or British Council. Fee ~$250. Valid 2 years. TOEFL also accepted at most institutions.",
  sop: "Statement of Purpose should: introduce your background (1 para), academic achievements (1 para), research/work experience (1-2 para), why this program/university (1 para), career goals (1 para). 600-1000 words. Tailor to each university. Avoid clichés.",
  lor: "Letters of Recommendation: 3 letters typically required. Prioritize research supervisors > professors who know your work well > industry mentors. Give recommenders 6-8 weeks. Provide your CV, SOP draft, and program details to help them write specific letters.",
  deadline: "Application deadlines: US Fall intake - Dec 1 to Feb 15. Canada Fall - Dec to Mar. UK - Oct to Jan (UCAS) or Jan to May. Germany - May 31 (winter) or Nov 30 (summer). Australia - Sep/Oct. Apply 3-4 months before deadline for visa.",
  cgpa: "CGPA requirements vary. Top US schools: 8.5+/10. Regular US schools: 7.5+. Canadian universities: 7.0-8.0. UK: typically 2:1 (roughly 7.0+ equivalent). Germany: 7.5+ (1.5-2.5 on German scale). Backlogs/arrears can affect chances. GRE can compensate.",
  canada: "Canada is popular for PR pathways (Express Entry). Good for CS, engineering. Low tuition vs USA. Co-op programs available. Post-graduation work permit (PGWP) up to 3 years. Top cities: Toronto, Vancouver, Montreal, Waterloo.",
  germany: "Germany offers tuition-free public universities! Mostly taught in German (some English MSc programs). Living cost ~€800-1000/month. Blocked account required (~€11,208). High quality engineering education. Work permit easier after graduation.",
  usa: "USA has the most top-ranked universities globally. F-1 visa with OPT (1 year, 3 years STEM extension). High tuition but also most scholarships/TA/RA opportunities. Strong alumni networks. H-1B lottery for work authorization.",
  loan: "Education loans in India: SBI up to ₹1.5Cr for abroad, rate ~8.5%. HDFC Credila up to $250K. No collateral up to ₹7.5L. Income tax deduction under Section 80E on interest. Moratorium period during study + 12 months.",
};

function getKnowledgeResponse(message) {
  const lower = message.toLowerCase();
  const matches = [];

  for (const [key, value] of Object.entries(knowledgeBase)) {
    if (lower.includes(key)) matches.push(value);
  }

  if (matches.length > 0) return matches[0];

  if (lower.includes("help") || lower.includes("hi") || lower.includes("hello")) {
    return "Hello! I'm EduCare AI, your education planning assistant. I can help you with:\n• University selection and college recommendations\n• Visa requirements and application timelines\n• Cost estimation and financial planning\n• Scholarships and funding opportunities\n• IELTS/GRE preparation tips\n• Loan options and EMI calculations\n\nWhat would you like to know?";
  }

  return "Great question! For personalized advice on your education journey, I recommend:\n1. Use our **College Navigator** to find universities matching your profile\n2. Check the **Cost Estimator** for budget planning\n3. Explore **Loan Planner** for financing options\n\nYou can also ask me about: visa, scholarships, GRE, IELTS, SOP, LOR, deadlines, or specific countries like USA, Canada, Germany.";
}

router.post("/", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (apiKey && apiKey.startsWith("sk-ant-")) {
    try {
      const { Anthropic } = require("@anthropic-ai/sdk");
      const client = new Anthropic({ apiKey });

      const messages = (history || []).map((h) => ({ role: h.role, content: h.content }));
      messages.push({ role: "user", content: message });

      const response = await client.messages.create({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1024,
        system: `You are EduCare AI, an expert education planning assistant helping students plan their higher education abroad. 
You specialize in: university selection, cost estimation, visa processes, scholarships, IELTS/GRE preparation, 
financial planning, education loans, and career guidance. Be concise, practical, and encouraging.
Always tailor advice to Indian students looking to study abroad unless specified otherwise.`,
        messages,
      });

      return res.json({ reply: response.content[0].text, source: "ai" });
    } catch (err) {
      console.error("Anthropic API error:", err.message);
    }
  }

  const reply = getKnowledgeResponse(message);
  res.json({ reply, source: "knowledge_base" });
});

module.exports = router;
