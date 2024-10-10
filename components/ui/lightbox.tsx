'use client'

import { useState } from 'react'
import LightboxComponent from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

import { SanityImage } from '@/components/ui/sanity-image'
import type { Collections } from '@/lib/sanity/sanity.types'

interface LightboxProps {
	images: Collections['images']
	title: string
}

export default function Lightbox({ images, title }: LightboxProps) {
	const [open, setOpen] = useState(false)
	const [index, setIndex] = useState(0)

	// console.log('Lightbox images:', images) // Keep this line for debugging

	const slides = images?.map((image) => ({
		// @ts-expect-error don't know how to fix
		src: image.asset?.url || '',
	}))

	return (
		<>
			<div className="mt-12 grid grid-cols-3 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{images?.map((image, idx) => (
					<div
						key={image._key}
						onClick={() => {
							setIndex(idx)
							setOpen(true)
						}}
						className="cursor-pointer"
					>
						{/* @ts-expect-error don't know how to fix */}
						<SanityImage image={image} alt={`Image ${idx + 1} from ${title}`} />
					</div>
				))}
			</div>

			<LightboxComponent
				open={open}
				close={() => setOpen(false)}
				index={index}
				slides={slides}
				styles={{
					container: {
						left: 0,
						right: 10,
						top: 0,
						bottom: 0,
					},
				}}
			/>
		</>
	)
}
