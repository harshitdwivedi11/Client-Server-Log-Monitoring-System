export const Table = ({ children }) => (
    <table className="min-w-full divide-y divide-gray-200">{children}</table>
  );
  
  export const TableHeader = ({ children }) => (
    <thead className="bg-gray-100">{children}</thead>
  );
  
  export const TableRow = ({ children }) => <tr>{children}</tr>;
  
  export const TableHead = ({ children }) => (
    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">{children}</th>
  );
  
  export const TableBody = ({ children }) => <tbody>{children}</tbody>;
  
  export const TableCell = ({ children }) => (
    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{children}</td>
  );

  