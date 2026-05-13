export default function BreakdownTable({ rows }) {
  return (
    <div className="glass-card overflow-hidden border-white/5">
      <table className="w-full text-sm">
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
              <td className="px-6 py-4 text-white/50 font-medium">{row.label}</td>
              <td className="px-6 py-4 text-right text-white font-bold">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
