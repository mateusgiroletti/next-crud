import { useState } from "react";

import Layout from "../components/Layout";
import Table from "../components/Table";
import Button from "../components/Button";
import Form from "../components/Form";

import Client from "../core/Client";

export default function Home() {
    const [visible, setVisible] = useState<'table' | 'form'>('table');
    const [client, setClient] = useState(Client.void)

    const clients = [
        new Client('Ana', 24, '1'),
        new Client('Pedro', 20, '2'),
        new Client('Calos', 26, '3'),
        new Client('João', 36, '4'),
    ];


    function clientSelected(client: Client) {
        setClient(client);
        setVisible('form');
    }

    function clientDeleted(client: Client) {
        console.log(client.name)
    }

    function saveClient(client: Client) {
        console.log(client);
        setVisible('table')
    }

    function newClient() {
        setClient(Client.void);
        setVisible('form');
    }


    return (
        <div className='flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white'>
            <Layout title="Cadastro Simples">
                {visible === 'table' ? (
                    <>
                        <div className="flex justify-end">
                            <Button
                                color="blue"
                                className="mb-4"
                                onClick={newClient}
                            >
                                Novo Cliente
                            </Button>
                        </div>
                        <Table
                            clients={clients}
                            clientSelected={clientSelected}
                            clientDeleted={clientDeleted}
                        />
                    </>
                ) : (
                    <Form
                        client={client}
                        clientChange={saveClient}
                        canceled={() => setVisible('table')}
                    />
                )}
            </Layout>
        </div>
    )
}
