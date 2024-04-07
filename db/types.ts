import {
  BuildQueryResult,
  DBQueryConfig,
  ExtractTablesWithRelations,
  InferSelectModel,
} from "drizzle-orm";
import * as schema from "./schema";

type Schema = typeof schema;
type TSchema = ExtractTablesWithRelations<Schema>;

export type TExercise = InferSelectModel<typeof schema.exercise>;
export type TWorkout = InferSelectModel<typeof schema.workout>;
export type TSet = InferSelectModel<typeof schema.set>;

export type IncludeRelation<TableName extends keyof TSchema> = DBQueryConfig<
  "one" | "many",
  boolean,
  TSchema,
  TSchema[TableName]
>["with"];

export type InferResultType<
  TableName extends keyof TSchema,
  With extends IncludeRelation<TableName> | undefined = undefined,
> = BuildQueryResult<TSchema, TSchema[TableName], { with: With }>;

export type TExerciseWithSets = InferResultType<"exercise", { set: true }>;

