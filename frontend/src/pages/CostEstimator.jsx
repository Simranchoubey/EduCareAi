import { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import Navbar from '../components/Navbar'
import MetricCard from '../components/MetricCard'
import BreakdownTable from '../components/BreakdownTable'
import LoadingSpinner from '../components/LoadingSpinner'
import { estimateCost } from '../services/api'

const countries = ['usa', 'canada', 'germany', 'uk', 'australia', 'ireland']
const programs = ['ms', 'phd', 'mba', 'undergrad']
const fields = ['cs', 'engineering', 'business', 'medicine']
const salaries = ['low', 'mid', 'high']
const programLabel = { ms: 'Master\'s (MS)', phd: 'PhD', mba: 'MBA', undergrad: 'Undergraduate' }
const fieldLabel = { cs: 'CS / IT', engineering: 'Engineering', business: 'Business', medicine: 'Medicine' }
const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe']

export default function CostEstimator() {
  const [form, setForm] = useState({ country: 'usa', programType: 'ms', field: 'cs', salaryRange: 'mid', duration: '' })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    try {
      const { data } = await estimateCost(form)
      setResult(data)
    } catch {
      setError('Failed to estimate. Please ensure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const chartData = result
    ? Object.entries(result.breakdown).map(([key, val]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: val,
      }))
    : []

  return (
    <div className="relative min-h-screen text-white pb-20">
      <Navbar />
      <div className="relative z-10 px-6 md:px-12 lg:px-16 py-12 max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-xs tracking-widest uppercase text-blue-400 font-bold mb-3">Financial Planning</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Cost & ROI Estimator</h1>
          <p className="text-white/50 mt-4 max-w-2xl">Plan your education budget with precision. Our AI calculates tuition, living expenses, and projects your return on investment.</p>
        </div>

        <div className="glass-card p-8 mb-12 border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-xs text-white/40 uppercase tracking-widest font-bold ml-1">Country</label>
              <select className="edu-input bg-white/5 border-white/10 focus:border-blue-500/50 py-3.5" value={form.country} onChange={set('country')}>
                {countries.map((c) => <option key={c} value={c}>{c.toUpperCase()}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40 uppercase tracking-widest font-bold ml-1">Program Type</label>
              <select className="edu-input bg-white/5 border-white/10 focus:border-blue-500/50 py-3.5" value={form.programType} onChange={set('programType')}>
                {programs.map((p) => <option key={p} value={p}>{programLabel[p]}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40 uppercase tracking-widest font-bold ml-1">Field</label>
              <select className="edu-input bg-white/5 border-white/10 focus:border-blue-500/50 py-3.5" value={form.field} onChange={set('field')}>
                {fields.map((f) => <option key={f} value={f}>{fieldLabel[f]}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40 uppercase tracking-widest font-bold ml-1">Exp. Salary</label>
              <select className="edu-input bg-white/5 border-white/10 focus:border-blue-500/50 py-3.5" value={form.salaryRange} onChange={set('salaryRange')}>
                {salaries.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
            </div>
          </div>
          {error && <p className="text-red-400 text-sm mb-4 font-medium">{error}</p>}
          <button className="bg-white text-black px-10 py-4 rounded-xl font-bold text-base hover:bg-white/90 transition-all duration-300 w-full md:w-auto shadow-lg shadow-white/5" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Calculating Costs...' : 'Generate Estimate'}
          </button>
        </div>

        {loading && <div className="py-20"><LoadingSpinner label="AI is calculating exchange rates and cost of living..." /></div>}
        {result && !loading && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <MetricCard label="Annual Cost" value={`$${result.annualCost.toLocaleString()}`} />
              <MetricCard label="Total Investment" value={`$${result.totalCost.toLocaleString()}`} />
              <MetricCard label="Avg Salary" value={`$${result.avgSalary.toLocaleString()}`} accent />
              <MetricCard label="Payback Period" value={`${result.paybackYears} yrs`} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="glass-card p-8">
                  <h3 className="text-xl font-bold mb-6">Detailed Cost Breakdown</h3>
                  <BreakdownTable
                    rows={Object.entries(result.breakdown).map(([k, v]) => ({
                      label: k.charAt(0).toUpperCase() + k.slice(1),
                      value: `$${v.toLocaleString()}`,
                    }))}
                  />
                </div>
                
                <div className="glass-card p-8 border-l-4 border-l-green-500">
                  <h3 className="text-xs text-white/40 uppercase tracking-widest font-bold mb-2">5-Year ROI Analysis</h3>
                  <p className="text-4xl font-bold text-green-400 tracking-tight">{result.roi5yr}</p>
                  <p className="text-sm text-white/40 mt-3 leading-relaxed">
                    Your estimated 5-year earnings of <span className="text-white/80 font-bold">${(result.avgSalary * 5).toLocaleString()}</span> versus an initial investment of <span className="text-white/80 font-bold">${result.totalCost.toLocaleString()}</span>.
                  </p>
                </div>
              </div>

              <div className="glass-card p-8 flex flex-col items-center justify-center">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-8 self-start">Expense Distribution</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={chartData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} dataKey="value" paddingAngle={5}>
                      {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="rgba(255,255,255,0.1)" strokeWidth={2} />)}
                    </Pie>
                    <Tooltip 
                      formatter={(v) => `$${v.toLocaleString()}`} 
                      contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, backdropFilter: 'blur(8px)' }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-1 gap-4 mt-8 w-full">
                  {chartData.map((d, i) => (
                    <div key={d.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full shadow-sm" style={{ background: COLORS[i % COLORS.length] }} />
                        <span className="text-sm font-medium text-white/60">{d.name}</span>
                      </div>
                      <span className="text-sm font-bold">${d.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
