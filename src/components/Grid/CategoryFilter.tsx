import { CATEGORIES } from '../../data/categories';

interface CategoryFilterProps {
  selected: string | null;
  onSelect: (category: string | null) => void;
}

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div role="group" aria-label="Filter by category">
      <button type="button" onClick={() => onSelect(null)} aria-pressed={selected === null}>
        All
      </button>
      {CATEGORIES.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelect(category)}
          aria-pressed={selected === category}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
