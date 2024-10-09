import Link from 'next/link'

export function Header() {
	return (
		<header className="container sticky top-0 bg-background/50 py-4 backdrop-blur-sm lg:bg-transparent lg:py-8 lg:backdrop-blur-none">
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
