'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, CircleUserRound, LogIn, Menu, Plus, Search, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navItems = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile').map((task) => ({ label: task.label, href: task.route })), [])

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-black/90 text-white backdrop-blur-xl">
      <nav className="mx-auto flex min-h-16 max-w-[var(--editable-container)] items-center gap-5 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <img src="/favicon.png?v=20260413" alt="Aheadzen" className="h-12 w-12 shrink-0 object-cover" />
          <span className="editable-display text-lg font-extrabold">Aheadzen</span>
        </Link>
        <div className="hidden items-center lg:flex">
          {navItems.slice(0, 5).map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return <Link key={item.href} href={item.href} className={`relative flex items-center gap-1 px-4 py-5 text-sm font-medium transition ${active ? 'text-white' : 'text-[var(--slot4-muted-text)] hover:text-white'}`}>{item.label}<ChevronDown className="h-3 w-3 opacity-50" />{active ? <span className="absolute inset-x-4 bottom-0 h-0.5 bg-[var(--slot4-accent)]" /> : null}</Link>
          })}
          <Link href="/about" className="px-4 text-sm text-[var(--slot4-muted-text)] hover:text-white">About</Link>
        </div>
        <form action="/search" className="ml-auto hidden md:block">
          <label className="flex h-10 items-center gap-2 rounded-full bg-[#161b21] px-3">
            <Search className="h-4 w-4 text-white/70" /><input name="q" type="search" aria-label="Search Aheadzen" placeholder="Search" className="w-20 bg-transparent text-sm outline-none transition focus:w-40" />
          </label>
        </form>
        <div className="flex items-center gap-2">
          {session ? <>
            <span className="hidden items-center gap-2 text-sm font-semibold md:inline-flex"><CircleUserRound className="h-4 w-4 text-[var(--slot4-accent)]" />{session.name}</span>
            <Link href="/create" className="hidden items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-extrabold text-black sm:inline-flex"><Plus className="h-4 w-4" />Create</Link>
            <button type="button" onClick={logout} className="hidden px-3 py-2 text-xs font-bold text-white/70 hover:text-white sm:block">Logout</button>
          </> : <>
            <Link href="/login" className="hidden items-center gap-1.5 rounded-full border border-[#34404a] px-4 py-2 text-xs font-bold hover:border-white/60 sm:inline-flex"><LogIn className="h-3.5 w-3.5" />Sign in</Link>
            <Link href="/signup" className="hidden items-center gap-1.5 rounded-full bg-white px-5 py-2 text-xs font-extrabold text-black sm:inline-flex"><UserPlus className="h-3.5 w-3.5" />Get started</Link>
          </>}
          <button type="button" onClick={() => setOpen(!open)} className="rounded-full border border-white/20 p-2 lg:hidden" aria-label="Toggle menu">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </nav>
      {open ? <div className="border-t border-white/10 bg-black px-4 py-5 lg:hidden">
        <div className="grid gap-1">{[{ label: 'Home', href: '/' }, ...navItems, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }, ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Sign in', href: '/login' }, { label: 'Get started', href: '/signup' }])].map((item) => <Link key={`${item.href}-${item.label}`} href={item.href} onClick={() => setOpen(false)} className="border-l-2 border-transparent px-4 py-3 text-sm font-semibold text-white/70 hover:border-[var(--slot4-accent)] hover:bg-white/5 hover:text-white">{item.label}</Link>)}</div>
        {session ? <button type="button" onClick={() => { logout(); setOpen(false) }} className="mt-3 w-full rounded-full border border-white/20 px-4 py-3 text-sm font-bold">Logout</button> : null}
      </div> : null}
    </header>
  )
}
