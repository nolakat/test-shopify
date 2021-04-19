import React, { useRef } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useSpring, config } from '@react-spring/core'
import { a } from '@react-spring/three'



const Model = ({ hovered }) => {


    const { nodes } = useLoader(GLTFLoader, '/models/cube/TestCube.gltf', loader=>{
    })
    const ModelRef = useRef();
    const obj = nodes.Cube;
    // console.log('OBJ', obj);

    
    useFrame((state, delta) => (    ModelRef.current.rotation.x = ModelRef.current.rotation.y += 0.01 ))

    const props = useSpring({
        scale: hovered ? [1.5, 1.5, 1.5] : [1, 1, 1]
    })

    console.log('HOVERED', hovered)

     return (
         <a.group 
         ref={ModelRef}
         displose={null}

         >
             
                     <a.mesh
                      geometry={obj.geometry}
                      scale={ props.scale }
                      position={[0, 0, 0]}
                      key={obj.userData.name}>
                           <meshStandardMaterial
                          attach = "material"
                          map={obj.material.map}
                          flatShading={false}
                          fog={true}
                          />

                     </a.mesh>
                 
         </a.group>
     )
}

export default Model