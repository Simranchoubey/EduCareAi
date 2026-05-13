import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import Navbar from '../components/Navbar'
import MetricCard from '../components/MetricCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { calculateLoan } from '../services/api'

export default function LoanPlanner() {
  const [form, setForm] = useState({ loanAmount: 50000, interestRate: 9.5, termYears: 10, coApplicantIncome: '', creditProfile: 'good' })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    try {
      const { data } = await calculateLoan({
        ...form,
        loanAmount: Number(form.loanAmount),
        interestRate: Number(form.interestRate),
        termYears: Number(form.termYears),
        coApplicantIncome: form.coApplicantIncome ? Number(form.coApplicantIncome) : null,
      })
      setResult(data)
    } catch {
      setError('Failed to calculate. Please ensure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const lenderType = { 
    public: 'bg-blue-500/10 border-blue-500/20 text-blue-400', 
    private: 'bg-purple-500/10 border-purple-500/20 text-purple-400', 
    nbfc: 'bg-amber-500/10 border-amber-500/20 text-amber-400' 
  }

  return (
    <div className="relative min-h-screen text-white pb-20">
      <Navbar />
      <div className="relative z-10 px-6 md:px-12 lg:px-16 py-12 max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-xs tracking-widest uppercase text-blue-400 font-bold mb-3">Finance Assistant</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Loan & EMI Planner</h1>
          <p className="text-white/50 mt-4 max-w-2xl">Find the best financing options for your education. Compare EMI scenarios across different terms and interest rates.</p>
        </div>

        <div className="glass-card p-8 mb-12 border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div className="space-y-4">
              <label className="text-xs text-white/40 uppercase tracking-widest font-bold ml-1">Loan Amount: <span className="text-white">${Number(form.loanAmount).toLocaleString()}</span></label>
              <input type="range" min="5000" max="250000" step="1000" className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white" value={form.loanAmount} onChange={set('loanAmount')} />
              <div className="flex justify-between text-[10px] text-white/30 font-bold"><span>$5,000</span><span>$250,000</span></div>
            </div>
            <div className="space-y-4">
              <label className="text-xs text-white/40 uppercase tracking-widest font-bold ml-1">Interest Rate: <span className="text-white">{form.interestRate}%</span></label>
              <input type="range" min="5" max="18" step="0.25" className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white" value={form.interestRate} onChange={set('interestRate')} />
              <div className="flex justify-between text-[10px] text-white/30 font-bold"><span>5%</span><span>18%</span></div>
            </div>
            <div className="space-y-4">
              <label className="text-xs text-white/40 uppercase tracking-widest font-bold ml-1">Term: <span className="text-white">{form.termYears} years</span></label>
              <input type="range" min="1" max="15" step="1" className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white" value={form.termYears} onChange={set('termYears')} />
              <div className="flex justify-between text-[10px] text-white/30 font-bold"><span>1 Year</span><span>15 Years</span></div>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40 uppercase tracking-widest font-bold ml-1">Co-applicant Income (USD)</label>
              <input className="edu-input bg-white/5 border-white/10 focus:border-blue-500/50 py-3.5" type="number" placeholder="Annual Income" value={form.coApplicantIncome} onChange={set('coApplicantIncome')} />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40 uppercase tracking-widest font-bold ml-1">Credit Profile</label>
              <select className="edu-input bg-white/5 border-white/10 focus:border-blue-500/50 py-3.5" value={form.creditProfile} onChange={set('creditProfile')}>
                {['excellent', 'good', 'fair', 'poor'].map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
          </div>
          {error && <p className="text-red-400 text-sm mb-4 font-medium">{error}</p>}
          <button className="bg-white text-black px-10 py-4 rounded-xl font-bold text-base hover:bg-white/90 transition-all duration-300 w-full md:w-auto shadow-lg shadow-white/5" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Calculating Scenarios...' : 'Calculate Repayment'}
          </button>
        </div>

        {loading && <div className="py-20"><LoadingSpinner label="AI is analyzing lender interest rates and amortization schedules..." /></div>}
        {result && !loading && (
          <div className="space-y-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <MetricCard label="Monthly EMI" value={`$${result.emi.toLocaleString()}`} />
              <MetricCard label="Total Payment" value={`$${result.totalPayment.toLocaleString()}`} />
              <MetricCard label="Total Interest" value={`$${result.totalInterest.toLocaleString()}`} />
              <MetricCard label="Max Eligible" value={`$${result.maxEligible.toLocaleString()}`} accent />
            </div>

            {/* Repayment Scenarios */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6">Repayment Scenarios</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {result.scenarios.map((s) => (
                  <div key={s.years} className={`glass-card p-6 border-white/5 relative overflow-hidden group ${s.years === Number(form.termYears) ? 'border-blue-500/50 shadow-lg shadow-blue-500/5' : ''}`}>
                    {s.years === Number(form.termYears) && <div className="absolute top-0 right-0 bg-blue-500 text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-tighter">Current Plan</div>}
                    <p className="text-xs text-white/40 font-bold uppercase tracking-widest mb-4">{s.years}-Year Term</p>
                    <p className="text-3xl font-bold mb-2">${s.emi.toLocaleString()}<span className="text-sm text-white/30 font-medium">/mo</span></p>
                    <div className="space-y-1 mt-4 pt-4 border-t border-white/5">
                      <div className="flex justify-between text-xs"><span className="text-white/30">Total Payment</span><span className="text-white/60 font-bold">${s.total.toLocaleString()}</span></div>
                      <div className="flex justify-between text-xs"><span className="text-white/30">Total Interest</span><span className="text-white/60 font-bold">${s.interest.toLocaleString()}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Amortization chart */}
              <div className="lg:col-span-2 glass-card p-8">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-8">Loan Amortization</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={result.amortization}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.4)', fontWeight: 600 }} dy={10} />
                    <YAxis stroke="rgba(255,255,255,0.2)" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.4)', fontWeight: 600 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip 
                      formatter={(v) => [`$${v.toLocaleString()}`, 'Remaining Balance']} 
                      contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, backdropFilter: 'blur(8px)' }} 
                    />
                    <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Lenders */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Top Recommended Lenders</h3>
                {result.lenders.map((l) => (
                  <div key={l.id} className="glass-card p-6 hover:border-white/20 transition-all group">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-lg group-hover:text-blue-400 transition-colors">{l.name}</h4>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg border ${lenderType[l.type]}`}>{l.type}</span>
                    </div>
                    <p className="text-2xl font-bold text-white mb-1">{l.rate}</p>
                    <p className="text-xs text-white/35 font-medium mb-4">Max ${Number(l.maxLoan).toLocaleString()} • {l.processing} processing</p>
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                      {l.features.map((f) => (
                        <span key={f} className="text-[10px] font-bold text-white/40 flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-blue-400"></span> {f}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
