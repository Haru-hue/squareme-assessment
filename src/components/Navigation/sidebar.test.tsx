import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SideBar from './sidebar';
import { useDisclosure } from '@chakra-ui/react';

// Mock the usePathname hook
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock the icons
jest.mock('@/assets', () => ({
  DashboardIcon: () => <div>DashboardIcon</div>,
  GlobeIcon: () => <div>GlobeIcon</div>,
  SettingsIcon: () => <div>SettingsIcon</div>,
  TransactionIcon: () => <div>TransactionIcon</div>,
  TransferIcon: () => <div>TransferIcon</div>,
  WalletIcon: () => <div>WalletIcon</div>,
}));

describe('SideBar Component', () => {
  const mockUseDisclosure = useDisclosure as jest.Mock;

  beforeEach(() => {
    mockUseDisclosure.mockReturnValue({
      isOpen: false,
      onOpen: jest.fn(),
      onClose: jest.fn(),
    });
  });

  it('should render sidebar links correctly', () => {
    render(<SideBar navbarModal={mockUseDisclosure()} />);
    expect(screen.getByText('get started')).toBeInTheDocument();
    expect(screen.getByText('dashboard')).toBeInTheDocument();
    expect(screen.getByText('accounts')).toBeInTheDocument();
    expect(screen.getByText('transfers')).toBeInTheDocument();
    expect(screen.getByText('transactions')).toBeInTheDocument();
    expect(screen.getByText('settings')).toBeInTheDocument();
  });

  it('should change to mobile view when screen width is less than 991px', () => {
    window.innerWidth = 990;
    render(<SideBar navbarModal={mockUseDisclosure()} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should close the drawer when close button is clicked in mobile view', () => {
    const { onClose } = mockUseDisclosure();
    window.innerWidth = 990;
    render(<SideBar navbarModal={mockUseDisclosure()} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalled();
  });
});
