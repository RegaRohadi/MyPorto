import { useEffect, useState } from 'react'

function read<T>(key: string): T | null {
  try {
    const v = localStorage.getItem(key)
    return v == null ? null : (JSON.parse(v) as T)
  } catch {
    return null
  }
}

export function usePrefs() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = read<'dark' | 'light'>('gba-theme')
    if (saved === 'dark' || saved === 'light') return saved
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })
  const [reduce, setReduce] = useState<boolean>(() => {
    const saved = read<boolean>('gba-reduce')
    return saved ?? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('gba-theme', JSON.stringify(theme))
    } catch {
      /* ignore */
    }
  }, [theme])

  useEffect(() => {
    document.documentElement.classList.toggle('reduce', reduce)
    try {
      localStorage.setItem('gba-reduce', JSON.stringify(reduce))
    } catch {
      /* ignore */
    }
  }, [reduce])

  return {
    theme,
    reduce,
    toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
  }
}
