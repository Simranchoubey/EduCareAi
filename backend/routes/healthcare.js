const express = require("express");
const router = express.Router();
const { healthcareData } = require("../data/mockData");

router.post("/estimate", (req, res) => {
  const { country, coverageTier, condition } = req.body;

  const c = (country || "usa").toLowerCase();
  const tier = coverageTier || "standard";

  const base = healthcareData[c]?.[tier];
  if (!base) {
    return res.status(400).json({ error: "Invalid country/tier combination" });
  }

  const conditionMultiplier = condition && condition !== "none" ? 1.3 : 1.0;
  const adjustedMonthly = Math.round(base.monthly * conditionMultiplier);
  const adjustedAnnual = Math.round(base.annual * conditionMultiplier);

  res.json({
    monthly: adjustedMonthly,
    annual: adjustedAnnual,
    deductible: base.deductible,
    recommendation: base.recommendation,
    lowEstimate: Math.round(adjustedAnnual * 0.85),
    highEstimate: Math.round(adjustedAnnual * 1.2),
  });
});

module.exports = router;
