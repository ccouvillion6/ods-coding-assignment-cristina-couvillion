import React from "react";
import {TableRow} from "./TableRow";

export const FlightTable = ({flightData}) => {

    const addRows = (flights) => {
        if (flights.length === 0) {
          return <></>;
        }
        const flightRows = flights.map(row => {
          return <TableRow data={row} />
        });
        return flightRows;
    }

    return (
        <>
        <table>
            <thead>
            <tr>
                <th>Flight Number</th>
                <th>From</th>
                <th>To</th>
                <th>ETD</th>
                <th>ETA</th>
            </tr>
            </thead>
            <tbody>
            {addRows(flightData)}
            </tbody>
        </table>
        </>
    );
}
