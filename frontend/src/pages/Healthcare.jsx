import { useState } from 'react'
import Navbar from '../components/Navbar'
import MetricCard from '../components/MetricCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { estimateHealthcare } from '../services/api'

const countries = ['usa', 'canada', 'uk', 'germany', 'australia']
const tiers = ['basic', 'standard', 'comprehensive']
const conditions = ['none', 'diabetes', 'asthma', 'hypertension', 'other']

export default function Healthcare() {
  const [form, setForm] = useState({ country: 'usa', coverageTier: 'standard', condition: 'none' })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    try {
      const { data } = await estimateHealthcare(form)
      setResult(data)
    } catch {
      setError('Failed to estimate. Please ensure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen text-white pb-20">
      <Navbar />
      <div className="relative z-10 px-6 md:px-12 lg:px-16 py-12 max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-xs tracking-widest uppercase text-blue-400 font-bold mb-3">Health & Wellness</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Healthcare Planning</h1>
          <p className="text-white/50 mt-4 max-w-2xl">Don't let medical costs surprise you. Estimate insurance premiums and out-of-pocket expenses based on your target country and health profile.</p>
        </div>

        <div className="glass-card p-8 mb-12 border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-xs text-white/40 uppercase tracking-widest font-bold ml-1">Country</label>
              <select className="edu-input bg-white/5 border-white/10 focus:border-blue-500/50 py-3.5" value={form.country} onChange={set('country')}>
                {countries.map((c) => <option key={c} value={c}>{c.toUpperCase()}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40 uppercase tracking-widest font-bold ml-1">Coverage Tier</label>
              <select className="edu-input bg-white/5 border-white/10 focus:border-blue-500/50 py-3.5" value={form.coverageTier} onChange={set('coverageTier')}>
                {tiers.map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40 uppercase tracking-widest font-bold ml-1">Pre-existing Condition</label>
              <select className="edu-input bg-white/5 border-white/10 focus:border-blue-500/50 py-3.5" value={form.condition} onChange={set('condition')}>
                {conditions.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
          </div>
          {error && <p className="text-red-400 text-sm mb-4 font-medium">{error}</p>}
          <button className="bg-white text-black px-10 py-4 rounded-xl font-bold text-base hover:bg-white/90 transition-all duration-300 w-full md:w-auto shadow-lg shadow-white/5" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Estimating Costs...' : 'Calculate Healthcare'}
          </button>
        </div>

        {loading && <div className="py-20"><LoadingSpinner label="Analyzing local healthcare policies and insurance rates..." /></div>}
        {result && !loading && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <MetricCard label="Monthly Premium" value={`$${result.monthly}`} />
              <MetricCard label="Annual Total" value={`$${result.annual.toLocaleString()}`} />
              <MetricCard label="Deductible" value={`$${result.deductible.toLocaleString()}`} />
              <MetricCard label="Estimated Range" value={`$${result.lowEstimate.toLocaleString()}–$${result.highEstimate.toLocaleString()}`} />
            </div>
            
            <div className="glass-card p-8 border-l-4 border-l-blue-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <span className="text-blue-400 font-bold">i</span>
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">AI Health Advisory</h3>
              </div>
              <p className="text-lg text-white/80 leading-relaxed font-medium">{result.recommendation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
