import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { api } from "@/lib/axios";

type Prompts = {
  id: string,
  title: string,
  template: string
}

interface PromptSelect {
  onPromptSelected: (template: string) => void
}
export default function PromptSelect({ onPromptSelected }:PromptSelect) {
  const [prompts, setPrompts] = useState<Prompts [] | null>(null)

  useEffect(() => {
    api.get('/prompts').then(response => {
      setPrompts(response.data)
    })
  }, [])

  function handlePromptSelected(promptId: string) {
    const selectedPrompt = prompts?.find(prompt => prompt.id === promptId)

    if(!selectedPrompt) return

    onPromptSelected(selectedPrompt.template)
  }

  return (
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Select a prompt..."/>
      </SelectTrigger>
      <SelectContent>
        {
          prompts?.map((prompt) => {
            return(
               <SelectItem key={prompt.id} value={prompt.id}>{prompt.title}</SelectItem>
            )
          })
        }
       
      </SelectContent>
    </Select>
  )
}