import { useState } from "react";

export const useDisclosure = () => {
    const [isOpen, setIsOpen] = useState(false)

    const setOpen = () => setIsOpen(true);

    const setClose = () => setIsOpen(false);

    return { isOpen, setOpen, setClose };
}