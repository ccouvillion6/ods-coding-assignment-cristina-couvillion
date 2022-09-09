import React from "react";

export const TableRow = ({data}) => {
    return (
        <tr>
            <td>{data.flt_num}</td>
            <td>{data.origin_full_name} ({data.origin})</td>
            <td>{data.destination_full_name} ({data.destination})</td>
            <td>{data.out_gmt}</td>
            <td>{data.in_gmt}</td>
        </tr>
    );
}