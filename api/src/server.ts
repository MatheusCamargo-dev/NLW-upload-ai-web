import fastify from "fastify";
import { prisma } from "./lib/prisma";
import { getAllProptsRoute } from "./routes/get-all-prompts";
import { uploadVideoRoute } from "./routes/upload-video";
import { createTranscriptionRoute } from "./routes/create-transcription";
import { generateAICompletionRoute } from "./routes/generation-ai-completion";
import fastifyCors from "@fastify/cors";

const app = fastify()

app.register(fastifyCors, {
  origin: '*'
})

app.register(generateAICompletionRoute)
app.register(createTranscriptionRoute)
app.register(getAllProptsRoute)
app.register(uploadVideoRoute)

app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP Server running!')
})