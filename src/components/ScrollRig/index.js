import lerp from "lerp"
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import React, { useRef, useState } from "react"
import { useFrame, useLoader } from "react-three-fiber"
import { HTML } from 'drei'
import { Link } from 'gatsby'


import { TextureLoader, LinearFilter } from "three"
import { useSiteMetadata } from "../../hooks/use-site-metadata"
import { useShopifyProducts } from "../../hooks/use-shopify-products"

import { Block, useBlock } from "./blocks"
import Model from  './model'

import state from "./store"
import "./styles.scss"

function Plane({ color = "white", map, ...props }) {
  return (
    <mesh {...props}>
      <planeBufferGeometry attach="geometry" />
      <meshBasicMaterial attach="material" color={color} map={map} />
    </mesh>
  )
}

function Cross() {
  const ref = useRef()
  const { viewportHeight } = useBlock()
  useFrame(() => {
    const curTop = state.top.current
    const curY = ref.current.rotation.z
    const nextY = (curTop / ((state.pages - 1) * viewportHeight)) * Math.PI
    ref.current.rotation.z = lerp(curY, nextY, 0.1)
  })
  return (
    <group ref={ref} scale={[2, 2, 2]}>
      <Plane scale={[1, 0.2, 0.2]} color="#e2bfca" />
      <Plane scale={[0.2, 1, 0.2]} color="#e2bfca" />
    </group>
  )
}

function Content({ left, children, map }) {
  const { contentMaxWidth, canvasWidth, margin} = useBlock()

  const aspect = 1.75
  const alignRight = (canvasWidth - contentMaxWidth - margin) / 2
  return (
    <group position={[alignRight * (left ? -1 : 1), 0, 0]}>
      <Plane scale={[contentMaxWidth, contentMaxWidth / aspect, 1]} color="#bfe2ca" map={map} />
      {children}
    </group>
  )
}

function Stripe() {
  const { contentMaxWidth } = useBlock()
  return <Plane scale={[100, contentMaxWidth, 1]} rotation={[0, 0, Math.PI / 4]} position={[0, 0, -1]} color="#e3f6f5" />
}

function Item({ product, index, factorTicker, product_textures, aspect, pixelWidth, contentMaxWidth, mobile }){

  factorTicker = factorTicker + 0.5;
  // console.log('product', product);
 const  new_ticker = factorTicker + 0.2;
 const [hovered, setHover] = useState(false)

 const color = hovered ? 'blue' : 'yellow'
 const scale = hovered ? [1.25, 1.25, 1.25] : [1, 1, 1];

  return(

    <>
      <Block
      key={`hello_${index}`} 
      factor={new_ticker} 
      offset={index}>
        <group
        position={[0, 0, 2]} >
        { index == 0 
        ? <Model url="/models/cube/TestCube.obj" hovered={hovered} color={color} scale={scale}/>
        : ''
        }
        </group>
            <Content left={index % 2 == false}  map={product_textures[index]}>
                <HTML className="productBlock__header" style={{ width: pixelWidth / (mobile ? 1 : 2), textAlign: "left" }} position={[-contentMaxWidth / 2, -contentMaxWidth / 3 / aspect - 0.4, 1]}>
                    <Link
                    onMouseEnter={(e) => {setHover(true)}}
                    onMouseLeave={(e) => {setHover(false)}}
                    to={`/product/${product.handle}`}><h2>{product.title}</h2></Link>
                </HTML>
            </Content>
        </Block>
        <Block key={index} factor={factorTicker} offset={index}>
            <Content left={index % 2 == false}  map={product_textures[index]}>
                <HTML  className="productBlock__description" style={{ width: pixelWidth / (mobile ? 1 : 2), textAlign: "left" }} position={[-contentMaxWidth / 2, -contentMaxWidth / 2 / aspect - 0.4, 1]}>
                    <p>{product.description}</p>
                </HTML>
            </Content>
      </Block>
    </>

  )
}

  
function ScrollRig ({allProducts}){
  const { contentMaxWidth, mobile } = useBlock()

  let factorTicker = 1;
  
  const product_images = allProducts.map(product => product.images[0].originalSrc);
  const textures = useLoader(TextureLoader, product_images);
  const product_textures = textures.map(texture => ((texture.minFilter = LinearFilter), texture))


  const aspect = 1.75
  const new_aspect = 10
  const pixelWidth = contentMaxWidth * state.zoom


  // var middle = allProducts[Math.round((allProducts.length - 1) / 2)].id;

  // console.log('middle', middle);


  // const test = useLoader(OBJLoader, '/models/shoe/shoe.obj', loader=>{
  // })

  return(
    
    allProducts.map((product, index) =>{

            return(
                  <Item mobile={mobile} contentMaxWidth={contentMaxWidth} pixelWidth={pixelWidth} new_aspect={new_aspect} aspect={aspect} product_textures={product_textures} factorTicker={factorTicker} product={product} index={index} />
                )
        })
             
  )
        
}


export default ScrollRig
