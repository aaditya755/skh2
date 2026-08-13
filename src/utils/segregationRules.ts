/**
 * Ethylene and Commodity Segregation Utility
 * Helps prevent rapid spoilage caused by storing ethylene producers with ethylene-sensitive crops.
 */

export interface CropCompatibilityInfo {
  name: string;
  isEthyleneProducer: boolean; // Releases C2H4 gas accelerating ripening
  isEthyleneSensitive: boolean; // Susceptible to premature rotting when exposed
  odorSensitive?: boolean;
  chillingSensitive?: boolean;
}

export const CROP_COMPATIBILITY_DATABASE: Record<string, CropCompatibilityInfo> = {
  Tomatoes: { name: 'Tomatoes', isEthyleneProducer: true, isEthyleneSensitive: true },
  Mangoes: { name: 'Mangoes', isEthyleneProducer: true, isEthyleneSensitive: false },
  Apples: { name: 'Apples', isEthyleneProducer: true, isEthyleneSensitive: false, odorSensitive: false },
  Bananas: { name: 'Bananas', isEthyleneProducer: true, isEthyleneSensitive: true },
  Pears: { name: 'Pears', isEthyleneProducer: true, isEthyleneSensitive: true },
  Papayas: { name: 'Papayas', isEthyleneProducer: true, isEthyleneSensitive: true },
  Onions: { name: 'Onions', isEthyleneProducer: false, isEthyleneSensitive: true, odorSensitive: true },
  Potatoes: { name: 'Potatoes', isEthyleneProducer: false, isEthyleneSensitive: true, chillingSensitive: true },
  'Leafy Greens': { name: 'Leafy Greens', isEthyleneProducer: false, isEthyleneSensitive: true },
  Spinach: { name: 'Spinach', isEthyleneProducer: false, isEthyleneSensitive: true },
  Carrots: { name: 'Carrots', isEthyleneProducer: false, isEthyleneSensitive: true },
  Watermelon: { name: 'Watermelon', isEthyleneProducer: false, isEthyleneSensitive: true },
  Grapes: { name: 'Grapes', isEthyleneProducer: false, isEthyleneSensitive: true },
  Cucumbers: { name: 'Cucumbers', isEthyleneProducer: false, isEthyleneSensitive: true },
};

export interface SegregationWarning {
  type: 'ethylene' | 'odor' | 'temperature';
  title: string;
  description: string;
  severity: 'critical' | 'warning';
}

/**
  Checks for incompatibility between a list of crops in a single storage zone or container.
 */
export function checkZoneSegregation(crops: string[]): SegregationWarning[] {
  const warnings: SegregationWarning[] = [];
  const normalizedCrops = crops.map((c) => c.trim());

  const ethyleneProducers = normalizedCrops.filter((c) => {
    const info = CROP_COMPATIBILITY_DATABASE[c] || Object.values(CROP_COMPATIBILITY_DATABASE).find(x => x.name.toLowerCase() === c.toLowerCase());
    return info?.isEthyleneProducer;
  });

  const ethyleneSensitive = normalizedCrops.filter((c) => {
    const info = CROP_COMPATIBILITY_DATABASE[c] || Object.values(CROP_COMPATIBILITY_DATABASE).find(x => x.name.toLowerCase() === c.toLowerCase());
    return info?.isEthyleneSensitive;
  });

  // Ethylene conflict warning
  if (ethyleneProducers.length > 0 && ethyleneSensitive.length > 0) {
    warnings.push({
      type: 'ethylene',
      title: 'Ethylene Gas Incompatibility Detected',
      description: `High ethylene producer (${(ethyleneProducers || []).join(', ')}) stored with sensitive crops (${(ethyleneSensitive || []).join(', ')}). This causes accelerated yellowing, soft rots, and up to 40% premature shelf-life reduction!`,
      severity: 'critical',
    });
  }

  // Onion + Apple / Potato Odor conflict
  const hasOnions = normalizedCrops.some((c) => c.toLowerCase().includes('onion'));
  const hasApples = normalizedCrops.some((c) => c.toLowerCase().includes('apple'));
  const hasPotatoes = normalizedCrops.some((c) => c.toLowerCase().includes('potato'));

  if (hasOnions && (hasApples || hasPotatoes)) {
    warnings.push({
      type: 'odor',
      title: 'Odor Absorption Risk',
      description: `Storing Onions with ${hasApples ? 'Apples' : 'Potatoes'} causes odor absorption and promotes rapid sprouting in potatoes. Separate chambers recommended.`,
      severity: 'warning',
    });
  }

  return warnings;
}
