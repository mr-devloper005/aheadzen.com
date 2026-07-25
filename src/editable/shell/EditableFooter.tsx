'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const tasks = SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile')
  const { session, logout } = useEditableLocalAuthSession()
  return (
    <footer className="border-t border-white/10 bg-[#1a2026] text-white">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <img src="/favicon.png?v=20260413" alt="Aheadzen" className="h-14 w-14 shrink-0 object-cover" />
            <span className="editable-display text-2xl font-extrabold">Aheadzen</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/60">Discover trusted people, practical services, and worthwhile opportunities in one focused community.</p>
        </div>
        <div><h3 className="text-xs font-bold uppercase tracking-[.22em] text-[var(--slot4-accent)]">Discover</h3><div className="mt-5 grid gap-3">{tasks.map((task) => <Link key={task.key} href={task.route} className="inline-flex items-center gap-2 text-sm text-white/65 hover:text-white">{task.label}<ArrowUpRight className="h-3 w-3" /></Link>)}</div></div>
        <div><h3 className="text-xs font-bold uppercase tracking-[.22em] text-[var(--slot4-accent)]">Company</h3><div className="mt-5 grid gap-3 text-sm text-white/65"><Link href="/about">About Aheadzen</Link><Link href="/search">Search</Link><Link href="/contact">Help & contact</Link></div></div>
        <div><h3 className="text-xs font-bold uppercase tracking-[.22em] text-[var(--slot4-accent)]">Account</h3><div className="mt-5 grid gap-3 text-sm text-white/65">{session ? <><Link href="/create">Create a post</Link><span className="text-white">Signed in as {session.name}</span><button type="button" onClick={logout} className="w-fit text-left hover:text-white">Logout</button></> : <><Link href="/login">Sign in</Link><Link href="/signup">Get started</Link></>}</div></div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/45">© {new Date().getFullYear()} Aheadzen. Built for useful connections.</div>
    </footer>
  )
}
