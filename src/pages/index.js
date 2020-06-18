import React, { Suspense, useRef, useEffect } from 'react'
import { Canvas, Dom } from "react-three-fiber"
import { useShopifyProducts } from "../hooks/use-shopify-products"
import state from "~/components/ScrollRig/store"
import ScrollRig from '~/components/ScrollRig'

const IndexPage = () => {

    const scrollArea = useRef()
    const onScroll = e => (state.top.current = e.target.scrollTop)
    useEffect(() => void onScroll({ target: scrollArea.current }), [])

    const { edges } = useShopifyProducts();
    const all_products = edges.map(edge => edge.node );


    return(
        <>
            <Canvas orthographic camera={{ zoom: state.zoom, position: [0, 0, 500] }}>          
                <Suspense fallback={<Dom center className="loading" children="Loading..." />}>
                    <ScrollRig allProducts={all_products} />
                </Suspense>
            </Canvas>
            <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
                <div style={{ height: `${edges.length * 100}vh` }} />
            </div>
        </>
    )
}

export default IndexPage
