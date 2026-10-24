import type { AWSService } from '../types/service';

export function filterServices(
  services: AWSService[],
  query: string,
  category: string | null
): AWSService[] {
  const normalizedQuery = query.trim().toLowerCase();

  return services.filter((service) => {
    const matchesCategory = !category || service.category === category;
    const matchesQuery =
      normalizedQuery === '' ||
      service.name.toLowerCase().includes(normalizedQuery) ||
      service.tagline.toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });
}
