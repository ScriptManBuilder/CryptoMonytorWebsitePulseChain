import styled, { keyframes } from 'styled-components';
import { devices } from './common.styles';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const AlertsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

/* ─── Alert Type Tabs ─── */
export const AlertTypeTabs = styled.div`
  display: flex;
  gap: 4px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 14px;
  padding: 4px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  width: fit-content;

  @media ${devices.mobileL} {
    width: 100%;
  }
`;

export const AlertTypeTab = styled.button<{ $active: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  background: ${({ $active }) =>
    $active
      ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.3) 0%, rgba(0, 212, 255, 0.15) 100%)'
      : 'transparent'};
  color: ${({ $active }) => ($active ? '#e2e8f0' : '#64748b')};
  border: 1px solid ${({ $active }) =>
    $active ? 'rgba(124, 58, 237, 0.3)' : 'transparent'};

  &:hover {
    color: #e2e8f0;
    background: ${({ $active }) =>
      $active
        ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.3) 0%, rgba(0, 212, 255, 0.15) 100%)'
        : 'rgba(255, 255, 255, 0.05)'};
  }

  @media ${devices.mobileL} {
    flex: 1;
    padding: 8px 12px;
    font-size: 0.8rem;
  }
`;

/* ─── Form ─── */
export const AlertForm = styled.form`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: flex-end;
  padding: 28px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.4), rgba(0, 212, 255, 0.4), transparent);
  }

  @media ${devices.tablet} {
    padding: 24px;
    gap: 14px;
  }

  @media ${devices.mobileL} {
    padding: 20px;
    flex-direction: column;
    gap: 16px;
  }
`;

export const FormRow = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  flex-wrap: wrap;
  align-items: flex-end;

  @media ${devices.mobileL} {
    flex-direction: column;
    gap: 16px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 160px;

  @media ${devices.mobileL} {
    width: 100%;
    min-width: 100%;
  }
`;

export const FormGroupWide = styled(FormGroup)`
  min-width: 100%;
`;

export const Label = styled.label`
  font-size: 0.7rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
`;

export const NoteInput = styled.input`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px 16px;
  color: #e2e8f0;
  font-size: 0.9rem;
  transition: all 0.25s ease;
  width: 100%;

  &:focus {
    outline: none;
    border-color: rgba(124, 58, 237, 0.4);
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
  }

  &::placeholder {
    color: #475569;
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 0.85rem;
  color: #94a3b8;
  padding: 8px 0;
  user-select: none;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: #7c3aed;
    cursor: pointer;
  }

  &:hover {
    color: #e2e8f0;
  }
`;

/* ─── Section Headers ─── */
export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  @media ${devices.mobileL} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #e2e8f0;
  display: flex;
  align-items: center;
  gap: 10px;
  letter-spacing: -0.3px;
`;

export const AlertCount = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(0, 212, 255, 0.1) 100%);
  color: #a78bfa;
  border: 1px solid rgba(124, 58, 237, 0.2);
`;

/* ─── Filter Bar ─── */
export const AlertFilterBar = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  @media ${devices.mobileL} {
    width: 100%;
  }
`;

export const FilterChip = styled.button<{ $active: boolean }>`
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid ${({ $active }) =>
    $active ? 'rgba(124, 58, 237, 0.4)' : 'rgba(255, 255, 255, 0.08)'};
  background: ${({ $active }) =>
    $active
      ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(0, 212, 255, 0.1) 100%)'
      : 'rgba(255, 255, 255, 0.03)'};
  color: ${({ $active }) => ($active ? '#a78bfa' : '#64748b')};

  &:hover {
    border-color: rgba(124, 58, 237, 0.3);
    color: #a78bfa;
  }
`;

/* ─── Alert List ─── */
export const AlertsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const AlertItem = styled.div<{ $active: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
  border-radius: 18px;
  border: 1px solid ${({ $active }) =>
    $active ? 'rgba(124, 58, 237, 0.2)' : 'rgba(255, 255, 255, 0.04)'};
  opacity: ${({ $active }) => ($active ? 1 : 0.6)};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.3s ease;

  ${({ $active }) =>
    $active &&
    `
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: linear-gradient(180deg, #7c3aed, #00d4ff);
    }
  `}

  &:hover {
    border-color: rgba(124, 58, 237, 0.3);
    transform: translateX(4px);
  }

  @media ${devices.mobileL} {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 18px 20px;
  }
`;

export const AlertInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

