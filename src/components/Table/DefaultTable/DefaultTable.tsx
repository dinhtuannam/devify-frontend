import React from 'react';
import styles from './DefaultTable.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

interface Column {
    header: string;
    field: string;
    render?: (value: any) => React.ReactNode;
}

interface CustomTableProps {
    data: Record<string, any>[];
    columns: Column[];
}

const DefaultTable: React.FC<CustomTableProps> = ({ data, columns }) => {
    return (
        <div className={cx('wrapper')}>
            <table className={cx('table')}>
                <thead>
                    <tr className={cx('tr')}>
                        {columns.map((column, index) => (
                            <th className={cx('th')} key={index}>
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className={cx('tr')}>
                            {columns.map((column, columnIndex) => (
                                <td key={columnIndex} className={cx('td')}>
                                    {column.render ? column.render(row[column.field]) : row[column.field]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DefaultTable;
