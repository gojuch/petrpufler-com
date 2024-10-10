'server-only'

import { createClient } from '@sanity/client'
import type { QueryParams } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03'

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: false,
})

export async function sanityFetch<QueryResponse>({
	query,
	qParams,
	tags,
}: {
	query: string
	qParams?: QueryParams
	tags: string[]
}): Promise<QueryResponse> {
	return client.fetch<QueryResponse>(query, qParams || {}, {
		cache: 'force-cache',
		next: { tags },
	})
}
