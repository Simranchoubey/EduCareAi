const costData = {
  usa: {
    ms: { cs: { tuition: 45000, living: 18000, books: 1500, visa: 350, misc: 2000 }, engineering: { tuition: 42000, living: 18000, books: 1500, visa: 350, misc: 2000 }, business: { tuition: 55000, living: 20000, books: 2000, visa: 350, misc: 2500 }, medicine: { tuition: 60000, living: 22000, books: 3000, visa: 350, misc: 3000 } },
    phd: { cs: { tuition: 0, living: 18000, books: 1000, visa: 350, misc: 1500 }, engineering: { tuition: 0, living: 18000, books: 1000, visa: 350, misc: 1500 }, business: { tuition: 20000, living: 20000, books: 1500, visa: 350, misc: 2000 }, medicine: { tuition: 0, living: 22000, books: 2000, visa: 350, misc: 2000 } },
    mba: { cs: { tuition: 70000, living: 22000, books: 2000, visa: 350, misc: 3000 }, engineering: { tuition: 65000, living: 22000, books: 2000, visa: 350, misc: 3000 }, business: { tuition: 75000, living: 22000, books: 2000, visa: 350, misc: 3000 }, medicine: { tuition: 70000, living: 22000, books: 2000, visa: 350, misc: 3000 } },
    undergrad: { cs: { tuition: 35000, living: 14000, books: 1200, visa: 350, misc: 1500 }, engineering: { tuition: 32000, living: 14000, books: 1200, visa: 350, misc: 1500 }, business: { tuition: 40000, living: 14000, books: 1200, visa: 350, misc: 1500 }, medicine: { tuition: 45000, living: 15000, books: 2000, visa: 350, misc: 2000 } }
  },
  canada: {
    ms: { cs: { tuition: 22000, living: 14000, books: 1200, visa: 230, misc: 1500 }, engineering: { tuition: 20000, living: 14000, books: 1200, visa: 230, misc: 1500 }, business: { tuition: 28000, living: 15000, books: 1500, visa: 230, misc: 2000 }, medicine: { tuition: 30000, living: 16000, books: 2000, visa: 230, misc: 2000 } },
    phd: { cs: { tuition: 8000, living: 14000, books: 800, visa: 230, misc: 1000 }, engineering: { tuition: 8000, living: 14000, books: 800, visa: 230, misc: 1000 }, business: { tuition: 12000, living: 15000, books: 1000, visa: 230, misc: 1500 }, medicine: { tuition: 10000, living: 16000, books: 1500, visa: 230, misc: 1500 } },
    mba: { cs: { tuition: 40000, living: 16000, books: 1500, visa: 230, misc: 2000 }, engineering: { tuition: 35000, living: 16000, books: 1500, visa: 230, misc: 2000 }, business: { tuition: 45000, living: 16000, books: 1500, visa: 230, misc: 2000 }, medicine: { tuition: 40000, living: 16000, books: 1500, visa: 230, misc: 2000 } },
    undergrad: { cs: { tuition: 18000, living: 12000, books: 1000, visa: 230, misc: 1200 }, engineering: { tuition: 16000, living: 12000, books: 1000, visa: 230, misc: 1200 }, business: { tuition: 20000, living: 12000, books: 1000, visa: 230, misc: 1200 }, medicine: { tuition: 22000, living: 13000, books: 1500, visa: 230, misc: 1500 } }
  },
  germany: {
    ms: { cs: { tuition: 2500, living: 10000, books: 800, visa: 80, misc: 1000 }, engineering: { tuition: 2500, living: 10000, books: 800, visa: 80, misc: 1000 }, business: { tuition: 5000, living: 10000, books: 1000, visa: 80, misc: 1200 }, medicine: { tuition: 3000, living: 11000, books: 1500, visa: 80, misc: 1200 } },
    phd: { cs: { tuition: 0, living: 10000, books: 500, visa: 80, misc: 800 }, engineering: { tuition: 0, living: 10000, books: 500, visa: 80, misc: 800 }, business: { tuition: 2000, living: 10000, books: 800, visa: 80, misc: 1000 }, medicine: { tuition: 0, living: 11000, books: 1000, visa: 80, misc: 1000 } },
    mba: { cs: { tuition: 15000, living: 12000, books: 1000, visa: 80, misc: 1500 }, engineering: { tuition: 12000, living: 12000, books: 1000, visa: 80, misc: 1500 }, business: { tuition: 20000, living: 12000, books: 1000, visa: 80, misc: 1500 }, medicine: { tuition: 15000, living: 12000, books: 1000, visa: 80, misc: 1500 } },
    undergrad: { cs: { tuition: 1500, living: 9000, books: 700, visa: 80, misc: 800 }, engineering: { tuition: 1500, living: 9000, books: 700, visa: 80, misc: 800 }, business: { tuition: 3000, living: 9000, books: 800, visa: 80, misc: 900 }, medicine: { tuition: 2000, living: 9500, books: 1200, visa: 80, misc: 1000 } }
  },
  uk: {
    ms: { cs: { tuition: 30000, living: 15000, books: 1200, visa: 490, misc: 1500 }, engineering: { tuition: 28000, living: 15000, books: 1200, visa: 490, misc: 1500 }, business: { tuition: 35000, living: 16000, books: 1500, visa: 490, misc: 2000 }, medicine: { tuition: 38000, living: 17000, books: 2000, visa: 490, misc: 2000 } },
    phd: { cs: { tuition: 5000, living: 15000, books: 800, visa: 490, misc: 1000 }, engineering: { tuition: 5000, living: 15000, books: 800, visa: 490, misc: 1000 }, business: { tuition: 8000, living: 16000, books: 1000, visa: 490, misc: 1500 }, medicine: { tuition: 6000, living: 17000, books: 1500, visa: 490, misc: 1500 } },
    mba: { cs: { tuition: 55000, living: 18000, books: 1500, visa: 490, misc: 2000 }, engineering: { tuition: 50000, living: 18000, books: 1500, visa: 490, misc: 2000 }, business: { tuition: 65000, living: 18000, books: 1500, visa: 490, misc: 2000 }, medicine: { tuition: 60000, living: 18000, books: 1500, visa: 490, misc: 2000 } },
    undergrad: { cs: { tuition: 22000, living: 13000, books: 1000, visa: 490, misc: 1200 }, engineering: { tuition: 20000, living: 13000, books: 1000, visa: 490, misc: 1200 }, business: { tuition: 25000, living: 13000, books: 1000, visa: 490, misc: 1200 }, medicine: { tuition: 28000, living: 14000, books: 1500, visa: 490, misc: 1500 } }
  },
  australia: {
    ms: { cs: { tuition: 33000, living: 16000, books: 1200, visa: 600, misc: 1500 }, engineering: { tuition: 31000, living: 16000, books: 1200, visa: 600, misc: 1500 }, business: { tuition: 38000, living: 17000, books: 1500, visa: 600, misc: 2000 }, medicine: { tuition: 42000, living: 18000, books: 2000, visa: 600, misc: 2000 } },
    phd: { cs: { tuition: 6000, living: 16000, books: 800, visa: 600, misc: 1000 }, engineering: { tuition: 6000, living: 16000, books: 800, visa: 600, misc: 1000 }, business: { tuition: 10000, living: 17000, books: 1000, visa: 600, misc: 1500 }, medicine: { tuition: 8000, living: 18000, books: 1500, visa: 600, misc: 1500 } },
    mba: { cs: { tuition: 50000, living: 19000, books: 1500, visa: 600, misc: 2000 }, engineering: { tuition: 45000, living: 19000, books: 1500, visa: 600, misc: 2000 }, business: { tuition: 55000, living: 19000, books: 1500, visa: 600, misc: 2000 }, medicine: { tuition: 50000, living: 19000, books: 1500, visa: 600, misc: 2000 } },
    undergrad: { cs: { tuition: 26000, living: 13000, books: 1000, visa: 600, misc: 1200 }, engineering: { tuition: 24000, living: 13000, books: 1000, visa: 600, misc: 1200 }, business: { tuition: 28000, living: 13000, books: 1000, visa: 600, misc: 1200 }, medicine: { tuition: 32000, living: 14000, books: 1500, visa: 600, misc: 1500 } }
  },
  ireland: {
    ms: { cs: { tuition: 18000, living: 14000, books: 1000, visa: 300, misc: 1200 }, engineering: { tuition: 16000, living: 14000, books: 1000, visa: 300, misc: 1200 }, business: { tuition: 22000, living: 14000, books: 1200, visa: 300, misc: 1500 }, medicine: { tuition: 25000, living: 15000, books: 1800, visa: 300, misc: 1800 } },
    phd: { cs: { tuition: 5000, living: 14000, books: 700, visa: 300, misc: 900 }, engineering: { tuition: 5000, living: 14000, books: 700, visa: 300, misc: 900 }, business: { tuition: 8000, living: 14000, books: 900, visa: 300, misc: 1200 }, medicine: { tuition: 6000, living: 15000, books: 1400, visa: 300, misc: 1200 } },
    mba: { cs: { tuition: 32000, living: 16000, books: 1200, visa: 300, misc: 1800 }, engineering: { tuition: 28000, living: 16000, books: 1200, visa: 300, misc: 1800 }, business: { tuition: 38000, living: 16000, books: 1200, visa: 300, misc: 1800 }, medicine: { tuition: 35000, living: 16000, books: 1200, visa: 300, misc: 1800 } },
    undergrad: { cs: { tuition: 14000, living: 12000, books: 900, visa: 300, misc: 1000 }, engineering: { tuition: 12000, living: 12000, books: 900, visa: 300, misc: 1000 }, business: { tuition: 16000, living: 12000, books: 900, visa: 300, misc: 1000 }, medicine: { tuition: 18000, living: 13000, books: 1400, visa: 300, misc: 1200 } }
  }
};

