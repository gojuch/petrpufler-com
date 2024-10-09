interface AmbilightProps {
	// Controls the amount of blur applied to the image
	blurAmount?: number
	// Determines the offset of the blurred image
	offsetXAmount?: number
	offsetYAmount?: number
	// Affects the noise pattern used in the displacement map
	turbulenceFrequency?: number
	// Controls how much the image is distorted by the displacement map
	displacementScale?: number
	// Adjusts the opacity of the effect
	alphaSlope?: number
	// Controls whether the animation is enabled
	isAnimated?: boolean
	// Controls the speed of the animation
	animationSpeed?: number
}

export function Ambilight({
	// Higher values increase blur, lower values reduce it
	blurAmount = 0.15,
	// Higher values increase the offset, lower values reduce it
	offsetXAmount = 0.0,
	offsetYAmount = 0.0,
	// Higher values create finer noise, lower values create coarser noise
	turbulenceFrequency = 5.173,
	// Higher values increase distortion, lower values reduce it
	displacementScale = 0.2,
	// Higher values make the effect more opaque, lower values make it more transparent
	alphaSlope = 0.55,
	// Animation is enabled by default
	isAnimated = true,
	// Default animation speed (adjust as needed)
	animationSpeed = 0.5,
}: AmbilightProps = {}) {
	return (
		<svg aria-hidden="true">
			<filter
				id="ambilight"
				x="-100%"
				y="-100%"
				width="300%"
				height="300%"
				color-interpolation-filters="sRGB"
				primitiveUnits="objectBoundingBox"
			>
				{/* Apply Gaussian blur to the image */}
				<feGaussianBlur stdDeviation={blurAmount}></feGaussianBlur>
				{/* Offset the blurred image */}
				<feOffset
					id="ambilightOffset"
					dx={offsetXAmount}
					dy={offsetYAmount}
					result="in"
				></feOffset>
				{/* Updated animate elements for reversing animation */}
				{isAnimated && (
					<animate
						xlinkHref="#ambilightOffset"
						attributeName="dx"
						values={`${-offsetXAmount * 2}; ${offsetXAmount}; ${-offsetXAmount * 2}`}
						keyTimes="0; 0.5; 1"
						dur={`${2 / animationSpeed}s`}
						repeatCount="indefinite"
					/>
				)}
				{isAnimated && (
					<animate
						xlinkHref="#ambilightOffset"
						attributeName="dy"
						values={`${-offsetYAmount}; ${offsetYAmount}; ${-offsetYAmount}`}
						keyTimes="0; 0.5; 1"
						dur={`${2 / animationSpeed}s`}
						repeatCount="indefinite"
					/>
				)}
				{/* Generate noise pattern for displacement */}
				<feTurbulence
					id="noiseTurbulence"
					type="fractalNoise"
					baseFrequency={turbulenceFrequency}
					seed="0"
				></feTurbulence>
				{/* Apply displacement map to distort the image */}
				<feDisplacementMap
					in="in"
					scale={displacementScale}
					yChannelSelector="R"
				></feDisplacementMap>
				{/* Adjust the opacity of the effect */}
				<feComponentTransfer>
					<feFuncA type="linear" slope={alphaSlope}></feFuncA>
				</feComponentTransfer>
				{/* Blend the effect with the original image */}
				<feBlend in="SourceGraphic"></feBlend>
			</filter>
		</svg>
	)
}
