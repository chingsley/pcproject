import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { FiPrinter, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { DEMO_MODE_CERTIFICATE_NAVIGATION, type CertificateLevel } from '../../constants/certificate.constants';
import { IMAGES } from '../../constants/images.constants';
import { COLORS } from '../../constants/colors.constants';
import { FONTS } from '../../constants/fonts.constants';
import { LAYOUT } from '../../constants/layout.constants';
import { SPACING } from '../../constants/spacing.constants';

const PrintGlobalStyles = createGlobalStyle`
  @media print {
    .certificate-print-toolbar {
      display: none !important;
    }

    body * {
      visibility: hidden;
    }

    #certificate-print-surface,
    #certificate-print-surface * {
      visibility: visible;
    }

    #certificate-print-surface {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: auto;
      max-width: none;
      object-fit: contain;
    }
  }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${LAYOUT.CERTIFICATE_PRINT_MODAL_Z_INDEX};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${SPACING.BUTTON_PADDING_X};
  background: ${COLORS.MODAL_BACKDROP};
  box-sizing: border-box;
`;

const DialogWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${SPACING.BUTTON_PADDING_Y};
`;

const Toolbar = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: ${SPACING.BUTTON_PADDING_Y};
`;

const VisuallyHidden = styled.span`
  position: absolute;
  width: 0.0625rem;
  height: 0.0625rem;
  padding: 0;
  margin: -0.0625rem;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const ToolbarButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${SPACING.BUTTON_PADDING_Y};
  padding: ${SPACING.BUTTON_PADDING_Y} ${SPACING.BUTTON_PADDING_X};
  border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  border-radius: ${SPACING.RADIUS_SMALLER};
  background: ${COLORS.SURFACE_OVERLAY_LIGHT};
  color: ${COLORS.TEXT_PRIMARY};
  cursor: pointer;
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.MEDIUM};
  font-weight: ${FONTS.WEIGHT.MEDIUM};
  transition:
    background 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    background: ${COLORS.SURFACE_OVERLAY_MEDIUM};
    border-color: ${COLORS.BORDER_SUBTLE_HOVER};
  }

  &:focus-visible {
    outline: ${SPACING.BORDER_WIDTH} solid ${COLORS.STAR_ACCENT};
    outline-offset: 0.125rem;
  }
`;

const DragContainer = styled.div`
  width: 50vw;
  height: auto;
  position: relative;
  cursor: grab;
  touch-action: none;
  
  &:active {
    cursor: grabbing;
  }

  @media (max-width: ${LAYOUT.BREAKPOINTS.LARGE}) {
    width: 80vw;
  }
`;

const ImagePreview = styled.img`
  width: 100%;
  height: auto;
  border-radius: ${SPACING.RADIUS_SMALLER};
  box-shadow: 0 1rem 2rem ${COLORS.MODAL_SHADOW};
  pointer-events: none;
  display: block;
`;

export interface CertificatePrintModalProps {
  open: boolean;
  level: CertificateLevel;
  onClose: () => void;
}

const getCertificateImage = (level: CertificateLevel) => {
  switch (level) {
    case 1:
      return IMAGES.CERT_EXPLORER;
    case 2:
      return IMAGES.CERT_THINKER;
    case 3:
      return IMAGES.CERT_CREATOR;
    case 4:
      return IMAGES.CERT_LEADER;
    case 5:
      return IMAGES.CERT_GATEKEEPER;
    default:
      return IMAGES.CERT_EXPLORER;
  }
};

const CertificatePrintModal = ({
  open,
  level,
  onClose,
}: CertificatePrintModalProps) => {
  const printBtnRef = useRef<HTMLButtonElement>(null);
  
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const [currentLevel, setCurrentLevel] = useState<CertificateLevel>(level);

  useEffect(() => {
    if (open) {
      setCurrentLevel(level);
      const timer = setTimeout(() => {
        setPos({ x: 0, y: 0 });
        setIsDragging(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) printBtnRef.current?.focus();
  }, [open]);

  const handlePrint = () => {
    window.print();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPos({
      x: e.clientX - dragStartPos.current.x,
      y: e.clientY - dragStartPos.current.y,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  if (!open) return null;

  const titleId = 'certificate-print-dialog-title';
  const imageUrl = getCertificateImage(currentLevel);

  const handlePrevLevel = () => {
    setCurrentLevel((prev) => (prev > 1 ? (prev - 1) as CertificateLevel : 5 as CertificateLevel));
  };

  const handleNextLevel = () => {
    setCurrentLevel((prev) => (prev < 5 ? (prev + 1) as CertificateLevel : 1 as CertificateLevel));
  };

  const node = (
    <>
      <PrintGlobalStyles />
      <Backdrop
        role="presentation"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <DialogWrapper
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={(e) => e.stopPropagation()}
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        >
          <VisuallyHidden id={titleId}>Certificate preview</VisuallyHidden>
          <Toolbar className="certificate-print-toolbar">
            {DEMO_MODE_CERTIFICATE_NAVIGATION && (
              <>
                <ToolbarButton type="button" onClick={handlePrevLevel} aria-label="Previous certificate">
                  <FiChevronLeft size={18} aria-hidden />
                </ToolbarButton>
                <ToolbarButton type="button" onClick={handleNextLevel} aria-label="Next certificate">
                  <FiChevronRight size={18} aria-hidden />
                </ToolbarButton>
              </>
            )}
            <ToolbarButton type="button" ref={printBtnRef} onClick={handlePrint}>
              <FiPrinter size={18} aria-hidden />
              Print
            </ToolbarButton>
            <ToolbarButton type="button" onClick={onClose} aria-label="Close certificate">
              <FiX size={18} aria-hidden />
              Close
            </ToolbarButton>
          </Toolbar>
          
          <DragContainer
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <ImagePreview 
              id="certificate-print-surface" 
              src={imageUrl} 
              alt={`Certificate for level ${level}`} 
            />
          </DragContainer>
        </DialogWrapper>
      </Backdrop>
    </>
  );

  return createPortal(node, document.body);
};

export default CertificatePrintModal;