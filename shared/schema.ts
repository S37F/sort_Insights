import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";

// User schema (for future authentication features)
export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email().optional(),
  createdAt: z.date().optional()
});

export type User = z.infer<typeof userSchema>;

export const insertUserSchema = userSchema.omit({ id: true });
export type InsertUser = z.infer<typeof insertUserSchema>;

// Algorithm performance data
export const algorithmPerformanceSchema = z.object({
  algorithm: z.string(),
  executionTime: z.number(),
  comparisons: z.number(),
  swaps: z.number(),
  arrayAccess: z.number(),
  arraySize: z.number(),
  timestamp: z.date()
});

export type AlgorithmPerformance = z.infer<typeof algorithmPerformanceSchema>;

// Algorithm information schema
export const algorithmInfoSchema = z.object({
  name: z.string(),
  description: z.string(),
  stability: z.enum(['Stable', 'Unstable']),
  inPlace: z.boolean(),
  timeBest: z.string(),
  timeAverage: z.string(),
  timeWorst: z.string(),
  spaceComplexity: z.string(),
  codeSnippets: z.record(z.string(), z.string()) // language -> code
});

export type AlgorithmInfo = z.infer<typeof algorithmInfoSchema>;

// Sorting step for visualization
export const sortingStepSchema = z.object({
  array: z.array(z.number()),
  comparingIndices: z.array(z.number()),
  swappingIndices: z.array(z.number()).optional(),
  pivotIndex: z.number().optional(),
  sortedIndices: z.array(z.number()).optional(),
  stepDescription: z.string().optional()
});

export type SortingStep = z.infer<typeof sortingStepSchema>;
