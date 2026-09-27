import { Environment } from "@react-three/drei"

interface SkyboxProps{
    isBackground: boolean,
    file: string,
}

const Skybox = ({isBackground, file} : SkyboxProps) => {
  return (
    <Environment background={isBackground} files={file}/>
  )
}

export default Skybox