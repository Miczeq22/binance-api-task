type ExcludeNullable<T, TKey> = { [P in keyof T]: P extends TKey ? NonNullable<T[P]> : T[P] };
export const objectHasAllValues = <T, TKey extends keyof T>(
  values: T,
  ...props: TKey[]
): values is ExcludeNullable<T, TKey> => {
  for (const key of props) {
    if (values[key] === null || values[key] === undefined) {
      return false;
    }
  }

  return true;
};
