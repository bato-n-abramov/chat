import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import  Button  from '../Button/Button';
import Avatar from '../Icons/Avatar';
import Arrow from '../Icons/Arrow';
const Dropdown = () => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <div className='dropdown-wrapper'>
                <div className='dropdown-avatar'>
                        <Avatar />
                    </div>
                    <span>0x56e...B6</span>
                    <Arrow />
                </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
                <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>

    )
}

export default Dropdown;