import { useState } from 'react';
import { motion } from 'framer-motion';
import type { AWSService } from '../types/service';
import { getServiceById } from '../data/services';
import ServiceGrid from '../components/Grid/ServiceGrid';
import ServiceModal from '../components/ServiceModal/ServiceModal';
import styles from './HomePage.module.css';

export default function HomePage() {
  const [selectedService, setSelectedService] = useState<AWSService | null>(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
      <div className={styles.header}>
        <h1 className={styles.title}>Service Directory</h1>
        <p className={styles.subtitle}>Search or filter by category, then click any service for the full exam-ready breakdown.</p>
      </div>
      <ServiceGrid onSelectService={setSelectedService} />
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onNavigateToService={(id) => {
          const next = getServiceById(id);
          if (next) setSelectedService(next);
        }}
      />
    </motion.div>
  );
}
