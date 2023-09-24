import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.prompt.deleteMany()

  await prisma.prompt.create({
    data: {
      title: 'Youtube Title',
      template: `Your role is to generate three titles for a YouTube video.

      Below, you will receive a transcript of this video; use this transcript to generate the titles.
      Below, you will also receive a list of titles; use this list as a reference for the titles to be generated.

      The titles must be a maximum of 60 characters.
      The titles should be catchy and appealing to maximize clicks.

      Return ONLY the three titles in a list format as shown below:
      '''
      - Title 1
      - Title 2
      - Title 3
      '''

      Transcription:
      '''
      {transcription}
      '''`.trim()
    }
  })

  await prisma.prompt.create({
    data: {
      title: 'YouTube Description',
      template: `Your role is to generate a concise description for a YouTube video.
  
      Below, you will receive a transcript of this video; use this transcript to generate the description.

      The description should be in the first person and contain the main points of the video, with a maximum of 80 words.

      Use compelling words that capture the reader's attention.

      Additionally, at the end of the description, include a list of 3 to 10 lowercase hashtags containing video keywords.

      The return should follow the format below:
      '''
      Description.

      #hashtag1 #hashtag2 #hashtag3 ...
      '''

      Transcription:
      '''
      {transcription}
      '''`.trim()
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })