import { useState } from 'react';
import { motion } from 'framer-motion';
import type { AWSService } from '../types/service';
import { getServiceById } from '../data/services';
import ServiceGrid from '../components/Grid/ServiceGrid';
import ServiceModal from '../components/ServiceModal/ServiceModal';

export default function HomePage() {
  const [selectedService, setSelectedService] = useState<AWSService | null>(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
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
