import { useState } from 'react';
import type { AWSService } from '../types/service';
import { getServiceById } from '../data/services';
import ServiceGrid from '../components/Grid/ServiceGrid';
import ServiceModal from '../components/ServiceModal/ServiceModal';

export default function HomePage() {
  const [selectedService, setSelectedService] = useState<AWSService | null>(null);

  return (
    <div>
      <ServiceGrid onSelectService={setSelectedService} />
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onNavigateToService={(id) => {
          const next = getServiceById(id);
          if (next) setSelectedService(next);
        }}
      />
    </div>
  );
}
