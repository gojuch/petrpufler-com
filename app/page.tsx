import { sanityFetch } from '@/lib/sanity/client'
import { homepageFeaturedCollectionsQuery } from '@/lib/sanity/query'
import { Homepage, Collections } from '@/lib/sanity/sanity.types'
import { CollectionsListing } from '@/components/collections/collections-listing'

export default async function HomePage() {
	const homepage = await sanityFetch<
		Homepage & { featuredCollections: Collections[] }
	>({
		query: homepageFeaturedCollectionsQuery,
		tags: ['homepage'],
	})

	return (
		<div>
			{homepage.featuredCollections && (
				<CollectionsListing collections={homepage.featuredCollections} />
			)}
		</div>
	)
}
