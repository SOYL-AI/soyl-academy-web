'use client';

/**
 * Shipping address for a merch redemption (ADR-020 §5–6). Shown only for a physical redemption the API
 * created in `requested` (verified account, parent consent and redemption switched on). Validation
 * mirrors the API's ShippingAddressSchema; the API re-checks everything. The address is used only to send
 * this order and is erased after delivery (PII.md).
 */
import { useState, type FormEvent } from 'react';
import type { CoinRedemption } from '@/platform/shared/api-client';
import { COIN_STORE, INDIA_STATES } from '@/platform/shared/config/coins';
import { Button } from '@/components/platform/ui/kit/Button';
import { Field, TextInput } from '@/components/platform/ui/kit/Field';
import inputStyles from '@/components/platform/ui/kit/Interactive.module.css';
import { api } from '../lib/api-browser';
import { ADDRESS_LIMITS, coinsProblemMessage, EMPTY_ADDRESS, validateAddress, type AddressDraft, type AddressField } from './coins-logic';
import s from './store.module.css';

export function AddressForm({ redemption, onSaved, onCancel }: { redemption: Pick<CoinRedemption, 'id' | 'itemName'>; onSaved: (r: CoinRedemption) => void; onCancel?: () => void }) {
  const [draft, setDraft] = useState<AddressDraft>(EMPTY_ADDRESS);
  const [errors, setErrors] = useState<Partial<Record<AddressField, string>>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const set = (f: AddressField) => (e: { target: { value: string } }) => setDraft((d) => ({ ...d, [f]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const { value, errors: errs } = validateAddress(draft);
    setErrors(errs);
    if (!value) {
      setError('Please check the highlighted fields.');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const r = await api.put('/v1/coins/redemptions/{id}/address', { params: { id: redemption.id }, body: value });
      onSaved(r);
    } catch (err) {
      setError(coinsProblemMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className={s.addressForm} onSubmit={(e) => void submit(e)} noValidate data-testid="address-form" aria-label={`Delivery address for ${redemption.itemName}`}>
      <p className={s.formNote}>
        We use this address only to send your {redemption.itemName}. A parent or guardian approves the order first, and we delete the address {COIN_STORE.addressRetentionDaysAfterFulfilment} days after delivery. Without an
        address in {COIN_STORE.addressDeadlineDays} days the order is cancelled and your coins come back.
      </p>
      <TextInput label="Recipient’s name" required autoComplete="name" maxLength={ADDRESS_LIMITS.recipientName} value={draft.recipientName} onChange={set('recipientName')} error={errors.recipientName} />
      <TextInput label="Address line 1" hint="House, building, street" required autoComplete="address-line1" maxLength={ADDRESS_LIMITS.line1} value={draft.line1} onChange={set('line1')} error={errors.line1} />
      <TextInput label="Address line 2 (optional)" hint="Area, landmark" autoComplete="address-line2" maxLength={ADDRESS_LIMITS.line2} value={draft.line2} onChange={set('line2')} error={errors.line2} />
      <TextInput label="City or town" required autoComplete="address-level2" maxLength={ADDRESS_LIMITS.city} value={draft.city} onChange={set('city')} error={errors.city} />
      <Field label="State or union territory" required error={errors.state}>
        {(control) => (
          <select {...control} className={inputStyles.input} autoComplete="address-level1" value={draft.state} onChange={set('state')}>
            <option value="">Choose…</option>
            {INDIA_STATES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        )}
      </Field>
      <TextInput label="PIN code" required inputMode="numeric" autoComplete="postal-code" maxLength={6} value={draft.pincode} onChange={set('pincode')} error={errors.pincode} />
      <TextInput
        label="Mobile number for the courier"
        hint="10 digits; +91 is added for you"
        required
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        maxLength={16}
        value={draft.phone}
        onChange={set('phone')}
        error={errors.phone}
      />
      {error && (
        <p className={s.errorText} role="alert">
          {error}
        </p>
      )}
      <div className={s.formActions}>
        <Button type="submit" loading={busy} data-testid="address-submit">
          Save address
        </Button>
        {onCancel && (
          <Button variant="ghost" onClick={onCancel}>
            Later
          </Button>
        )}
      </div>
    </form>
  );
}
