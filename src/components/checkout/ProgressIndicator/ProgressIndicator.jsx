import React from 'react';
import { Check } from 'lucide-react';
import styles from './ProgressIndicator.module.css';

const ProgressIndicator = ({
    steps = [],
    currentStep = 0,
    completedSteps = []
}) => {
    return (
        <div className={styles.progress}>
            {steps.map((step, i) => {
                const isCompleted = completedSteps.includes(i);
                const isCurrent = i === currentStep;

                return (
                    <div
                        key={i}
                        className={`${styles.step} ${isCompleted ? styles.completed : ''} ${isCurrent ? styles.current : ''}`}
                    >
                        <div className={styles.indicator}>
                            {isCompleted ? <Check size={14} /> : i + 1}
                        </div>
                        <span className={styles.label}>{step}</span>
                        {i < steps.length - 1 && <div className={styles.connector} />}
                    </div>
                );
            })}
        </div>
    );
};

export default ProgressIndicator;
