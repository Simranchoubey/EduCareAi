import { useState } from 'react'
import Navbar from '../components/Navbar'
import LoadingSpinner from '../components/LoadingSpinner'
import { recommendColleges } from '../services/api'

const fields = ['cs', 'engineering', 'business', 'medicine']
const countries = ['any', 'usa', 'canada', 'uk', 'germany', 'australia', 'ireland', 'singapore', 'netherlands']
const fieldLabel = { cs: 'Computer Science', engineering: 'Engineering', business: 'Business', medicine: 'Medicine' }
const countryLabel = { any: 'Any Country', usa: 'USA', canada: 'Canada', uk: 'UK', germany: 'Germany', australia: 'Australia', ireland: 'Ireland', singapore: 'Singapore', netherlands: 'Netherlands' }

function ProbBadge({ prob }) {
  const cls = { High: 'prob-high', Medium: 'prob-medium', Low: 'prob-low' }[prob] || ''
  return <span className={`tag ${cls}`}>{prob}</span>
}

export default function Navigator() {
  const [form, setForm] = useState({ cgpa: '', field: 'cs', budget: '', country: 'any', experience: '0' })
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.cgpa) return setError('Please enter your CGPA')
    setError('')
    setLoading(true)
    try {
      const { data } = await recommendColleges({
        cgpa: parseFloat(form.cgpa),
        field: form.field,
        budget: form.budget ? parseInt(form.budget) : null,
        country: form.country,
        experience: parseInt(form.experience) || 0,
      })
      setResults(data)
    } catch {
      setError('Failed to fetch recommendations. Please ensure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen text-white pb-20">
      <Navbar />
      <div className="relative z-10 px-6 md:px-12 lg:px-16 py-12 max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-xs tracking-widest uppercase text-blue-400 font-bold mb-3">AI Engine</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">University Navigator</h1>
          <p className="text-white/50 mt-4 max-w-2xl">Enter your academic profile and preferences to discover your best-fit global universities with AI-powered admission probabilities.</p>
        </div>

        {/* Form */}
        <div className="glass-card p-8 mb-12 border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-xs text-white/40 uppercase tracking-widest font-bold ml-1">CGPA (out of 10)</label>
              <input className="edu-input bg-white/5 border-white/10 focus:border-blue-500/50 py-3.5" type="number" step="0.1" min="0" max="10" placeholder="e.g. 8.2" value={form.cgpa} onChange={set('cgpa')} />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40 uppercase tracking-widest font-bold ml-1">Field of Study</label>
              <select className="edu-input bg-white/5 border-white/10 focus:border-blue-500/50 py-3.5" value={form.field} onChange={set('field')}>
                {fields.map((f) => <option key={f} value={f}>{fieldLabel[f]}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40 uppercase tracking-widest font-bold ml-1">Annual Budget (USD)</label>
              <input className="edu-input bg-white/5 border-white/10 focus:border-blue-500/50 py-3.5" type="number" placeholder="e.g. 40000" value={form.budget} onChange={set('budget')} />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40 uppercase tracking-widest font-bold ml-1">Preferred Country</label>
              <select className="edu-input bg-white/5 border-white/10 focus:border-blue-500/50 py-3.5" value={form.country} onChange={set('country')}>
                {countries.map((c) => <option key={c} value={c}>{countryLabel[c]}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40 uppercase tracking-widest font-bold ml-1">Work Experience</label>
              <input className="edu-input bg-white/5 border-white/10 focus:border-blue-500/50 py-3.5" type="number" min="0" max="20" placeholder="Years" value={form.experience} onChange={set('experience')} />
            </div>
          </div>
          {error && <p className="text-red-400 text-sm mb-4 font-medium">{error}</p>}
          <button className="bg-white text-black px-10 py-4 rounded-xl font-bold text-base hover:bg-white/90 transition-all duration-300 w-full md:w-auto shadow-lg shadow-white/5" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Analyzing Profile...' : 'Get AI Recommendations'}
          </button>
        </div>

        {/* Results */}
        {loading && <div className="py-20"><LoadingSpinner label="AI is analyzing thousands of university data points..." /></div>}
        {results && !loading && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-white/40 font-medium">Found {results.total} matching universities</p>
              <div className="h-px flex-1 bg-white/10 mx-6 hidden md:block"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.recommendations.map((uni) => (
                <div key={uni.id} className="glass-card p-6 group hover:translate-y-[-4px]">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="font-bold text-xl group-hover:text-blue-400 transition-colors">{uni.name}</h3>
                      <p className="text-sm text-white/40 mt-1 font-medium capitalize">{uni.country} • {fieldLabel[uni.field]}</p>
                    </div>
                    <ProbBadge prob={uni.probability} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-1">Annual Tuition</p>
                      <p className="text-lg font-bold">${uni.tuition.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-1">Avg Salary</p>
                      <p className="text-lg font-bold text-green-400">${uni.avgSalary.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-1">Min CGPA</p>
                      <p className="text-lg font-bold">{uni.minCGPA}/10</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-1">Deadline</p>
                      <p className="text-lg font-bold">{uni.deadline}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                    {uni.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white/40">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
