export const BICYCLE_USAGES = ['VTT', 'Road'] as const;
export type Usage = (typeof BICYCLE_USAGES)[number];
