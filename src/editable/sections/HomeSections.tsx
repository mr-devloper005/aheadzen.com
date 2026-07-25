import Link from 'next/link'
import { ArrowRight, BadgeCheck, BriefcaseBusiness, Building2, MapPin, Search, Sparkles, UserRound } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = { primaryTask: TaskKey; primaryRoute: string; posts: SitePost[]; timeSections: HomeTimeSection[] }
const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

function poolOf(posts: SitePost[], timeSections: HomeTimeSection[]) {
  return Array.from(new Map([...posts, ...timeSections.flatMap((item) => item.posts)].map((post) => [post.slug || post.id || post.title, post])).values())
}

function Media({ post, className = '' }: { post?: SitePost; className?: string }) {
  if (!post) return <div className={`bg-[linear-gradient(135deg,#241541,#10151a)] ${className}`} />
  return <img src={getEditablePostImage(post)} alt={post.title || 'Aheadzen listing'} className={`object-cover ${className}`} />
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = poolOf(posts, timeSections)
  return (
    <section className="relative isolate overflow-hidden bg-black">
      <div className="absolute left-[52%] top-12 h-72 w-72 rounded-full bg-violet-600/20 blur-[100px]" />
      <div className={`${container} grid min-h-[690px] items-center gap-12 py-16 lg:grid-cols-[.9fr_1.1fr] lg:py-24`}>
        <div className="relative z-10">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.24em] text-[var(--slot4-accent)]"><Sparkles className="h-4 w-4" />Local opportunity, sharper focus</p>
          <h1 className="mt-6 max-w-2xl text-5xl font-extrabold leading-[.96] tracking-[-.055em] text-white sm:text-6xl lg:text-7xl">Find what moves you <span className="text-[var(--slot4-accent)]">ahead.</span></h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/72">Discover products, services, work, rentals, and opportunities worth knowing. Focused listings help every connection start with confidence.</p>
          <form action="/search" className="mt-9 flex max-w-xl overflow-hidden rounded-full border border-white/15 bg-[#10151a] p-1.5 shadow-2xl">
            <label className="flex min-w-0 flex-1 items-center gap-3 px-4"><Search className="h-5 w-5 text-[var(--slot4-accent)]" /><input name="q" placeholder="What are you looking for?" className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/40" /></label>
            <button className="rounded-full bg-white px-6 text-sm font-extrabold text-black transition hover:bg-violet-100">Explore</button>
          </form>
          <div className="mt-6 flex flex-wrap gap-2">{SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile').slice(0, 5).map((task) => <Link key={task.key} href={task.route} className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/65 transition hover:border-[var(--slot4-accent)] hover:text-white">{task.label}</Link>)}</div>
        </div>
        <div className="relative hidden h-[540px] lg:block">
          <div className="editable-float absolute left-8 top-24 w-52 overflow-hidden rounded-xl border border-white/20 bg-[#10151a] shadow-2xl"><Media post={pool[0]} className="h-52 w-full" /><div className="p-4"><span className="text-xs text-violet-300">{getEditableCategory(pool[0])}</span><p className="mt-1 line-clamp-2 font-bold">{pool[0]?.title || 'Fresh opportunities nearby'}</p></div></div>
          <div className="editable-float-delayed absolute left-[43%] top-3 w-60 overflow-hidden rounded-xl border border-white/20 bg-[#10151a] shadow-2xl"><Media post={pool[1]} className="h-72 w-full" /><div className="p-4"><p className="line-clamp-2 font-bold">{pool[1]?.title || 'Listings you can trust'}</p><span className="mt-2 flex items-center gap-1 text-xs text-emerald-300"><BadgeCheck className="h-3.5 w-3.5" />Verified listing details</span></div></div>
          <div className="editable-float absolute bottom-5 right-0 w-72 overflow-hidden rounded-xl border border-white/20 bg-[#10151a] shadow-2xl"><Media post={pool[2]} className="h-48 w-full" /><div className="p-4"><p className="line-clamp-1 font-bold">{pool[2]?.title || 'A better way to discover'}</p></div></div>
          <div className="absolute bottom-16 left-[31%] rounded-xl border border-violet-500/60 bg-black/80 px-6 py-4 text-center"><p className="text-3xl font-extrabold text-violet-400">A+</p><p className="text-[10px] uppercase tracking-widest text-white/50">Connection quality</p></div>
        </div>
      </div>
      <div className="border-y border-white/10 bg-white/[.025] py-4"><div className="editable-marquee flex w-max gap-6">{[...pool.slice(0, 8), ...pool.slice(0, 8)].map((post, index) => <Link key={`${post.id || post.slug}-${index}`} href={postHref(primaryTask, post, primaryRoute)} className="flex w-72 shrink-0 items-center gap-3 rounded-lg border border-white/10 bg-white/[.03] p-2"><Media post={post} className="h-12 w-12 rounded-md" /><span className="line-clamp-2 text-xs font-semibold text-white/75">{post.title}</span></Link>)}</div></div>
    </section>
  )
}

