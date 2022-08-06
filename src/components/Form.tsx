import { useState } from 'react';
import Client from '../core/Client';
import Input from './Input';
import Button from './Button';

interface FormProps {
    client: Client
}

export default function Form(props: FormProps) {
    const id = props.client?.id;
    const [name, setName] = useState(props.client?.name ?? '');
    const [age, setAge] = useState(props.client?.age ?? '');

    return (
        <div>
            {id ? (
                <Input
                    readOnly
                    text='Codigo'
                    value={id}
                    className="mb-4"
                />
            ) : false}
            <Input
                text='Nome'
                value={name}
                valueChange={setName}
                className="mb-4"
            />
            <Input
                text='Idade'
                type='number'
                value={age}
                valueChange={setAge}
            />
            <div className='flex justify-end mt-7'>
                <Button color='blue' className='mr-2'>
                    {id ? 'Alterar' : 'Salvar'}
                </Button>
                <Button>
                    Cancelar
                </Button>
            </div>
        </div>
    )
}