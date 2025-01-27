import styled from "styled-components";

export default function Scoreboard() {
    return (
        <Table className=" w-full text-center text-xl ">
            <thead className=" text-white/70 bg-black/10 font-bold ">
                <tr>
                    <td colSpan="2" rowSpan="2"></td>
                    <td colSpan="5">SNATCH</td>
                    <td colSpan="5">CLEAN & JERK</td>
                    <td colSpan="2">TOTAL</td>
                </tr>
                <tr>
                    <td>1ST</td>
                    <td>2ND</td>
                    <td>3RD</td>
                    <td>BEST</td>
                    <td>SPI</td>
                    <td>1ST</td>
                    <td>2ND</td>
                    <td>3RD</td>
                    <td>BEST</td>
                    <td>CJPI</td>
                    <td>BEST</td>
                    <td>TPI</td>
                </tr>
            </thead>
            <tbody className=" opacity-60 ">
                <tr>
                    <td>1</td>
                    <td>Harold Anderson Hernández Zambrano</td>
                    <td>100</td>
                    <td>105</td>
                    <td>111</td>
                    <td>105</td>
                    <td>1</td>
                    <td>130</td>
                    <td>135</td>
                    <td>140</td>
                    <td>130</td>
                    <td>1</td>
                    <td>235</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Juan Carlos Ortega Jiménez</td>
                    <td>75</td>
                    <td>80</td>
                    <td>85</td>
                    <td>75</td>
                    <td>2</td>
                    <td>90</td>
                    <td>95</td>
                    <td>100</td>
                    <td>100</td>
                    <td>2</td>
                    <td>175</td>
                    <td>2</td>
                </tr>
            </tbody>
        </Table>
    );
}

const Table = styled.table`
    td {
        padding: 8px 5px;
        border: 1px solid #000;
    }
`;
