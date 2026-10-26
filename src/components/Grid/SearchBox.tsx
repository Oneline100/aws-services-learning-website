import styles from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <input
      type="text"
      placeholder="Search services..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search AWS services"
      className={styles.input}
    />
  );
}