const salaryData = {
  low: { multiplier: 1.0 },
  mid: { multiplier: 1.3 },
  high: { multiplier: 1.7 },
};

const healthcareData = {
  usa: {
    basic: { monthly: 250, annual: 3000, deductible: 5000, recommendation: "ACA Marketplace silver plan recommended. Consider HSA for tax benefits." },
    standard: { monthly: 450, annual: 5400, deductible: 2500, recommendation: "ACA gold plan with dental and vision coverage. Popular for international students." },
    comprehensive: { monthly: 750, annual: 9000, deductible: 500, recommendation: "Premium PPO plan with nationwide coverage. Essential for ongoing medical needs." },
  },
  canada: {
    basic: { monthly: 80, annual: 960, deductible: 500, recommendation: "Provincial health card covers most needs. Top up with dental/vision plan." },
    standard: { monthly: 150, annual: 1800, deductible: 200, recommendation: "Provincial + extended benefits plan. Recommended for international students." },
    comprehensive: { monthly: 280, annual: 3360, deductible: 0, recommendation: "Full coverage including dental, vision, paramedical. Best for families." },
  },
  uk: {
    basic: { monthly: 50, annual: 600, deductible: 100, recommendation: "NHS covers most care. Supplement with dental and optical plan." },
    standard: { monthly: 120, annual: 1440, deductible: 0, recommendation: "NHS + private health insurance for faster specialist access." },
    comprehensive: { monthly: 250, annual: 3000, deductible: 0, recommendation: "Full private BUPA or AXA plan with 0 wait times and premium hospitals." },
  },
  germany: {
    basic: { monthly: 120, annual: 1440, deductible: 0, recommendation: "Public Gesetzliche Krankenversicherung (GKV) covers nearly everything." },
    standard: { monthly: 200, annual: 2400, deductible: 0, recommendation: "Public insurance + supplemental Zusatzversicherung for extras." },
    comprehensive: { monthly: 380, annual: 4560, deductible: 0, recommendation: "Private Krankenversicherung (PKV) for best access to top specialists." },
  },
  australia: {
    basic: { monthly: 90, annual: 1080, deductible: 300, recommendation: "Medicare covers basics. Overseas Student Health Cover (OSHC) required for students." },
    standard: { monthly: 180, annual: 2160, deductible: 100, recommendation: "OSHC + top-up private extras for dental and physio." },
    comprehensive: { monthly: 350, annual: 4200, deductible: 0, recommendation: "Full private hospital + extras cover with BUPA or Medibank." },
  },
};

