import styled from 'styled-components';
import { devices } from './common.styles';

export const AlertsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

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

export const Label = styled.label`
  font-size: 0.7rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
`;

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
`;

export const AlertTitle = styled.span`
  font-weight: 700;
  color: #fff;
  font-size: 1.05rem;
  letter-spacing: -0.3px;
`;

export const AlertCondition = styled.span`
  font-size: 0.85rem;
  color: #64748b;
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
  gap: 14px;

  @media ${devices.mobileL} {
    width: 100%;
    justify-content: space-between;
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
