import React from 'react';
import styles from './WhyItWorks.module.css';

const WhyItWorks = () => {
    return (
        <section className={styles.section}>
            <h3 className={styles.title}>The Science Behind It</h3>
            <div className={styles.content}>
                <div className={styles.text}>
                    <p>
                        <strong>Volcanic Zeolite Minerals</strong> have a unique microporous structure with millions of tiny cavities.
                        These cavities trap ammonia, bacteria, and moisture molecules through a process called adsorption -
                        physically binding odor molecules to the mineral surface.
                    </p>
                    <p>
                        <strong>Moso Bamboo Charcoal</strong> has an even larger surface area (up to 3x more than regular charcoal),
                        actively absorbing excess moisture that causes bacterial growth. Together, they attack odor at both causes:
                        bacteria and dampness.
                    </p>
                    <p>
                        <strong>UV Recharging:</strong> Sunlight breaks down the trapped odor molecules through photocatalysis,
                        releasing them as harmless gases and restoring the minerals' absorption capacity. This is why monthly
                        sun exposure keeps your packs working for years.
                    </p>
                </div>
                <div className={styles.visual}>
                    <div className={styles.diagram}>
                        <div className={styles.layer}>
                            <span className={styles.layerLabel}>Odor molecules</span>
                            <div className={styles.molecules}></div>
                        </div>
                        <div className={styles.layer}>
                            <span className={styles.layerLabel}>Mineral structure</span>
                            <div className={styles.structure}></div>
                        </div>
                        <div className={styles.layer}>
                            <span className={styles.layerLabel}>Trapped &amp; neutralized</span>
                            <div className={styles.trapped}></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyItWorks;
