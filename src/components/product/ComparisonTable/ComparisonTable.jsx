import React from 'react';
import { Check, X } from 'lucide-react';
import styles from './ComparisonTable.module.css';

const comparisons = [
    { feature: 'Eliminates odor at source', ours: true, spray: false, replace: true, nothing: false },
    { feature: 'No chemicals or propellants', ours: true, spray: false, replace: true, nothing: true },
    { feature: 'Reusable (300+ uses)', ours: true, spray: false, replace: false, nothing: true },
    { feature: 'Works overnight', ours: true, spray: true, replace: true, nothing: false },
    { feature: 'Safe for all materials', ours: true, spray: false, replace: true, nothing: true },
    { feature: 'Eco-friendly disposal', ours: true, spray: false, replace: false, nothing: true },
    { feature: 'One-time purchase', ours: true, spray: false, replace: false, nothing: true },
    { feature: 'Cost over 2 years', ours: '$25', spray: '$120+', replace: '$200+', nothing: '$0' }
];

const ComparisonTable = () => {
    return (
        <section className={styles.comparison}>
            <h3 className={styles.title}>How We Compare</h3>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th></th>
                            <th className={styles.highlight}>SneakerFresh</th>
                            <th>Sprays</th>
                            <th>Replace Shoes</th>
                            <th>Do Nothing</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comparisons.map((row, i) => (
                            <tr key={i}>
                                <td className={styles.feature}>{row.feature}</td>
                                <td className={styles.highlight}>
                                    {typeof row.ours === 'boolean' ? (
                                        row.ours ? <Check size={18} className={styles.check} /> : <X size={18} className={styles.x} />
                                    ) : row.ours}
                                </td>
                                <td>
                                    {typeof row.spray === 'boolean' ? (
                                        row.spray ? <Check size={18} className={styles.check} /> : <X size={18} className={styles.x} />
                                    ) : row.spray}
                                </td>
                                <td>
                                    {typeof row.replace === 'boolean' ? (
                                        row.replace ? <Check size={18} className={styles.check} /> : <X size={18} className={styles.x} />
                                    ) : row.replace}
                                </td>
                                <td>
                                    {typeof row.nothing === 'boolean' ? (
                                        row.nothing ? <Check size={18} className={styles.check} /> : <X size={18} className={styles.x} />
                                    ) : row.nothing}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ComparisonTable;
