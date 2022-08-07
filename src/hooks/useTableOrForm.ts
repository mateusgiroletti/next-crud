import { useState } from "react";

export default function useTableOrForm() {
    const [visible, setVisible] = useState<'table' | 'form'>('table');

    const showTabel = () => setVisible('table');
    const showForm = () => setVisible('form');

    return {
        formVisible: visible === 'form',
        tableVisible: visible === 'table',
        showForm,
        showTabel
    }
}