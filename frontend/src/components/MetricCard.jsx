export default function MetricCard({ label, value, sub, accent = false }) {
  return (
    <div className="glass-card p-6 border-white/5">
      <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-2">{label}</p>
      <p className={`text-2xl font-bold tracking-tight ${accent ? 'text-green-400' : 'text-white'}`}>{value}</p>
      {sub && <p className="text-[10px] text-white/20 mt-2 font-medium">{sub}</p>}
    </div>
  )
}
