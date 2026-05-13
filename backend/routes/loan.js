const express = require("express");
const router = express.Router();
const { lendersData } = require("../data/mockData");

router.post("/calculate", (req, res) => {
  const { loanAmount, interestRate, termYears, coApplicantIncome, creditProfile } = req.body;

  const P = Number(loanAmount);
  const r = Number(interestRate) / 100 / 12;
  const n = Number(termYears) * 12;

  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - P;

  const scenarios = [5, 10, 15].map((years) => {
    const months = years * 12;
    const e = (P * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    return { years, emi: Math.round(e), total: Math.round(e * months), interest: Math.round(e * months - P) };
  });

  const amortization = [];
  let balance = P;
  for (let i = 1; i <= Math.min(n, 60); i++) {
    const interestPayment = balance * r;
    const principalPayment = emi - interestPayment;
    balance -= principalPayment;
    if (i % 6 === 0 || i === 1) {
      amortization.push({ month: i, balance: Math.max(0, Math.round(balance)), principal: Math.round(principalPayment), interest: Math.round(interestPayment) });
    }
  }

  const eligibilityMultiplier = { excellent: 0.5, good: 0.4, fair: 0.35, poor: 0.3 }[creditProfile] || 0.4;
  const maxEligible = coApplicantIncome ? Math.round(Number(coApplicantIncome) * eligibilityMultiplier * 10) : P;

  res.json({
    emi: Math.round(emi),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
    scenarios,
    amortization,
    maxEligible,
    lenders: lendersData,
  });
});

module.exports = router;
