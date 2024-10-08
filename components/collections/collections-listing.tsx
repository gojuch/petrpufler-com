import { CollectionCard } from '@/components/collections/collection-card'

import type { Collections } from '@/lib/sanity/sanity.types'

interface CollectionsListingProps {
	collections: Collections[]
}

export function CollectionsListing({ collections }: CollectionsListingProps) {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mx-auto grid max-w-2xl space-y-24 lg:space-y-40">
				{collections.map((collection) => (
					<CollectionCard key={collection._id} collection={collection} />
				))}
			</div>
		</div>
	)
}
