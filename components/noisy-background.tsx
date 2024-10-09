'use client'

import React, { useCallback, useEffect, useRef } from 'react'

export function NoisyBackground({
	opacity = 0.015,
	baseFrequency = 1.35,
	octaves = 4,
	seed = 0,
}: {
	opacity?: number
	baseFrequency?: number
	octaves?: number
	seed?: number
}) {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	const drawNoise = useCallback(
		(ctx: CanvasRenderingContext2D, width: number, height: number) => {
			const imageData = ctx.createImageData(width, height)
			const data = imageData.data

			for (let i = 0; i < data.length; i += 4) {
				const value = Math.random() * 255
				data[i] = value // red
				data[i + 1] = value // green
				data[i + 2] = value // blue
				data[i + 3] = Math.random() * 255 * opacity // alpha
			}

			ctx.putImageData(imageData, 0, 0)
		},
		[opacity],
	)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				canvas.width = entry.contentRect.width
				canvas.height = entry.contentRect.height
				drawNoise(ctx, canvas.width, canvas.height)
			}
		})

		resizeObserver.observe(canvas)

		return () => {
			resizeObserver.disconnect()
		}
	}, [drawNoise])

	return (
		<div className="pointer-events-none fixed inset-0 z-[-1]">
			<canvas
				ref={canvasRef}
				className="h-full w-full opacity-50"
				style={{ mixBlendMode: 'overlay' }}
			/>
			<svg
				className="absolute inset-0 h-full w-full opacity-10"
				style={{ filter: 'contrast(120%) brightness(80%)' }}
			>
				<filter id="noiseFilter">
					<feTurbulence
						type="fractalNoise"
						baseFrequency={baseFrequency}
						numOctaves={octaves}
						stitchTiles="stitch"
						seed={seed}
					/>
					<feColorMatrix type="saturate" values="0" />
				</filter>
				<rect width="100%" height="100%" filter="url(#noiseFilter)" />
			</svg>
		</div>
	)
}
