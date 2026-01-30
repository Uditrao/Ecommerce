import React from 'react';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import styles from './ShippingForm.module.css';

const ShippingForm = ({
    values = {},
    onChange,
    onSubmit,
    errors = {},
    loading = false
}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...values, [name]: value });
    };

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.row}>
                <Input
                    label="First Name"
                    name="firstName"
                    value={values.firstName || ''}
                    onChange={handleChange}
                    error={errors.firstName}
                    required
                />
                <Input
                    label="Last Name"
                    name="lastName"
                    value={values.lastName || ''}
                    onChange={handleChange}
                    error={errors.lastName}
                    required
                />
            </div>

            <Input
                label="Email"
                name="email"
                type="email"
                value={values.email || ''}
                onChange={handleChange}
                error={errors.email}
                required
            />

            <Input
                label="Address"
                name="address"
                value={values.address || ''}
                onChange={handleChange}
                error={errors.address}
                required
            />

            <div className={styles.row}>
                <Input
                    label="City"
                    name="city"
                    value={values.city || ''}
                    onChange={handleChange}
                    error={errors.city}
                    required
                />
                <Input
                    label="State/Province"
                    name="state"
                    value={values.state || ''}
                    onChange={handleChange}
                    error={errors.state}
                    required
                />
                <Input
                    label="ZIP/Postal Code"
                    name="zip"
                    value={values.zip || ''}
                    onChange={handleChange}
                    error={errors.zip}
                    required
                />
            </div>

            <Button type="submit" loading={loading} fullWidth size="lg">
                Continue to Payment
            </Button>
        </form>
    );
};

export default ShippingForm;
