import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import  Button  from '../Button/Button';

const Dropdown = () => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Button variant="soft">
                    Options
                </Button>
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