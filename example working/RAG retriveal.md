## 🔎 Invoice RAG Retrieval Workflow

### Structure

```text
Invoice Retrieval Webhook
          ↓
   Format User Query
          ↓
       AI Agent
          ↓
  Supabase Vector Store
          ↓
   Retrieve Relevant Data
          ↓
    Format Response
          ↓
    Respond to Webhook
```

### Explanation

The workflow receives the user's question through the **Invoice Retrieval Webhook** and formats the incoming request using JavaScript.

The **AI Agent** processes the question and uses the **Supabase Vector Store** to retrieve relevant information from the stored invoice and finance-related documents.

The retrieved information is then used by the AI Agent to generate an appropriate response. The response is formatted using another JavaScript node and returned to the website through the **Respond to Webhook** node.

The workflow uses **OpenAI Chat Model**, **OpenAI Embeddings**, and **Simple Memory** to support the RAG-based conversational experience.

## Retrieval of ingested data 
---
Following shows the retrieval of the ingested data give on Rag ingestion of data.md 

<img width="1879" height="725" alt="image" src="https://github.com/user-attachments/assets/59223c7f-1e1c-496d-8d1d-fd802fc6d55f" />

## DEMO 
---
https://github.com/user-attachments/assets/683c671a-4494-4db4-8e44-0763ccbd592d

If the above video didnt work , use this URL  - https://streamable.com/fq7gbv


