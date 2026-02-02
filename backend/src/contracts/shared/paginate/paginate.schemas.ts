import { DEFAULT_PAGINATE_LIMIT } from '@/utils';
import { minValue, number, object, optional, pipe, string, transform } from 'valibot';

export const PaginateSchema = pipe(
  object({
    page: optional(string()),
    total: pipe(number(), minValue(0)),
  }),

  transform(({ page, total }) => {
    const raw = Number(page);
    const normalizedPage = Number.isFinite(raw) ? Math.max(1, Math.trunc(raw)) : 1;

    const totalItems = total;
    const totalPages = totalItems === 0 ? 0 : Math.ceil(totalItems / DEFAULT_PAGINATE_LIMIT);

    return {
      page: normalizedPage,
      totalItems,
      totalPages,
    };
  }),
);
