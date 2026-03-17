export type MaybeArray<T> = T | T[];
export type CSSStyleDeclarationOptional<T extends keyof CSSStyleDeclaration> = OptionalPick<CSSStyleDeclaration, T>;
export type CSSClassDeclaration = MaybeArray<string | Record<string, boolean>>;
