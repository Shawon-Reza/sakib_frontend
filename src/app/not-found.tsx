import Link from "next/link";

export default function NotFound() {
	return (
		<main className="relative grid min-h-screen place-items-center overflow-hidden bg-zinc-100 px-4 py-16 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 sm:px-6 lg:px-8">
			<div className="pointer-events-none absolute inset-0 opacity-70">
				<div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-cyan-300/50 blur-3xl dark:bg-cyan-500/20" />
				<div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-amber-300/50 blur-3xl dark:bg-amber-500/20" />
			</div>

			<section className="relative z-10 w-full max-w-2xl rounded-3xl border border-zinc-200 bg-white/90 p-8 text-center shadow-xl backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80 sm:p-10">
				<p className="mx-auto inline-block rounded-full border border-zinc-300 px-4 py-1 text-xs font-bold tracking-[0.2em] text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
					ERROR 404
				</p>

				<h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
					Route Not Found
				</h1>

				<p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
					The page you are looking for does not exist, was moved, or the URL
					is incorrect. Let&apos;s get you back to Kaiya Taxi.
				</p>

				<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
					<Link
						href="/"
						className="inline-flex min-w-44 items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
					>
						Back To Home
					</Link>
					
				</div>
			</section>
		</main>
	);
}