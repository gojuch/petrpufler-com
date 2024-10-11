'use client'

import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { client } from '@/lib/sanity/client'
import { Ambilight } from '@/components/global/ambilight'
import { cn } from '@/lib/utils'

import type { SanityImageAsset } from '@/lib/sanity/sanity.types'

import type { UseNextSanityImageOptions } from 'next-sanity-image'

export function SanityImage({
	image,
	alt,
	className,
	options,
	ambilight = false,
}: {
	image: SanityImageAsset
	alt: string
	className?: string
	options?: UseNextSanityImageOptions
	ambilight?: boolean
}) {
	const imageProps = useNextSanityImage(client, image, options)

	return (
		<div>
			<Image
				{...imageProps}
				alt={alt}
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				style={{ width: '100%', height: 'auto' }}
				placeholder="blur"
				// @ts-expect-error can't figure out proper type for this…
				blurDataURL={image.asset.metadata?.lqip}
				className={cn(className, ambilight && 'ambilight')}
			/>
			{ambilight && <Ambilight />}
		</div>
	)
}
