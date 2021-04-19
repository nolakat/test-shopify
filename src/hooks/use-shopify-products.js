import { useStaticQuery, graphql } from "gatsby"


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
                  description
                  handle
                  createdAt
                  tags
                  availableForSale
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
                    availableForSale
                  }
                }
              }
            }
          }
        `
      )

  return allShopifyProduct
}