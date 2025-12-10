'use client';

import { personalInfo } from '@/data/content';
import styles from './About.module.css';

export default function About() {
    return (
        <section className="section" id="about">
            <div className="container">
                <h2 className="section-title">À Propos de Moi</h2>

                <div className={styles.aboutContent}>
                    <div className={styles.aboutImage}>
                        <div className={styles.imageWrapper}>
                            <div className={styles.imagePlaceholder}>
                                <span className={styles.placeholderIcon}>👤</span>
                            </div>
                            <div className={styles.imageDecoration}></div>
                        </div>
                    </div>

                    <div className={styles.aboutText}>
                        <h3 className={styles.aboutSubtitle}>
                            Designer Graphique Polyvalent
                        </h3>

                        <p className={styles.aboutBio}>
                            {personalInfo.bio}
                        </p>

                        <div className={styles.valueProposition}>
                            <h4 className={styles.valueTitle}>🔥 Ma valeur ajoutée</h4>
                            <p>{personalInfo.valueProposition}</p>
                        </div>

                        <div className={styles.aboutStats}>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>5+</span>
                                <span className={styles.statLabel}>Compétences</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>13+</span>
                                <span className={styles.statLabel}>Projets</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>100%</span>
                                <span className={styles.statLabel}>Satisfaction</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
