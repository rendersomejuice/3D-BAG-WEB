import { useFrame } from '@react-three/fiber'

function FPSLimiter({ limit = 60 }) {
  const interval = 1 / limit
  
  useFrame((state) => {

    state.invalidate() 
    

    const delta = state.clock.getDelta()
    

    if (delta >= interval) {
      state.gl.render(state.scene, state.camera)
    }
  })

  return null
}

export default FPSLimiter