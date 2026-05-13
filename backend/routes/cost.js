const express = require("express");
const router = express.Router();
const { costData, salaryData } = require("../data/mockData");

router.post("/estimate", (req, res) => {
  const { country, programType, field, salaryRange, duration } = req.body;

  const c = (country || "usa").toLowerCase();
  const p = programType || "ms";
  const f = field || "cs";
  const s = salaryRange || "mid";
  const years = Number(duration) || (p === "phd" ? 4 : p === "undergrad" ? 4 : 2);

  const base = costData[c]?.[p]?.[f];
  if (!base) {
    return res.status(400).json({ error: "Invalid country/program/field combination" });
  }

  const annual = base.tuition + base.living + base.books + base.visa + base.misc;
  const total = annual * years;

  const avgSalaryBase = { cs: 75000, engineering: 70000, business: 65000, medicine: 85000 }[f] || 70000;
  const countryMult = { usa: 1.4, canada: 1.1, uk: 1.15, germany: 0.95, australia: 1.05, ireland: 1.08 }[c] || 1.0;
  const salMult = salaryData[s]?.multiplier || 1.3;
  const avgSalary = Math.round(avgSalaryBase * countryMult * salMult);

  const paybackYears = (total / avgSalary).toFixed(1);
  const roi5yr = ((avgSalary * 5 - total) / total * 100).toFixed(0);

  res.json({
    breakdown: {
      tuition: base.tuition * years,
      living: base.living * years,
      books: base.books * years,
      visa: base.visa,
      misc: base.misc * years,
    },
    annualCost: annual,
    totalCost: total,
    duration: years,
    avgSalary,
    paybackYears,
    roi5yr: `${roi5yr}%`,
    currency: "USD",
  });
});

module.exports = router;
