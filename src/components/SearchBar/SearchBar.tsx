import { useEffect, useState } from "react";

interface SearchBarProps {
    items: any[];
    displayField1: string;
    displayField2: string;
    onItemClick: (item: any) => void;
}

const SearchBar = ({ items, displayField1, displayField2, onItemClick }: SearchBarProps) => {
    const [data, setData] = useState<any[]>([]);
    const [records, setRecords] = useState<any[]>([]);
    const [show, setShow] = useState(false);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        setData(items);
        setRecords(items);
    }, [items]);

    const Filter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);

        event.target.value === "" ? setShow(false) : setShow(true);
        if (data && data.length > 0) {
            setRecords(
                data.filter((item) => {
                    const fieldValue1 = item[displayField1]?.toLowerCase() || "";
                    const fieldValue2 = item[displayField2]?.toLowerCase() || "";

                    return (
                        fieldValue1.includes(event.target.value.toLowerCase()) ||
                        fieldValue2.includes(event.target.value.toLowerCase())
                    );
                })
            );
        }
    };

    const handleClick = (item: any) => {
        setInputValue("");
        setShow(false);
        onItemClick(item);
    };

    return (
        <div className={"bg-white"} style={{ width: "200px", justifyContent: "center", textAlign: "center"}}>
            <input
                type={"text"}
                className={"form-control"}
                value={inputValue}
                onChange={Filter}
                placeholder={"search item"}
            />
            {show && (
                <table>
                    <tbody>
                    {records.map((record, index) => (
                        <tr key={index} onClick={() => handleClick(record)}>
                            <td>{record[displayField1]}</td>
                            <td>[{record[displayField2].replaceAll("]", "").replaceAll("[", "")}]</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SearchBar;