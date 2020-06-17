import { createRef } from "react"
import { useStaticQuery, graphql, Link } from 'gatsby'




const state = {
    sections: 3,
    pages: 3,
    zoom: 75,
    top: createRef()
  
}

export default state
