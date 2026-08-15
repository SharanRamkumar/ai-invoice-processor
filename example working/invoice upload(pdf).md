## 📄 Main Invoice Upload Workflow

### Structure

```text
Invoice Upload Webhook
          ↓
    Branch the File
          ↓
     Extract PDF
          ↓
    AI Invoice Agent
          ↓
   Check for Duplicate
          ↓
       ┌───┴───┐
       ↓       ↓
   Duplicate   New Invoice
       ↓       ↓
  Duplicate    Clean Data
  Response       ↓
              Store Data
                 ↓
          ┌──────┴──────┐
          ↓             ↓
     Google Sheets    Supabase
          ↓
     Confirmation
        Email
```

### Explanation

The workflow receives an invoice through the **Invoice Ingestion Webhook** and first determines the type of uploaded pdf file ( Via a website or email from email node if added ).

The invoice is then processed and its contents are extracted before being passed to the **AI Agent**, which extracts the required invoice information.

The workflow checks whether the invoice is a **duplicate** using existing invoice records in Supabase.

- If the invoice is a duplicate, the workflow returns a duplicate response.
- If it is a new invoice, the extracted information is cleaned and formatted.

The processed invoice data is then stored in **Google Sheets** and **Supabase**. Finally, a confirmation email is sent and the processed invoice information is returned through the webhook.

## Successful invoice upload with invoice details
---
<img width="1881" height="934" alt="image" src="https://github.com/user-attachments/assets/36bfda2b-0db4-4475-87ef-c2c2cefa3473" />

## Successful invoice detail ingestion in supabase and googlesheets
---
### Supabase
<img width="1506" height="388" alt="image" src="https://github.com/user-attachments/assets/699bf4e9-296c-4527-8b38-53610d1d380f" />

### Google sheets
<img width="1901" height="414" alt="image" src="https://github.com/user-attachments/assets/4a7db2b4-dc71-4ce0-99f8-d0647032b8f7" />

## Duplicate File detection
---
<img width="1875" height="1012" alt="image" src="https://github.com/user-attachments/assets/b09c27d6-a397-48a5-8da5-325c566f896e" />


## Email confirmation
---
<img width="1464" height="817" alt="image" src="https://github.com/user-attachments/assets/d0fe02a8-1567-44c6-88af-952eddaa36d1" />

## DEMO VIDEO
---
https://github.com/user-attachments/assets/9e5bd4a6-a123-4339-9043-8683fad413ca

Link if the above video didnt work - https://streamable.com/enabdl


