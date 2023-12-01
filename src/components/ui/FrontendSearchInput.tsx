import { Icon } from "@iconify/react";
import InputGroup from "./InputGroup";

type Props = {
    OriginalResponse: any;
    setFilteredResponse: (data: any) => void;
}

const FrontendSearchInput = (props: Props) => {
    const { OriginalResponse, setFilteredResponse } = props

    const handleSearchValue = (value: string) => {
        if (OriginalResponse == null) {
            return
        }

        const filtered = OriginalResponse.filter((item: any) =>
            item['nomor_spp'].toLowerCase().includes(value.toLowerCase())
        );

        setFilteredResponse(filtered);
    };

    return (
        <InputGroup
            id="search-access-control"
            type="text"
            onChange={(e: any) => handleSearchValue(e.target.value)}
            placeholder="Cari nomor surat ..."
            prepend={<Icon icon="heroicons-outline:search" />}
            merged
        />
    )
};
export default FrontendSearchInput;