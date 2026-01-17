"use client"

export function AdminHeader({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center border-b border-border bg-background px-6">
      <h1 className="text-2xl font-bold">{title}</h1>
    </header>
  )
}
