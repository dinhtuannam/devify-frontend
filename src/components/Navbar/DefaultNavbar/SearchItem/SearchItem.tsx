interface SearchData {
    name: string;
    price: number;
    creator: string;
}

function SearchItem({ data }: { data: SearchData[] }) {
    return <div>{data[0].name}</div>;
}

export default SearchItem;
