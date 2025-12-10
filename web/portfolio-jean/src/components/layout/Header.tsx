'use client';

import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.headerContent}>
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoText}>Jean</span>
                        <span className={styles.logoAccent}>Guillaume</span>
                    </Link>

                    <nav className={styles.nav}>
                        <Link href="#about" className={styles.navLink}>À Propos</Link>
                        <Link href="#skills" className={styles.navLink}>Compétences</Link>
                        <Link href="#portfolio" className={styles.navLink}>Portfolio</Link>
                        <Link href="#services" className={styles.navLink}>Services</Link>
                        <Link href="#contact" className={styles.navLink}>Contact</Link>
                    </nav>

                    <Link href="#contact" className="btn btn-primary">
                        Me Contacter
                    </Link>
                </div>
            </div>
        </header>
    );
}
