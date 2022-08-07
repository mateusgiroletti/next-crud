import { useEffect, useState } from "react";
import Client from "../core/Client";
import ClientRepository from "../core/ClientRepository";
import CollectionClient from "../firebase/db/CollectionClient";
import useTableOrForm from "./useTableOrForm";

export default function useClients() {
    const repo: ClientRepository = new CollectionClient();

    const { tableVisible, showForm, showTabel } = useTableOrForm();

    const [client, setClient] = useState<Client>(Client.void);
    const [clients, setClients] = useState<Client[]>([]);

    useEffect(getAll, []);

    function getAll() {
        repo.getAll().then((clients) => {
            setClients(clients);
            showTabel()
        })
    }

    function selectedClient(client: Client) {
        setClient(client);
        showForm();
    }

    async function deleteClient(client: Client) {
        await repo.delete(client);
        getAll();
    }

    async function saveClient(client: Client) {
        await repo.save(client);
        getAll();
    }

    function newClient() {
        setClient(Client.void);
        showForm();
    }

    return {
        client, clients, tableVisible, showTabel, selectedClient, deleteClient, saveClient, newClient
    }
}