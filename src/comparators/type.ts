export type ComparatorFn = (props: { a: number, b: number }) => JSX.Element;
export type Comparator = ComparatorFn & { label: string };
