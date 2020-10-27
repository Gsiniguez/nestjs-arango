import { SchemaOptions } from "arangojs/collection";

export const RoleScheme: SchemaOptions = {
    rule: {
        properties: {
            role: { type: "string" },
        },
        // additionalProperties: { type: "string" },
        required: ["role"]
    }, level: "strict", message: "Debe ingresar correctamente el campo role."
}

export const UserScheme: SchemaOptions = {
    rule: {
        properties: {
            username: { type: "string" },
            password: { type: "string" }
        },
        // additionalProperties: { type: "string" },
        required: ["username", "password"]
    }, level: "strict", message: "Debe ingresar correctamente los campos username y password"
}