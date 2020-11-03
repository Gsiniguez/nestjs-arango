import { SchemaOptions } from "arangojs/collection";

export const RoleScheme: SchemaOptions = {
    rule: {
        properties: {
            roles: { type: "array" },
        },
        // additionalProperties: { type: "string" },
        required: ["roles"]
    }, level: "strict", message: "Debe ingresar correctamente el campo roles."
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