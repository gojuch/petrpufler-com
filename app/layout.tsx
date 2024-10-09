import type { Metadata } from 'next'
import {
	Inter as FontSansFont,
	Newsreader as FontSerifFont,
} from 'next/font/google'

import '@/styles/main.css'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { NoisyBackground } from '@/components/noisy-background'

const fontSans = FontSansFont({
	variable: '--font-sans',
	subsets: ['latin-ext'],
})

const fontSerif = FontSerifFont({
	variable: '--font-serif',
	subsets: ['latin-ext'],
	display: 'swap',
	style: ['normal', 'italic'],
})

export const metadata: Metadata = {
	title: 'Petr Pufler',
	description: 'light artist and designer',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`relative ${fontSans.variable} ${fontSerif.variable}`}>
				<Header />
				<main>{children}</main>
				<Footer />
				<NoisyBackground />
			</body>
		</html>
	)
}
