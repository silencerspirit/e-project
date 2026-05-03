interface EnvFn {
  (key: string, defaultValue?: string): string;
  array: (key: string, defaultValue?: string[]) => string[];
  bool: (key: string, defaultValue?: boolean) => boolean;
  int: (key: string, defaultValue?: number) => number;
}
