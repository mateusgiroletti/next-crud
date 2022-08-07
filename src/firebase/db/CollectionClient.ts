import firebase from "../config";
import Client from "../../core/Client";
import ClientRepository from "../../core/ClientRepository";

export default class CollectionClient implements ClientRepository {
    #converter = {
        toFirestore(client: Client) {
            return {
                name: client.name,
                age: client.age,
            }
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Client {
            const { name, age, snapshot: { id } } = snapshot?.data(options);
            return new Client(name, age, id)
        }
    }

    async save(client: Client): Promise<Client> {
        if (client?.id) {
            await this.collection().doc(client.id).set(client);
            return client;
        } else {
            const docRed = await this.collection().add(client);
            const doc = await docRed.get();
            return doc.data();
        }
    }

    async delete(client: Client): Promise<void> {
        return await this.collection().doc(client.id).delete()
    }

    async getAll(): Promise<Client[]> {
        const query = await this.collection().get();
        return query.docs.map(doc => doc.data()) ?? [];
    }

    private collection() {
        return firebase.firestore().collection('clients').withConverter(this.#converter);
    }
}