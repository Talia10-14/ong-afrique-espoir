'use client';

import { services } from '@/data/content';
import styles from './Services.module.css';

export default function Services() {
    return (
        <section className="section" id="services" style={{ background: 'var(--color-gray-100)' }}>
            <div className="container">
                <h2 className="section-title">Mes Services</h2>

                <div className={styles.servicesGrid}>
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className={styles.serviceCard}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={styles.serviceIcon}>{service.icon}</div>

                            <h3 className={styles.serviceTitle}>{service.title}</h3>

                            <p className={styles.serviceDescription}>{service.description}</p>

                            <ul className={styles.serviceFeatures}>
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className={styles.featureItem}>
                                        <svg className={styles.checkIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className={styles.serviceButton}>
                                En savoir plus
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
