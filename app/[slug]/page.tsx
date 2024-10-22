import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'

import { sanityFetch } from '@/lib/sanity/client'
import { singleCollectionQuery } from '@/lib/sanity/query'
import { Collections } from '@/lib/sanity/sanity.types'

export const revalidate = 0

// Dynamically import the Lightbox component
const Lightbox = dynamic(() => import('@/components/ui/lightbox'))

export async function generateMetadata({
	params: { slug },
}: {
	params: { slug: string }
}) {
	const collection = (await sanityFetch({
		query: singleCollectionQuery,
		tags: ['collection'],
		qParams: { slug: slug },
	})) as Collections

	if (collection) {
		return {
			title: collection.title,
			description: collection.description,
			openGraph: {
				title: collection.title,
				description: collection.description,
				type: 'website',
			},
		}
	}
}

export default async function CollectionPage({
	params: { slug },
}: {
	params: { slug: string }
}) {
	const collection = (await sanityFetch({
		query: singleCollectionQuery,
		tags: ['collection'],
		qParams: { slug: slug },
	})) as Collections

	if (!collection) {
		notFound()
	}

	// console.log('Collection images:', collection.images) // Add this line

	return (
		<div className="container mx-auto max-w-screen-md px-4 py-8">
			<h1 className="text-lg font-semibold text-white">{collection.title}</h1>
			<p className="mt-1.5 font-serif text-muted-foreground">
				{collection.description}
			</p>

			{collection.images && collection.images.length > 0 && (
				<Lightbox images={collection.images} title={collection.title || ''} />
			)}
		</div>
	)
}
