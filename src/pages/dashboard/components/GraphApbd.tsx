import { IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import { FiBarChart2, FiMoreHorizontal, FiMoreVertical } from 'react-icons/fi';
import RenderGraph from './RenderGraph';

type Props = {
    data: any
}

const GraphApbd = (props: Props) => {
    const {data} = props

    return (
        <div className={`css-n-f-a93_cj-aj-21-d`}>
            <div className='css-n-an-awn0aw-d-wjq2-1'>
                <div className='css-na-wna-wj-2rdq2wd_a'>
                    <FiBarChart2 size={30} />
                    <p className='font-bold'>Grafik APBD</p>
                </div>
                <Menu>
                    <MenuButton variant={'ghost'} as={IconButton} icon={<FiMoreHorizontal className="w-100" size={30} />}></MenuButton>
                    <MenuList>
                        <MenuItem icon={<FiMoreVertical size={17} />} command='⌘T'>
                            <p className='text-md font-semibold'>Tahun 2024</p>
                        </MenuItem>
                        <MenuItem icon={<FiMoreVertical size={17} />} command='⌘T'>
                            <p className='text-md font-semibold'>Tahun 2023</p>
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem icon={<FiMoreVertical size={17} />} command='⌘T'>
                            <p className='text-md font-semibold'>Semua</p>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </div>
            <RenderGraph data={data} />
        </div>
    )
};
export default GraphApbd;