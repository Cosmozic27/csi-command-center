// Central export for app-facing types.
// Keep entity types as the canonical frontend model and only re-export
// database-specific declarations that do not collide with the entity names.
export * from "./entities";
export type { Json, Database } from "./database.types";
