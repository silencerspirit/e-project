export const imagesPopulate = {
  images: {
    populate: {
      image: {
        fields: ['url', 'alternativeText'],
      },
    },
  },
} as const;
