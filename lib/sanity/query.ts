export const singleCollectionQuery = `
  *[_type == "collections" && slug.current == $slug][0] {
    title,
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
    title,
    featuredCollections[]-> {
      _id,
      title,
      slug,
      coverImage {
        _key,
        asset->
      }
    }
  }
`

export const contactPageQuery = `
  *[_type == "contact"][0] {
    email,
    instagramUrl
  }
`