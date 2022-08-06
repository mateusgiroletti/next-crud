import Client from "../core/Client";
import { IconDelete, IconEdit } from "./Icons";


interface TableProps {
    clients: Client[]
    clientSelected?: (client: Client) => void
    clientDeleted?: (client: Client) => void
}

export default function Table(props: TableProps) {
    const showActions = props.clientDeleted || props.clientSelected;

    function renderHeader() {
        return (
            <tr>
                <th className="text-left p-4">Código</th>
                <th className="text-left p-4">Nome</th>
                <th className="text-left p-4">Idade</th>
                {showActions ? (<th className="p-4">Ações</th>) : false}
            </tr>
        );
    }

    function renderActions(client: Client) {
        return (
            <td className="flex justify-center items-center ">
                {props.clientSelected ? (
                    <button
                        className="text-green-600 rounded-full p-2 m-1 hover:bg-purple-50"
                        onClick={() => props.clientSelected?.(client)}
                    >
                        {IconEdit}
                    </button>
                ) : false}
                {props.clientDeleted ? (
                    <button
                        className="text-red-600 rounded-full p-2 m-1 hover:bg-purple-50"
                        onClick={() => props.clientDeleted?.(client)}
                    >
                        {IconDelete}
                    </button>
                ) : false}
            </td>
        )
    }

    function renderData() {
        return props.clients?.map((client, i) => {
            return (
                <tr key={client.id} className={`${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}>
                    <td className="text-left p-4">{client.id}</td>
                    <td className="text-left p-4">{client.name}</td>
                    <td className="text-left p-4">{client.age}</td>
                    {showActions ? renderActions(client) : false}
                </tr>
            )
        })
    }

    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className="bg-gradient-to-r from bg-purple-500 to-purple-800 text-gray-100">
                {renderHeader()}
            </thead>
            <tbody>
                {renderData()}
            </tbody>
        </table>
    );
}