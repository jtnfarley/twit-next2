import { currentUser } from "@clerk/nextjs/server";

import { createUser } from '@/lib/actions/user.actions'

export default async function Page() {

	const user = await currentUser()

	if (user) {
		await createUser({
			userId: user.id,
			email: user.emailAddresses[0].emailAddress,
			username: user.username || '',
			name: `${user.firstName || ''} ${user.lastName || ''}`,
			image: user.imageUrl || ''
		})
	}
	
	return (
		<>
			<h1 className="text-light-1">Onboarding</h1>
		</>
	)
}
