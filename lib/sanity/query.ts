export const singleCollectionQuery = `
  *[_type == "collections" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    description,
    images[] {
      _key,
      asset->
    }
  }
`

// New query for fetching the about page
export const aboutPageQuery = `
  *[_type == "about"][0] {
    title,
    "slug": slug.current,
    subtitle,
    content,
    profilePhoto {
    _key,
      asset->
    }
  }
`

// New query for fetching homepage featured collections
export const homepageFeaturedCollectionsQuery = `
*[_type == "homepage"][0] {
  ...,
  "slug": slug.current,
  "featuredCollections": featuredCollections[]-> {
    _id,
    _type,
    title,
    slug,
    coverImage {
      _key,
      asset->{
        ...,
        metadata
      }
    },
    description,
    images,
    videos
  }
}
`

export const contactPageQuery = `
  *[_type == "contact"][0] {
    email,
    instagramUrl
  }
`