export const AlertTitle = styled.span`
  font-weight: 700;
  color: #fff;
  font-size: 1.05rem;
  letter-spacing: -0.3px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const AlertTypeBadge = styled.span<{ $type: string }>`
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 3px 8px;
  border-radius: 6px;
  background: ${({ $type }) =>
    $type === 'percentage_change'
      ? 'rgba(234, 179, 8, 0.15)'
      : 'rgba(59, 130, 246, 0.15)'};
  color: ${({ $type }) =>
    $type === 'percentage_change' ? '#facc15' : '#60a5fa'};
  border: 1px solid ${({ $type }) =>
    $type === 'percentage_change'
      ? 'rgba(234, 179, 8, 0.3)'
      : 'rgba(59, 130, 246, 0.3)'};
`;

export const AlertCondition = styled.span`
  font-size: 0.85rem;
  color: #64748b;
`;

export const AlertNote = styled.span`
  font-size: 0.8rem;
  color: #475569;
  font-style: italic;
  margin-top: 2px;
`;

export const AlertMeta = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 4px;
  flex-wrap: wrap;
`;

export const AlertMetaTag = styled.span`
  font-size: 0.7rem;
  color: #475569;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const AlertStatus = styled.span<{ $active: boolean }>`
  padding: 6px 14px;
  border-radius: 30px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: ${({ $active }) =>
    $active
      ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%)'
      : 'linear-gradient(135deg, rgba(156, 163, 175, 0.2) 0%, rgba(156, 163, 175, 0.1) 100%)'};
  color: ${({ $active }) => ($active ? '#4ade80' : '#9ca3af')};
  border: 1px solid ${({ $active }) =>
    $active ? 'rgba(34, 197, 94, 0.3)' : 'rgba(156, 163, 175, 0.2)'};
`;

export const AlertActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media ${devices.mobileL} {
    width: 100%;
    justify-content: space-between;
  }
`;

export const ToggleButton = styled.button<{ $active: boolean }>`
  background: ${({ $active }) =>
    $active
      ? 'rgba(34, 197, 94, 0.15)'
      : 'rgba(234, 179, 8, 0.15)'};
  border: 1px solid ${({ $active }) =>
    $active
      ? 'rgba(34, 197, 94, 0.3)'
      : 'rgba(234, 179, 8, 0.3)'};
  color: ${({ $active }) => ($active ? '#4ade80' : '#facc15')};
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 10px;
  transition: all 0.25s ease;
  font-size: 0.8rem;
  font-weight: 600;

  &:hover {
    transform: scale(1.05);
  }
`;

export const DeleteButton = styled.button`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #f87171;
  cursor: pointer;
  padding: 10px 14px;
  border-radius: 12px;
  transition: all 0.3s ease;
  font-size: 1rem;

  &:hover {
    background: rgba(239, 68, 68, 0.2);
    border-color: rgba(239, 68, 68, 0.4);
    transform: scale(1.05);
  }
`;

export const ClearButton = styled.button`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #f87171;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.25s ease;

  &:hover {
    background: rgba(239, 68, 68, 0.2);
    border-color: rgba(239, 68, 68, 0.4);
  }
`;

export const EmptyAlerts = styled.div`
  text-align: center;
  padding: 60px 24px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 24px;
  border: 2px dashed rgba(255, 255, 255, 0.08);
  color: #64748b;

  p {
    margin: 0;
    line-height: 1.6;
  }

  @media ${devices.mobileL} {
    padding: 48px 20px;
  }
`;

/* ─── Notification Banner ─── */
export const NotificationBanner = styled.div<{ $enabled: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: ${({ $enabled }) =>
    $enabled
      ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)'
      : 'linear-gradient(135deg, rgba(234, 179, 8, 0.1) 0%, rgba(234, 179, 8, 0.05) 100%)'};
  border: 1px solid ${({ $enabled }) =>
    $enabled ? 'rgba(34, 197, 94, 0.25)' : 'rgba(234, 179, 8, 0.25)'};
  border-radius: 18px;
  position: relative;
  overflow: hidden;

  ${({ $enabled }) =>
    $enabled &&
    `
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: #22c55e;
    }
  `}

  @media ${devices.mobileL} {
    flex-direction: column;
    gap: 16px;
    text-align: center;
    padding: 18px 20px;
  }
`;

export const BannerText = styled.span`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #e2e8f0;
  font-size: 0.95rem;

  @media ${devices.mobileL} {
    font-size: 0.9rem;
    text-align: center;
    justify-content: center;
  }
`;

/* ─── Triggered Alert Toast ─── */
export const TriggeredBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(234, 179, 8, 0.08) 100%);
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: 16px;
  color: #fca5a5;
  font-size: 0.9rem;
  animation: ${fadeIn} 0.4s ease;

  span {
    font-weight: 700;
  }
`;

/* ─── History Section ─── */
export const HistorySection = styled.div`
  margin-top: 8px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

export const HistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.04);
  opacity: 0.7;

  &:hover {
    opacity: 0.9;
  }

  @media ${devices.mobileL} {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 14px 16px;
  }
`;
