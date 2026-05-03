import type { VNode, VNodeNormalizedChildren } from 'vue';

export type MaybeArray<T> = T | T[];
export type CSSStyleDeclarationOptional<T extends keyof CSSStyleDeclaration> = OptionalPick<CSSStyleDeclaration, T>;
export type CSSClassDeclaration = MaybeArray<Record<string, boolean> | string>;
export type VNodeArray = VNode[] | VNodeNormalizedChildren;
export type TSlot<T extends VNodeArray = VNodeArray> = string | T | undefined;
