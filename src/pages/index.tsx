import Layout from "../components/Layout";
import Table from "../components/Table";
import Button from "../components/Button";
import Form from "../components/Form";
import useClients from "../hooks/useclients";

export default function Home() {
    const { client, clients, tableVisible, showTabel, selectedClient, newClient, deleteClient, saveClient } = useClients();

    return (
        <div className='flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white'>
            <Layout title="Cadastro Simples">
                {tableVisible ? (
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
                            clientSelected={selectedClient}
                            clientDeleted={deleteClient}
                        />
                    </>
                ) : (
                    <Form
                        client={client}
                        clientChange={saveClient}
                        canceled={() => showTabel}
                    />
                )}
            </Layout>
        </div>
    )
}
