# EduCare AI 🎓

A full-stack AI-powered platform helping students plan higher education, estimate healthcare costs, and manage financial planning with integrated loan support.

## 📁 Project Structure

```
EduCare-AI/
├── frontend/                    # React + Vite frontend
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx             # Entry point
│       ├── App.jsx              # Router + global context
│       ├── components/
│       │   ├── Navbar.jsx       # Sticky navigation
│       │   ├── MetricCard.jsx   # Reusable stat card
│       │   ├── BreakdownTable.jsx
│       │   └── LoadingSpinner.jsx
│       ├── pages/
│       │   ├── Home.jsx         # Landing page + journey steps
│       │   ├── Navigator.jsx    # AI college recommendation
│       │   ├── CostEstimator.jsx# Education cost + ROI
│       │   ├── Healthcare.jsx   # Healthcare cost estimator
│       │   ├── Dashboard.jsx    # Financial planning overview
│       │   ├── LoanPlanner.jsx  # EMI calculator + lenders
│       │   └── Chatbot.jsx      # AI Copilot interface
│       ├── services/
│       │   └── api.js           # Axios API layer
│       ├── hooks/
│       │   └── useAppContext.js # Global state context
│       └── styles/
│           └── global.css       # Design system & utilities
│
└── backend/                     # Node.js + Express API
    ├── server.js                # Main entry point
    ├── package.json
    ├── .env.example
    ├── data/
    │   ├── universities.js      # 14 universities mock data
    │   └── mockData.js          # Costs, healthcare, lenders
    └── routes/
        ├── colleges.js          # POST /api/colleges/recommend
        ├── cost.js              # POST /api/cost/estimate
        ├── healthcare.js        # POST /api/healthcare/estimate
        ├── loan.js              # POST /api/loan/calculate
        └── chat.js              # POST /api/chat
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

---

### 1. Start the Backend

```bash
cd EduCare-AI/backend
npm install
cp .env.example .env
npm run dev
```

Backend runs at: **http://localhost:5000**

**Optional:** Add your Anthropic API key to `.env` for real AI chatbot:
```
ANTHROPIC_API_KEY=your_key_here
```
Without a key, the chatbot uses a built-in knowledge base.

---

### 2. Start the Frontend

```bash
cd EduCare-AI/frontend
npm install
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/colleges/recommend` | AI university recommendations |
| GET  | `/api/colleges/all` | All universities |
| POST | `/api/cost/estimate` | Education cost + ROI |
| POST | `/api/healthcare/estimate` | Healthcare cost estimate |
| POST | `/api/loan/calculate` | EMI + eligibility calculation |
| POST | `/api/chat` | AI chatbot message |
| GET  | `/api/health` | API health check |

### Example: Recommend Colleges
```bash
curl -X POST http://localhost:5000/api/colleges/recommend \
  -H "Content-Type: application/json" \
  -d '{"cgpa": 8.0, "field": "cs", "budget": 30000, "country": "canada", "experience": 2}'
```

### Example: Estimate Costs
```bash
curl -X POST http://localhost:5000/api/cost/estimate \
  -H "Content-Type: application/json" \
  -d '{"country": "Germany", "programType": "ms", "field": "cs", "salaryRange": "mid"}'
```

### Example: Calculate Loan EMI
```bash
curl -X POST http://localhost:5000/api/loan/calculate \
  -H "Content-Type: application/json" \
  -d '{"loanAmount": 80000, "interestRate": 8.5, "termYears": 10, "coApplicantIncome": 60000, "creditProfile": "good"}'
```

---

## ✨ Features

### 1. AI College Navigator
- Input CGPA, field, budget, region, experience
- Returns ranked universities with admission probability (High / Medium / Low)
- Shows tuition, avg salary, deadline, and key tags

### 2. Education Cost Estimator
- Covers 6 countries × 4 program types
- Line-item breakdown: tuition, living, books, visa, misc
- ROI analysis: multiple, payback period, 5-year earnings
- Pie chart visualization via Recharts

### 3. Healthcare Cost Estimator
- 5 countries × 3 coverage tiers
- Condition-based cost adjustment (+20–50%)
- AI recommendation text per country
- Low/high estimate range

### 4. Financial Planning Dashboard
- Combines education + healthcare costs
- Bar chart of expense categories
- Budget allocation with progress bars
- Profile completion tracker

### 5. Loan Planner
- Sliders for amount, rate, term
- EMI calculation with 3 repayment scenarios (5/10/15 yr)
- Balance amortization line chart
- 6 real lender options with rates and features

### 6. AI Copilot Chatbot
- Real AI via Anthropic Claude API (when key provided)
- Graceful fallback to knowledge base (no key needed)
- Conversation history maintained per session
- Quick-prompt chips for common questions

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, Vite |
| Charts | Recharts |
| HTTP Client | Axios |
| Backend | Node.js, Express 4 |
| AI | Anthropic Claude API (optional) |
| Data | Mock JSON (easily replaceable with DB) |

---

## 🔧 Configuration

### Backend `.env`
```env
PORT=5000
FRONTEND_URL=http://localhost:5173
ANTHROPIC_API_KEY=your_key_here   # Optional — enables real AI
```

### Adding a Database
Replace mock data in `backend/data/` with your DB queries. The route handlers are clean and separate from data access — swap in MongoDB, PostgreSQL, or any ORM with minimal changes.

---

## 📦 Build for Production

```bash
# Frontend
cd frontend && npm run build   # Outputs to frontend/dist/

# Backend
cd backend && npm start        # Uses NODE_ENV=production
```

---

## 📝 License

MIT — free for personal and commercial use.
