// src/hooks/useAutoRefresh.ts

import { useEffect, useRef, useState } from 'react';

interface UseAutoRefreshOptions {
  /**
   * Refresh interval in milliseconds
   * Default: 30000 (30 seconds)
   */
  interval?: number;
  
  /**
   * Enable/disable auto-refresh
   * Default: true
   */
  enabled?: boolean;
  
  /**
   * Callback function to execute on refresh
   */
  onRefresh: () => void | Promise<void>;
}

/**
 * Custom hook for auto-refreshing data at specified intervals
 * Refreshes only the specific component, not the entire page
 * 
 * @example
 * const { isRefreshing, manualRefresh } = useAutoRefresh({
 *   interval: 30000, // 30 seconds
 *   onRefresh: fetchData,
 *   enabled: true
 * });
 */
export const useAutoRefresh = ({
  interval = 30000,
  enabled = true,
  onRefresh,
}: UseAutoRefreshOptions) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Execute refresh callback
   */
  const executeRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } catch (error) {
      console.error('Auto-refresh error:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  /**
   * Manual refresh trigger
   */
  const manualRefresh = () => {
    executeRefresh();
  };

  /**
   * Setup auto-refresh interval
   */
  useEffect(() => {
    if (!enabled) {
      return;
    }

    // Execute immediately on mount
    executeRefresh();

    // Setup interval
    intervalRef.current = setInterval(() => {
      executeRefresh();
    }, interval);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled, interval]); // Re-run if enabled or interval changes

  return {
    isRefreshing,
    manualRefresh,
  };
};