export function EditableStoryRail({ primaryRoute }: HomeSectionProps) {
  const options = [
    ['Buy & sell', 'Products and practical finds', BriefcaseBusiness],
    ['Hire experts', 'Skills for the work ahead', UserRound],
    ['Find places', 'Rentals and local spaces', MapPin],
    ['Meet businesses', 'Organizations with clear listings', Building2],
  ] as const
  return <section className="bg-black"><div className={`${container} py-16`}><p className="text-xs font-bold uppercase tracking-[.24em] text-violet-400">Choose your direction</p><div className="mt-4 flex items-end justify-between"><h2 className="max-w-2xl text-3xl font-extrabold sm:text-5xl">The right opportunity starts with a clearer view.</h2><Link href={primaryRoute} className="hidden items-center gap-2 text-sm font-bold text-violet-300 sm:flex">Browse everything <ArrowRight className="h-4 w-4" /></Link></div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{options.map(([title, copy, Icon]) => <Link key={title} href={primaryRoute} className="group border border-white/10 bg-[#0b0e11] p-6 transition hover:-translate-y-1 hover:border-violet-500/60"><Icon className="h-8 w-8 text-violet-400" /><h3 className="mt-8 text-xl font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-white/55">{copy}</p><ArrowRight className="mt-7 h-5 w-5 transition group-hover:translate-x-2" /></Link>)}</div></div></section>
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = poolOf(posts, timeSections).slice(0, 6)
  if (!pool.length) return null
  return <section className="bg-[#0d1116]"><div className={`${container} py-16 sm:py-20`}><div className="flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[.24em] text-violet-400">Fresh on Aheadzen</p><h2 className="mt-3 text-3xl font-extrabold sm:text-5xl">People and possibilities</h2></div></div><div className="mt-10 grid gap-5 lg:grid-cols-12">
    <Link href={postHref(primaryTask, pool[0], primaryRoute)} className="group relative min-h-[500px] overflow-hidden rounded-xl lg:col-span-7"><Media post={pool[0]} className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-7 sm:p-10"><span className="rounded-full bg-violet-600 px-3 py-1 text-xs font-bold">{getEditableCategory(pool[0])}</span><h3 className="mt-4 max-w-2xl text-3xl font-extrabold sm:text-5xl">{pool[0].title}</h3><p className="mt-3 max-w-xl text-white/65">{getEditableExcerpt(pool[0], 160)}</p></div></Link>
    <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">{pool.slice(1, 4).map((post, index) => <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group grid min-h-40 grid-cols-[150px_1fr] overflow-hidden rounded-xl border border-white/10 bg-black/40"><Media post={post} className="h-full w-full transition duration-500 group-hover:scale-105" /><div className="p-5"><span className="text-[10px] font-bold uppercase tracking-widest text-violet-400">0{index + 2} · {getEditableCategory(post)}</span><h3 className="mt-3 line-clamp-2 text-lg font-bold">{post.title}</h3><p className="mt-2 line-clamp-2 text-xs leading-5 text-white/50">{getEditableExcerpt(post, 90)}</p></div></Link>)}</div>
  </div></div></section>
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = poolOf(posts, timeSections).slice(4, 12)
  if (!pool.length) return null
  return <section className="bg-black"><div className={`${container} py-16 sm:py-20`}><p className="text-xs font-bold uppercase tracking-[.24em] text-violet-400">Explore more</p><h2 className="mt-3 text-3xl font-extrabold sm:text-5xl">Worth a closer look</h2><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{pool.map((post, index) => <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className={`group overflow-hidden border border-white/10 bg-[#0b0e11] transition hover:-translate-y-1 hover:border-violet-500/50 ${index % 3 === 0 ? 'sm:row-span-2' : ''}`}><Media post={post} className={`w-full transition duration-500 group-hover:scale-105 ${index % 3 === 0 ? 'h-80' : 'h-48'}`} /><div className="p-5"><span className="text-[10px] font-bold uppercase tracking-widest text-violet-400">{getEditableCategory(post)}</span><h3 className="mt-2 line-clamp-2 text-lg font-bold">{post.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-white/50">{getEditableExcerpt(post, 100)}</p></div></Link>)}</div></div></section>
}

export function EditableHomeCta() {
  return <section className="relative overflow-hidden bg-black"><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(139,79,255,.28),transparent_48%)]" /><div className={`${container} relative py-24 text-center`}><p className="text-xs font-bold uppercase tracking-[.24em] text-violet-400">Ready when you are</p><h2 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold sm:text-6xl">Put your next opportunity in motion.</h2><p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-white/60">Share an offer, present your work, or find the person who can help with what comes next.</p><div className="mt-9 flex flex-wrap justify-center gap-3"><Link href="/create" className="rounded-full bg-white px-7 py-3.5 text-sm font-extrabold text-black">Create a post</Link><Link href="/contact" className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-extrabold">Contact us</Link></div></div></section>
}
