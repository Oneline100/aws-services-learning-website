import { motion, AnimatePresence } from 'framer-motion';
import type { AWSService } from '../../types/service';
import { getServiceById } from '../../data/services';
import { handleIconError } from '../../utils/iconFallback';
import styles from './ServiceModal.module.css';

interface ServiceModalProps {
  service: AWSService | null;
  onClose: () => void;
  onNavigateToService: (id: string) => void;
}

export default function ServiceModal({ service, onClose, onNavigateToService }: ServiceModalProps) {
  return (
    <AnimatePresence>
      {service && (
        <motion.div
          className={styles.overlay}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <motion.div
            className={styles.panel}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.header}>
              <div className={styles.iconChip}>
                <img
                  src={service.iconPath}
                  alt={service.name}
                  className={styles.icon}
                  onError={handleIconError}
                />
              </div>
              <div className={styles.headerText}>
                <span className={styles.id}>{service.id}</span>
                <h2>{service.name}</h2>
                <p className={styles.tagline}>{service.tagline}</p>
              </div>
              <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close">
                ✕
              </button>
            </div>

            <div className={styles.body}>
              <div className={styles.section}>
                <div className={styles.sectionTitle}>01 — Category</div>
                <p>{service.category}</p>
              </div>

              <div className={styles.section}>
                <div className={styles.sectionTitle}>02 — Description</div>
                <p>{service.description}</p>
              </div>

              <div className={styles.section}>
                <div className={styles.sectionTitle}>03 — Key Features</div>
                <ul>
                  {service.keyFeatures.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.section}>
                <div className={styles.sectionTitle}>04 — Common Use Cases</div>
                <ul>
                  {service.useCases.map((useCase) => (
                    <li key={useCase}>{useCase}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.section}>
                <div className={styles.sectionTitle}>05 — Exam Notes</div>
                <ul>
                  {service.examNotes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.section}>
                <div className={styles.sectionTitle}>06 — Related Services</div>
                {service.relatedServices.map((relatedId) => {
                  const related = getServiceById(relatedId);
                  if (!related) return null;
                  return (
                    <button
                      key={relatedId}
                      type="button"
                      className={styles.relatedButton}
                      onClick={() => onNavigateToService(relatedId)}
                    >
                      {related.name}
                    </button>
                  );
                })}
              </div>

              <div className={styles.section}>
                <div className={styles.sectionTitle}>07 — Pricing Model</div>
                <p className={styles.pricing}>{service.pricingModel}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
