import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';

const TableHeader = () => {
    const SMALL = '100'
    const LARGE = '170'
    const columns = [
        { id: 'title', label: 'Title' },
        { id: 'price', label: 'Price' },
        { id: 'option', label: 'Option' }
    ];
    return (
        <TableHead>
            <TableRow>
                {columns.map((column) => (
                    <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.label === 'Price' ? SMALL : LARGE }}
                    >
                        {column.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default TableHeader;