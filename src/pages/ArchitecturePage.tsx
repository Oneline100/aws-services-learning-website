import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { AWSService } from '../types/service';
import { ALL_ARCHITECTURES, getArchitectureById } from '../data/architectures';
import { getServiceById } from '../data/services';
import DiagramCanvas from '../components/Diagram/DiagramCanvas';
import ServiceModal from '../components/ServiceModal/ServiceModal';
import styles from './ArchitecturePage.module.css';

export default function ArchitecturePage() {
  const { demoId } = useParams();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<AWSService | null>(null);

  const activeDemo = demoId ? getArchitectureById(demoId) : ALL_ARCHITECTURES[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={styles.page}
    >
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTitle}>§ 14 Demos</div>
        <ul className={styles.list}>
          {ALL_ARCHITECTURES.map((demo, index) => (
            <li key={demo.id}>
              <button
                type="button"
                onClick={() => navigate(`/architecture/${demo.id}`)}
                className={activeDemo?.id === demo.id ? `${styles.item} ${styles.itemActive}` : styles.item}
              >
                <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                {demo.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {activeDemo && (
        <div className={styles.main}>
          <span className={styles.eyebrow}>§ Architecture Demo</span>
          <h2 className={styles.title}>{activeDemo.title}</h2>
          <p className={styles.description}>{activeDemo.description}</p>
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
