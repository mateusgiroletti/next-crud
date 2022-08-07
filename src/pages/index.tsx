import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import Table from "../components/Table";
import Button from "../components/Button";
import Form from "../components/Form";

import Client from "../core/Client";
import ClientRepository from "../core/ClientRepository";
import CollectionClient from "../firebase/db/CollectionClient";

export default function Home() {

    const repo: ClientRepository = new CollectionClient();

    const [visible, setVisible] = useState<'table' | 'form'>('table');
    const [client, setClient] = useState<Client>(Client.void);
    const [clients, setClients] = useState<Client[]>([]);

    useEffect(getAll, []);


    function getAll() {
        repo.getAll().then((clients) => {
            setClients(clients);
            setVisible('table')
        })
    }

    function clientSelected(client: Client) {
        setClient(client);
        setVisible('form');
    }

    async function clientDeleted(client: Client) {
        await repo.delete(client);
        getAll();
    }

    async function saveClient(client: Client) {
        await repo.save(client);
        getAll();
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
