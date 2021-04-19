import React, { Suspense, useRef, useEffect } from 'react'
import { Canvas, extend, useThree, useFrame } from "react-three-fiber"
import { useShopifyProducts } from "../hooks/use-shopify-products"
import state from "~/components/ScrollRig/store"
import ScrollRig from '~/components/ScrollRig'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import Model from  '~/components/ScrollRig/model'


extend({ OrbitControls })



const Controls = () => {
    const orbitRef = useRef()
    const { camera, gl } = useThree()
  
    // useFrame(() => {
    //   orbitRef.current.update()
    // })

  
    return (
      <orbitControls
        autoRotate
        enableZoom={false}
        maxPolarAngle={Math.PI / 3}
        minPolarAngle={Math.PI / 3}
        minDistance={4}
        // maxDistance={4}
        args={[camera, gl.domElement]}
        ref={orbitRef}
      />
    )
  }


  const Loader = (props) => {
    const mesh = useRef()

        return (
            <mesh
            {...props}
            ref={mesh}
            scale={[1, 1 ,1]}
            >
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshBasicMaterial attach="material" color='red' />
            </mesh>
        )
  }



const IndexPage = () => {

    const scrollArea = useRef()
    const onScroll = e => (state.top.current = e.target.scrollTop)
    useEffect(() => void onScroll({ target: scrollArea.current }), [])

    const { edges } = useShopifyProducts();
    const all_products = edges.map(edge => edge.node );


    return(
        <>
           
          

            <Canvas 
            orthographic 
            camera={{ zoom: state.zoom, position: [0, 0, 500] }}
            >   
            <Controls />
            <pointLight position={[10, 10, 10]} />
                <Suspense fallback={< Loader />}>
                    <ScrollRig 
                    allProducts={all_products} />
                </Suspense>
            </Canvas>

            <div 
            className="scrollArea" 
            ref={scrollArea} 
            onScroll={onScroll}>
                <div style={{ height: `${edges.length * 100}vh` }} />
            </div>
        </>
    )
}

export default IndexPage
