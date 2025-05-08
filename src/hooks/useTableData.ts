import { useState, useCallback, useEffect, useRef } from 'react';

interface PaginationData {
  total: number;
  totalPages: number;
  current: number;
}

interface UseTableDataProps<T> {
  fetchData: (page: number, search: string) => Promise<{
    data: T[];
    pagination: {
      total: number;
      totalPages: number;
    };
  }>;
  initialPage?: number;
  initialSearch?: string;
}

interface UseTableDataReturn<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  pagination: PaginationData;
  handleSearch: (value: string) => void;
  handlePageChange: (page: number) => void;
  refreshData: () => Promise<void>;
}

function useTableData<T>({
  fetchData,
  initialPage = 1,
  initialSearch = ''
}: UseTableDataProps<T>): UseTableDataReturn<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    totalPages: 0,
    current: initialPage,
  });

  // Use refs to store the latest values without causing re-renders
  const fetchDataRef = useRef(fetchData);
  const searchTermRef = useRef(searchTerm);
  const paginationRef = useRef(pagination);

  // Update refs when values change
  useEffect(() => {
    fetchDataRef.current = fetchData;
    searchTermRef.current = searchTerm;
    paginationRef.current = pagination;
  });

  const loadData = useCallback(async (page: number, search: string) => {
    try {
      setPagination(prev => ({ ...prev, current: page }));
      setLoading(true);
      
      const response = await fetchDataRef.current(page, search);
      
      if (response.data.length === 0 && page > 1) {
        // If no data on current page, fetch previous page
        const prevPage = page - 1;
        const prevResponse = await fetchDataRef.current(prevPage, search);
        setData(prevResponse.data);
        setPagination({
          total: prevResponse.pagination.total,
          totalPages: prevResponse.pagination.totalPages,
          current: prevPage,
        });
      } else {
        setData(response.data);
        setPagination({
          total: response.pagination.total,
          totalPages: response.pagination.totalPages,
          current: page,
        });
      }
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array since we're using refs

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    loadData(1, value);
  }, [loadData]);

  const handlePageChange = useCallback((newPage: number) => {
    if (newPage === paginationRef.current.current) return;
    loadData(newPage, searchTermRef.current);
  }, [loadData]);

  const refreshData = useCallback(() => {
    return loadData(paginationRef.current.current, searchTermRef.current);
  }, [loadData]);

  // Initial load - only run once
  useEffect(() => {
    loadData(initialPage, initialSearch);
  }, []); // Empty dependency array for initial load only

  return {
    data,
    loading,
    error,
    searchTerm,
    pagination,
    handleSearch,
    handlePageChange,
    refreshData
  };
}

export default useTableData;
