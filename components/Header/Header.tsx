import Link from 'next/link';
import AuthNavigation from '../AuthNavigation/AuthNavigation'; // <-- 1. ИМПОРТИРУЕМ СЮДА
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <Link href="/" className={css.logo}>
          NoteHub
        </Link>
        <ul className={css.menuList}>
          <li>
            <Link href="/notes/filter/all">Notes</Link>
          </li>
          <AuthNavigation /> 
        </ul>
      </nav>
    </header>
  );
}