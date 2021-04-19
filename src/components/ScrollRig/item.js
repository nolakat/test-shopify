import React, { useRef } from 'react'

const Item = ({ product, index }) => {


    factorTicker = factorTicker + 0.5;
    // console.log('product', product);
   const  new_ticker = factorTicker + 0.2;

   let color = hovered ? 'blue' : 'yellow'

   let scale = hovered ? [1.25, 1.25, 1.25] : [1, 1, 1];
   console.log('WHTF', hovered)

   const [hovered, setHover] = useState(false)
  
  
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

