import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const SAMPLE = {
  education: 85000,
  healthcare: 4800,
  living: 28000,
  visa: 490,
  misc: 4000,
}

export default function Dashboard() {
  const [budget, setBudget] = useState(130000)
  const total = Object.values(SAMPLE).reduce((a, b) => a + b, 0)
  const remaining = budget - total

  const chartData = Object.entries(SAMPLE).map(([k, v]) => ({
    name: k.charAt(0).toUpperCase() + k.slice(1),
    amount: v,
  }))

  const pct = (v) => Math.min(100, Math.round((v / budget) * 100))

  const categories = [
    { label: 'Education Costs', value: SAMPLE.education, color: '#6366f1' },
    { label: 'Healthcare', value: SAMPLE.healthcare, color: '#8b5cf6' },
    { label: 'Living Expenses', value: SAMPLE.living, color: '#a78bfa' },
    { label: 'Visa & Fees', value: SAMPLE.visa, color: '#c4b5fd' },
    { label: 'Miscellaneous', value: SAMPLE.misc, color: '#ddd6fe' },
  ]

  const quickLinks = [
    { label: 'Find Universities', to: '/navigator', desc: 'Get matched with colleges' },
    { label: 'Estimate Costs', to: '/cost', desc: 'Tuition + living breakdown' },
    { label: 'Healthcare Plan', to: '/healthcare', desc: 'Insurance cost estimate' },
    { label: 'Loan Planner', to: '/loan', desc: 'EMI and lender comparison' },
  ]

  return (
    <div className="relative min-h-screen text-white pb-20">
      <Navbar />
      <div className="relative z-10 px-6 md:px-12 lg:px-16 py-12 max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-xs tracking-widest uppercase text-blue-400 font-bold mb-3">Finance Overview</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Financial Dashboard</h1>
          <p className="text-white/50 mt-4 max-w-2xl">Monitor your total education investment. Adjust your budget and track allocations across different expense categories.</p>
        </div>

        {/* Budget Control */}
        <div className="glass-card p-8 mb-8 border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-1">Total Target Budget</p>
              <p className="text-3xl font-bold">${Number(budget).toLocaleString()}</p>
            </div>
            <div className="flex-1 max-w-md">
              <input 
                type="range" 
                min="50000" 
                max="300000" 
                step="5000" 
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white" 
                value={budget} 
                onChange={(e) => setBudget(Number(e.target.value))} 
              />
              <div className="flex justify-between text-[10px] text-white/30 uppercase tracking-widest font-bold mt-2">
                <span>$50,000</span>
                <span>$300,000</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <p className="text-[10px] text-white/35 uppercase tracking-widest font-bold mb-1">Estimated Spend</p>
              <p className="text-xl font-bold">${total.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <p className="text-[10px] text-white/35 uppercase tracking-widest font-bold mb-1">Remaining</p>
              <p className={`text-xl font-bold ${remaining >= 0 ? 'text-green-400' : 'text-red-400'}`}>${remaining.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <p className="text-[10px] text-white/35 uppercase tracking-widest font-bold mb-1">Budget Utilized</p>
              <p className="text-xl font-bold">{pct(total)}%</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <p className="text-[10px] text-white/35 uppercase tracking-widest font-bold mb-1">Status</p>
              <p className={`text-xl font-bold ${remaining >= 0 ? 'text-blue-400' : 'text-orange-400'}`}>{remaining >= 0 ? 'On Track' : 'Over Budget'}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Bar chart */}
          <div className="lg:col-span-2 glass-card p-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-8">Expense Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.4)', fontWeight: 600 }} dy={10} />
                <YAxis stroke="rgba(255,255,255,0.2)" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.4)', fontWeight: 600 }} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)', radius: 8 }}
                  formatter={(v) => [`$${v.toLocaleString()}`, 'Amount']} 
                  contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, backdropFilter: 'blur(8px)' }} 
                />
                <Bar dataKey="amount" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Progress bars */}
          <div className="glass-card p-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-8">Allocation Breakdown</h3>
            <div className="space-y-6">
              {categories.map((cat) => (
                <div key={cat.label} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold text-white/80">{cat.label}</span>
                    <span className="text-[10px] font-bold text-white/40">${cat.value.toLocaleString()} • {pct(cat.value)}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(255,255,255,0.05)]" style={{ width: `${pct(cat.value)}%`, background: cat.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6">Plan your finances</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {quickLinks.map((l) => (
              <Link key={l.to} to={l.to} className="glass-card p-6 group hover:border-blue-500/50 no-underline block">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-blue-500/10 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                </div>
                <p className="text-base font-bold text-white mb-1">{l.label}</p>
                <p className="text-xs text-white/40 leading-relaxed">{l.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
