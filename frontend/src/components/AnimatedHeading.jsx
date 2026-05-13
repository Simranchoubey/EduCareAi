import { useState, useEffect } from 'react'

export default function AnimatedHeading({ text, className = '', initialDelay = 200, charDelay = 30 }) {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), initialDelay)
    return () => clearTimeout(timer)
  }, [initialDelay])

  const lines = text.split('\n')

  return (
    <h1 className={className} style={{ letterSpacing: '-0.04em' }}>
      {lines.map((line, lineIndex) => {
        const lineLength = line.length
        return (
          <span key={lineIndex} style={{ display: 'block' }}>
            {line.split('').map((char, charIndex) => {
              // Exact stagger formula from spec:
              // (lineIndex * lineLength * charDelay) + (charIndex * charDelay)
              const delay = started
                ? (lineIndex * lineLength * charDelay) + (charIndex * charDelay)
                : 9999
              return (
                <span
                  key={charIndex}
                  style={{
                    display: 'inline-block',
                    opacity: started ? 1 : 0,
                    transform: started ? 'translateX(0)' : 'translateX(-18px)',
                    transition: `opacity 500ms ease ${delay}ms, transform 500ms ease ${delay}ms`,
                    whiteSpace: char === ' ' ? 'pre' : 'normal',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              )
            })}
          </span>
        )
      })}
    </h1>
  )
}
