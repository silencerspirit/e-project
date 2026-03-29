import type { VNode, VNodeNormalizedChildren } from 'vue';

export type MaybeArray<T> = T | T[];
export type CSSStyleDeclarationOptional<T extends keyof CSSStyleDeclaration> = OptionalPick<CSSStyleDeclaration, T>;
export type CSSClassDeclaration = MaybeArray<string | Record<string, boolean>>;
export type VNodeArray = VNode[] | VNodeNormalizedChildren;
export type TSlot<T extends VNodeArray = VNodeArray> = T | string | undefined;