const lendersData = [
  { id: 1, name: "SBI Education Loan", rate: "8.5%", maxLoan: 150000, processing: "0.5%", features: ["No collateral up to ₹7.5L", "15 year term", "Tax benefit u/s 80E"], type: "public" },
  { id: 2, name: "Axis Bank Abroad Loan", rate: "10.5%", maxLoan: 200000, processing: "1%", features: ["Quick 10-day approval", "Door-step service", "Doorstep documentation"], type: "private" },
  { id: 3, name: "HDFC Credila", rate: "11%", maxLoan: 250000, processing: "1.5%", features: ["Pre-admission loan", "Co-applicant income eligible", "Customized EMI"], type: "nbfc" },
  { id: 4, name: "InCred Education", rate: "12%", maxLoan: 100000, processing: "2%", features: ["Fast track approval", "Minimal documents", "Top 200 universities"], type: "nbfc" },
  { id: 5, name: "Avanse", rate: "11.5%", maxLoan: 180000, processing: "1%", features: ["100% course fee covered", "Living expense included", "Course-level assessment"], type: "nbfc" },
  { id: 6, name: "IDFC First Bank", rate: "9.75%", maxLoan: 200000, processing: "0.75%", features: ["Lowest interest after SBI", "Flexible collateral", "Digital process"], type: "private" },
];

module.exports = { costData, salaryData, healthcareData, lendersData };
