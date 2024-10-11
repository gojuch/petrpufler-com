'use client'

import Link from 'next/link'
import { useEventListener } from 'usehooks-ts'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export function Header() {
	const [isScrolled, setIsScrolled] = useState(false)

	useEventListener('scroll', () => {
		setIsScrolled(window.scrollY > 0)
	})

	return (
		<header
			className={cn(
				'container sticky top-0 z-10 py-4 transition-colors duration-300 lg:py-8',
				isScrolled &&
					'bg-background/50 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none',
			)}
		>
			<div className="flex items-center justify-between">
				<Link
					href="/"
					className="font-medium tracking-wide text-muted-foreground"
				>
					Petr Pufler
				</Link>
				<div className="flex">
					<Link href="/about">about</Link>
				</div>
			</div>
		</header>
	)
}
