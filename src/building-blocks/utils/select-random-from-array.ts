export function selectRandomFromArray<ArrayType>(items: ArrayType[]): ArrayType {
  return items[Math.floor(Math.random() * items.length)];
}
