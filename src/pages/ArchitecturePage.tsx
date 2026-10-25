import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { AWSService } from '../types/service';
import { ALL_ARCHITECTURES, getArchitectureById } from '../data/architectures';
import { getServiceById } from '../data/services';
import DiagramCanvas from '../components/Diagram/DiagramCanvas';
import ServiceModal from '../components/ServiceModal/ServiceModal';

export default function ArchitecturePage() {
  const { demoId } = useParams();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<AWSService | null>(null);

  const activeDemo = demoId ? getArchitectureById(demoId) : ALL_ARCHITECTURES[0];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem 2rem' }}>
      <aside style={{ minWidth: 220 }}>
        <h2>Architecture Demos</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {ALL_ARCHITECTURES.map((demo) => (
            <li key={demo.id}>
              <button
                type="button"
                onClick={() => navigate(`/architecture/${demo.id}`)}
                style={{ fontWeight: activeDemo?.id === demo.id ? 700 : 400 }}
              >
                {demo.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {activeDemo && (
        <div style={{ flex: 1 }}>
          <h2>{activeDemo.title}</h2>
          <p>{activeDemo.description}</p>
          <DiagramCanvas
            demo={activeDemo}
            onSelectService={(id) => {
              const service = getServiceById(id);
              if (service) setSelectedService(service);
            }}
          />
        </div>
      )}

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
