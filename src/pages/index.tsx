import Layout from "../components/Layout";
import Table from "../components/Table";
import Client from "../core/Client";

export default function Home() {
    const clients = [
        new Client('Ana', 24, '1'),
        new Client('Pedro', 20, '2'),
        new Client('Calos', 26, '3'),
        new Client('João', 36, '4'),
    ];


    function clientSelected(client: Client) {
        console.log(client.name)
    }

    function clientDeleted(client: Client) {
        console.log(client.name)
    }

    return (
        <div className='flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white'>
            <Layout title="Cadastro Simples">
                <Table clients={clients} clientSelected={clientSelected} clientDeleted={clientDeleted}></Table>
            </Layout>
        </div>
    )
}
