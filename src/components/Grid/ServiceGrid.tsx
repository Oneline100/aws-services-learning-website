import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { AWSService } from '../../types/service';
import { ALL_SERVICES } from '../../data/services';
import { filterServices } from '../../utils/search';
import { handleIconError } from '../../utils/iconFallback';
import SearchBox from './SearchBox';
import CategoryFilter from './CategoryFilter';
import styles from './ServiceGrid.module.css';

interface ServiceGridProps {
  onSelectService: (service: AWSService) => void;
}

export default function ServiceGrid({ onSelectService }: ServiceGridProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);

  const visibleServices = useMemo(
    () => filterServices(ALL_SERVICES, query, category),
    [query, category]
  );

  return (
    <div>
      <div className={styles.toolbar}>
        <SearchBox value={query} onChange={setQuery} />
        <CategoryFilter selected={category} onSelect={setCategory} />
      </div>
      <div className={styles.grid}>
        {visibleServices.map((service, index) => (
          <motion.div
            key={service.id}
            className={styles.card}
            onClick={() => onSelectService(service)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.4) }}
          >
            <img
              src={service.iconPath}
              alt={service.name}
              className={styles.icon}
              onError={handleIconError}
            />
            <span className={styles.name}>{service.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
