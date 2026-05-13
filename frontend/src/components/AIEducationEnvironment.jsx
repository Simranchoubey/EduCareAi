import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'

function Stars(props) {
  const ref = useRef()
  const [sphere] = React.useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }))

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

function GradientBackground() {
  return (
    <div 
      className="absolute inset-0 -z-20 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 100%)'
      }}
    >
      <div 
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20"
        style={{ background: '#3b82f6' }}
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20"
        style={{ background: '#8b5cf6' }}
      />
    </div>
  )
}

const AIEducationEnvironment = () => {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none">
      <GradientBackground />
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars />
      </Canvas>
    </div>
  )
}

export default AIEducationEnvironment
