const express = require("express");
const router = express.Router();
const universities = require("../data/universities");

router.get("/all", (req, res) => {
  res.json({ universities });
});

router.post("/recommend", (req, res) => {
  const { cgpa, field, budget, country, experience } = req.body;

  if (!cgpa || !field) {
    return res.status(400).json({ error: "CGPA and field are required" });
  }

  let filtered = [...universities];

  if (field && field !== "any") {
    filtered = filtered.filter((u) => u.field === field);
  }
  if (country && country !== "any") {
    filtered = filtered.filter((u) => u.country === country);
  }
  if (budget) {
    filtered = filtered.filter((u) => u.tuition <= Number(budget));
  }

  const withProbability = filtered.map((u) => {
    const cgpaGap = Number(cgpa) - u.minCGPA;
    let probability;
    if (cgpaGap >= 1.0) probability = "High";
    else if (cgpaGap >= 0) probability = "Medium";
    else probability = "Low";

    if (experience >= 2 && probability === "Low") probability = "Medium";

    return { ...u, probability };
  });

  const sorted = withProbability.sort((a, b) => {
    const order = { High: 0, Medium: 1, Low: 2 };
    return order[a.probability] - order[b.probability];
  });

  res.json({ recommendations: sorted.slice(0, 8), total: sorted.length });
});

module.exports = router;
