import { useStaticQuery, graphql } from "gatsby"
import StoreContext from '~/context/StoreContext'


export const useShopifyProducts = () => {

    const { allShopifyProduct } = useStaticQuery(
        graphql`
          query {
            allShopifyProduct(
              sort: {
                fields: [createdAt]
                order: DESC
              }
            ) {
              edges {
                node {
                  id
                  title
                  handle
                  createdAt
                  images {
                    id
                    originalSrc
                    localFile {
                      childImageSharp {
                        fluid(maxWidth: 910) {
                          ...GatsbyImageSharpFluid_withWebp_tracedSVG
                        }
                      }
                    }
                  }
                  variants {
                    price
                  }
                }
              }
            }
          }
        `
      )

  return allShopifyProduct
}