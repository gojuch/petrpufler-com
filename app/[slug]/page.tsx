import { notFound } from 'next/navigation'

import { sanityFetch } from '@/lib/sanity/client'
import { singleCollectionQuery } from '@/lib/sanity/query'
import { Collections } from '@/lib/sanity/sanity.types'
import { SanityImage } from '@/components/ui/sanity-image'

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

	return (
		<div className="container mx-auto max-w-screen-md px-4 py-8">
			<h1 className="text-lg font-semibold text-white">{collection.title}</h1>
			<p className="mt-1.5 font-serif text-muted-foreground">
				{collection.description}
			</p>

			<div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{collection.images &&
					collection.images.length > 0 &&
					collection.images.map((image, index) => {
						return (
							<SanityImage
								key={image._key}
								image={image.asset}
								alt={`Image ${index + 1} from ${collection.title}`}
							/>
						)
					})}
			</div>
		</div>
	)
}
