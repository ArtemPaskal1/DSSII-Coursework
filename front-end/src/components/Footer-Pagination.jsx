function PaginationFooter({ currentPage, totalPages, setCurrentPage, onPageChange }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="fixed bottom-0 w-full h-12 bg-white border-t border-gray-200">
      <div className="h-full flex items-center justify-between px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        
        <nav className="flex items-center gap-2">
          <button
            onClick={previousPage}
            disabled={currentPage === 1}
            className={`p-2 rounded ${
              currentPage === 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Previous
          </button>
          
          <div className="flex gap-1">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)} 
                className={`w-8 h-8 rounded ${
                  currentPage === number
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {number}
              </button>
            ))}
          </div>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`p-2 rounded ${
              currentPage === totalPages 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
}

export default PaginationFooter;