import { CATEGORIES } from '../../data/categories';
import { categoryColor } from '../../utils/categoryColor';
import styles from './CategoryFilter.module.css';

interface CategoryFilterProps {
  selected: string | null;
  onSelect: (category: string | null) => void;
}

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className={styles.group} role="group" aria-label="Filter by category">
      <button
        type="button"
        className={selected === null ? `${styles.pill} ${styles.pillActive}` : styles.pill}
        onClick={() => onSelect(null)}
        aria-pressed={selected === null}
      >
        all
      </button>
      {CATEGORIES.map((category) => (
        <button
          key={category}
          type="button"
          className={selected === category ? `${styles.pill} ${styles.pillActive}` : styles.pill}
          onClick={() => onSelect(category)}
          aria-pressed={selected === category}
        >
          <span className={styles.dot} style={{ backgroundColor: categoryColor(category) }} aria-hidden="true" />
          {category.toLowerCase()}
        </button>
      ))}
    </div>
  );
}
