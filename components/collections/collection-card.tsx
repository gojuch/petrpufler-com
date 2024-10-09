import Link from 'next/link'
import { SanityImage } from '@/components/ui/sanity-image'
import { Collections } from '@/lib/sanity/sanity.types'
import { Ambilight } from '@/components/global/ambilight'

interface CollectionCardProps {
	collection: Collections
}

export function CollectionCard({ collection }: CollectionCardProps) {
	return (
		<Link
			href={`/${collection.slug?.current}`}
			className="group relative block opacity-80 hover:opacity-100"
		>
			<div className="">
				{collection.coverImage && (
					<SanityImage
						// @ts-expect-error can't figure out why this is not working
						image={collection.coverImage}
						alt={collection.title || 'Collection cover'}
						className="ambilight"
					/>
				)}

				<Ambilight isAnimated={false} />

				<h3 className="absolute bottom-2 left-2 font-serif font-medium lowercase text-white/80">
					{collection.title}
				</h3>
			</div>
		</Link>
	)
}
