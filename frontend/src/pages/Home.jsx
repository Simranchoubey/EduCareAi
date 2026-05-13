import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import AnimatedHeading from '../components/AnimatedHeading'
import FadeIn from '../components/FadeIn'

const steps = [
  { num: '01', title: 'Build Your Profile',    desc: 'Enter your CGPA, field of study, budget, and target regions.' },
  { num: '02', title: 'Explore Universities',  desc: 'Get AI-ranked college recommendations with admission probabilities.' },
  { num: '03', title: 'Estimate All Costs',    desc: 'Calculate tuition, living, healthcare, and total program cost.' },
  { num: '04', title: 'Plan Your Finances',    desc: 'Compare loan options, EMI scenarios, and create a full budget.' },
]

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="px-6 md:px-12 lg:px-16 flex-1 flex flex-col justify-center py-20">
        <div className="max-w-5xl">
          <AnimatedHeading
            text={"Your Global Education\nJourney, Reimagined."}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white tracking-tighter"
            initialDelay={200}
            charDelay={30}
          />

          <FadeIn delay={800} duration={1000}>
            <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl leading-relaxed">
              Empowering students with AI-driven university selection, transparent cost estimation, and smart financial planning.
            </p>
          </FadeIn>

          <FadeIn delay={1200} duration={1000}>
            <div className="flex flex-wrap gap-5">
              <Link
                to="/navigator"
                className="bg-white text-black px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/90 transition-all duration-300 no-underline shadow-xl shadow-white/10"
              >
                Find Universities
              </Link>
              <Link
                to="/chat"
                className="glass-card bg-white/5 border border-white/10 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-300 no-underline"
              >
                Talk to AI Copilot
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Journey Steps Section */}
      <div className="relative z-10 px-6 md:px-12 lg:px-16 py-32 bg-black/20 backdrop-blur-xl border-t border-white/5">
        <FadeIn delay={200} duration={800}>
          <div className="max-w-4xl mb-20">
            <p className="text-xs tracking-widest uppercase text-blue-400 font-bold mb-4">The Platform</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              One platform, every answer.
            </h2>
            <p className="text-lg text-white/50 leading-relaxed">
              We've simplified the complex process of studying abroad into four clear, AI-assisted steps.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <FadeIn key={step.num} delay={300 + i * 120} duration={700}>
              <div className="glass-card p-8 group">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                  <span className="text-blue-400 font-bold text-lg">{step.num}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-white/50 leading-relaxed">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={800} duration={700}>
          <div className="mt-32 p-12 glass-card border-white/5 flex flex-wrap justify-between items-center gap-12">
            {[
              { label: 'Universities', value: '14+' },
              { label: 'Countries',    value: '6'   },
              { label: 'Loan Partners',value: '6'   },
              { label: 'AI Accuracy',  value: '99%'},
            ].map((stat) => (
              <div key={stat.label} className="flex-1 min-w-[150px]">
                <p className="text-4xl md:text-5xl font-bold mb-2 premium-gradient-text">{stat.value}</p>
                <p className="text-xs text-white/30 uppercase tracking-widest font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
