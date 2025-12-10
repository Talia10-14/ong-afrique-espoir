'use client';

import { skills } from '@/data/content';
import styles from './Skills.module.css';

export default function Skills() {
    return (
        <section className="section" id="skills" style={{ background: 'var(--color-gray-100)' }}>
            <div className="container">
                <h2 className="section-title">Mes Compétences</h2>

                <div className={styles.skillsGrid}>
                    {skills.map((skill, index) => (
                        <div
                            key={skill.id}
                            className={styles.skillCard}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={styles.skillIcon}>{skill.icon}</div>

                            <h3 className={styles.skillTitle}>{skill.title}</h3>

                            <p className={styles.skillDescription}>{skill.description}</p>

                            <ul className={styles.skillServices}>
                                {skill.services.map((service, idx) => (
                                    <li key={idx} className={styles.serviceItem}>
                                        <span className={styles.serviceBullet}>▸</span>
                                        {service}
                                    </li>
                                ))}
                            </ul>

                            {skill.style && (
                                <div className={styles.skillNote}>
                                    <strong>Style:</strong> {skill.style}
                                </div>
                            )}

                            {skill.advantage && (
                                <div className={styles.skillNote}>
                                    <strong>Avantage:</strong> {skill.advantage}
                                </div>
                            )}

                            {skill.expertise && (
                                <div className={styles.skillNote}>
                                    <strong>Expertise:</strong> {skill.expertise}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
