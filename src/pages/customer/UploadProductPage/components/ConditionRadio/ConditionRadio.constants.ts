import { ProductQuality } from "../../../../../types/enum/productQuality.enum";

export const conditions = [
    {
      value: ProductQuality.New,
      label: 'New',
      description: 'Item comes with tags, has not been opened from its box/package, and has not been used.',
      color: 'blue',
    },
    {
      value: ProductQuality.LikeNew,
      label: 'Like New',
      description: 'Item comes with tags, has been opened from its package/box, and has not been used.',
      color: 'gray',
    },
    {
      value: ProductQuality.Good,
      label: 'Good',
      description: 'Used, fully functional, and works well (may have some minor scratches).',
      color: 'gray',
    },
    {
      value: ProductQuality.Average,
      label: 'Average',
      description: 'Used item, fully functional, with several flaws or minor defects.',
      color: 'gray',
    },
    {
      value: ProductQuality.Old,
      label: 'Old',
      description: 'Used. Many flaws. May be damaged (details to be provided if damaged).',
      color: 'gray',
    },
  ];