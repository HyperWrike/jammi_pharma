import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Silence console output that clutters test output
vi.spyOn(console, 'error').mockImplementation(() => {});
vi.spyOn(console, 'warn').mockImplementation(() => {});
vi.spyOn(console, 'log').mockImplementation(() => {});
