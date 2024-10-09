import Link from 'next/link'
import { SanityImage } from '@/components/ui/sanity-image'
import { Collections } from '@/lib/sanity/sanity.types'

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
						className="shadow-blur"
					/>
				)}
				<svg aria-hidden="true">
					<filter
						id="shadow"
						x="-100%"
						y="-100%"
						width="300%"
						height="300%"
						color-interpolation-filters="sRGB"
						primitiveUnits="objectBoundingBox"
					>
						<feGaussianBlur stdDeviation="0.1"></feGaussianBlur>
						<feOffset dx="0.1" dy="0.1" result="in"></feOffset>
						<feTurbulence
							type="fractalNoise"
							baseFrequency="9.173"
						></feTurbulence>
						<feDisplacementMap
							in="in"
							scale="0.2"
							yChannelSelector="R"
						></feDisplacementMap>
						<feComponentTransfer>
							<feFuncA type="linear" slope=".9"></feFuncA>
						</feComponentTransfer>
						<feBlend in="SourceGraphic"></feBlend>
					</filter>
				</svg>

				<h3 className="absolute bottom-2 left-2 font-serif font-medium lowercase text-white/80">
					{collection.title}
				</h3>
			</div>
		</Link>
	)
}
