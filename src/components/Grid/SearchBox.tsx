import styles from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.prompt} aria-hidden="true">
        &gt;
      </span>
      <input
        type="text"
        placeholder="search services…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search AWS services"
        className={styles.input}
      />
    </div>
  );
}
