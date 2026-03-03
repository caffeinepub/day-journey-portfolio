import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Message {
    content: string;
    owner: Principal;
    name: string;
    email: string;
}
export interface backendInterface {
    getAllMessages(): Promise<Array<Message>>;
    submitMessage(email: string, name: string, content: string): Promise<void>;
}
