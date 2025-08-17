import LandingPage from '@/components/shared/LandingPage';
import { SignOutButton } from '@clerk/nextjs';
import {currentUser} from '@clerk/nextjs/server'

export default async function Home() {
  const user = await currentUser()

  if (!user) {
    return (
      <>
        <LandingPage/>
      </>
    )
  }
  return (
    <main>
      <SignOutButton>
        <button className="lg:w-full text-black mx-5 my-2 lg:mx-0 lg:my-2 px-6 py-2 rounded-lg bg-white hover:bg-slate-300">
            Sign out
        </button>
      </SignOutButton>
    </main>
  );
}
