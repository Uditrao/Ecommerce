import React, { useState } from 'react';
import styles from './ProductTabs.module.css';

const tabs = [
    {
        id: 'specs',
        label: 'Specifications',
        content: [
            { label: 'Dimensions', value: '4" x 2.5" x 1" per pack' },
            { label: 'Weight', value: '2 oz per pack' },
            { label: 'Coverage', value: 'One pack per shoe (pair = 2 packs)' },
            { label: 'Lifespan', value: '2+ years with monthly recharging' },
            { label: 'Uses', value: '300+ uses per pack' }
        ]
    },
    {
        id: 'materials',
        label: 'Materials',
        content: [
            { label: 'Active Ingredients', value: 'Volcanic zeolite minerals, moso bamboo charcoal' },
            { label: 'Outer Shell', value: '100% organic cotton, undyed' },
            { label: 'Stitching', value: 'Biodegradable cotton thread' },
            { label: 'Packaging', value: 'FSC-certified recycled cardboard, soy-based inks' }
        ]
    },
    {
        id: 'care',
        label: 'Care Instructions',
        content: [
            { label: 'Daily Use', value: 'Insert in shoes after wearing, remove before wearing' },
            { label: 'Recharging', value: 'Place in direct sunlight for 1-2 hours monthly' },
            { label: 'Storage', value: 'Keep dry when not in use' },
            { label: 'End of Life', value: 'Compost or dispose in garden after 2+ years' }
        ]
    }
];

const ProductTabs = () => {
    const [active, setActive] = useState('specs');
    const activeTab = tabs.find(t => t.id === active);

    return (
        <section className={styles.tabs}>
            <div className={styles.tabList}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`${styles.tab} ${active === tab.id ? styles.active : ''}`}
                        onClick={() => setActive(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className={styles.content}>
                <table className={styles.table}>
                    <tbody>
                        {activeTab.content.map((row, i) => (
                            <tr key={i}>
                                <th>{row.label}</th>
                                <td>{row.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ProductTabs;
