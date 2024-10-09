import { aboutPageQuery, contactPageQuery } from '@/lib/sanity/query'
import { sanityFetch } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'

import { About, Contact } from '@/lib/sanity/sanity.types'

import { SanityImage } from '@/components/ui/sanity-image'

export default async function AboutPage() {
	const aboutPage = await sanityFetch<About>({
		query: aboutPageQuery,
		tags: ['about'],
	})
	const contactPage = await sanityFetch<Contact>({
		query: contactPageQuery,
		tags: ['contact'],
	})
	return (
		<article className="container mt-20 lg:grid lg:grid-cols-3 lg:gap-12">
			<div></div>
			<div className="lg:col-span-2">
				<h1 className="font-bold">{aboutPage.title}</h1>
				<p className="mt-1 font-serif italic text-muted-foreground">
					{aboutPage.subtitle}
				</p>
			</div>
			{aboutPage.profilePhoto && (
				<div>
					<SanityImage image={aboutPage.profilePhoto} alt={aboutPage.title} />
				</div>
			)}
			<div className="lg:col-span-2">
				{aboutPage.content && (
					<div className="post mt-6 text-foreground/70 lg:mt-0">
						<PortableText value={aboutPage.content} />
					</div>
				)}
				{contactPage && (
					<div className="mt-12 flex items-center gap-4">
						{contactPage.email && (
							<a href={`mailto:${contactPage.email}`}>{contactPage.email}</a>
						)}
						{contactPage.email && contactPage.instagramUrl && (
							<span className="text-muted-foreground/60">/</span>
						)}
						{contactPage.instagramUrl && (
							<a href={contactPage.instagramUrl} target="_blank">
								Instagram
							</a>
						)}
					</div>
				)}
			</div>
		</article>
	)
}
