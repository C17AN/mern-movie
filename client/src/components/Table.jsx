import React, { useMemo } from "react";
import { useTable } from "react-table";

const Table = ({ data, DeleteMovie, UpdateMovie }) => {
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
        filterable: true,
      },
      {
        Header: "제목",
        accessor: "name",
        filterable: true,
      },
      {
        Header: "평점",
        accessor: "rating",
        filterable: true,
      },
      {
        Header: "상영시간",
        accessor: "time",
        Cell: (props) => <span>{props.value.join(" / ")}</span>,
      },
      {
        Header: "-",
        accessor: "-",
        // props 에는 자동으로 영화 데이터가 할당된다.
        Cell: function (props) {
          console.log(props.cell.row.original._id);
          return (
            <span>
              <DeleteMovie id={props.cell.row.original._id} />
            </span>
          );
        },
      },
      {
        Header: "-",
        accessor: "--",
        Cell: function (props) {
          return (
            <span>
              <UpdateMovie id={props.cell.row.original._id} />
            </span>
          );
        },
      },
    ],
    []
  );
  const tableInstance = useTable({ columns, data });
  // 강의랑 버전 안맞아서 공식 문서 예제로 대체
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;
  return (
    <table {...getTableProps()}>
      <thead>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps()}>
                    {
                      // Render the header
                      column.render("Header")
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    // Apply the cell props
                    return (
                      <td {...cell.getCellProps()}>
                        {
                          // Render the cell contents
                          cell.render("Cell")
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};

export default Table;
