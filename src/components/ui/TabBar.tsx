'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Star, User } from 'lucide-react';

const tabs = [
  { href: '/home',    icon: Home,     label: 'Home' },
  { href: '/lesson',  icon: BookOpen, label: 'Learn' },
  { href: '/vocab',   icon: Star,     label: 'Vocab' },
  { href: '/profile', icon: User,     label: 'Profile' },
];

export function TabBar() {
  const pathname = usePathname();
  return (
    <nav className="lumo-tabbar">
      {tabs.map(({ href, icon: Icon, label }) => {
        const active = pathname.startsWith(href);
        return (
          <Link key={href} href={href} style={{ textDecoration: 'none' }}>
            <div className={`lumo-tab ${active ? 'active' : ''}`}>
              <div className="lumo-tab__dot" />
              <Icon size={22} />
              <span>{label}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
