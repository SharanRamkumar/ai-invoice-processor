# Mathematics Behind RAG

RAG (Retrieval-Augmented Generation) uses concepts from **linear algebra, vector similarity, probability, and optimization**.

The core mathematical flow is:

**Text → Embedding → Vector → Similarity → Retrieval → LLM**

---

## 1. Embeddings as Vectors

An embedding model converts text into a numerical vector.

For example:

    "Invoice is overdue"
            ↓
    [0.21, -0.43, 0.17, ...]

Mathematically:

**x = fθ(T)**

Where:

- **T** = input text
- **fθ** = trained embedding model
- **θ** = model parameters
- **x** = embedding vector

The vector represents the semantic information of the text in a high-dimensional space.

---

## 2. Dot Product

The dot product measures the relationship between two vectors.

**A · B = Σ(Aᵢ × Bᵢ)**

For example:

**A = [1, 2, 3]**

**B = [2, 4, 5]**

Therefore:

**A · B = (1×2) + (2×4) + (3×5)**

**A · B = 2 + 8 + 15 = 25**

The dot product is an important component of vector similarity calculations.

---

## 3. Vector Magnitude (L2 Norm)

The magnitude, or length, of a vector is calculated using:

**‖A‖ = √(A₁² + A₂² + ... + Aₙ²)**

For:

**A = [1, 2, 3]**

we get:

**‖A‖ = √(1² + 2² + 3²)**

**‖A‖ = √14**

The magnitude represents the length of a vector.

---

## 4. Cosine Similarity

Cosine similarity measures the angle between two vectors.

**Cosine Similarity = (A · B) / (‖A‖ × ‖B‖)**

It mainly measures the **direction** of the vectors rather than their magnitude.

Typical interpretation:

- **1** → vectors point in the same direction
- **0** → vectors are approximately perpendicular
- **-1** → vectors point in opposite directions

In RAG, cosine similarity can be used to compare a query embedding with document embeddings.

---

## 5. Cosine Similarity in RAG

Suppose the user's query is:

    "Which invoices are overdue?"

The query is converted into an embedding:

**q = fθ(Q)**

A document chunk is also converted into an embedding:

**dᵢ = fθ(Dᵢ)**

Their similarity can then be calculated as:

**S(q, dᵢ) = (q · dᵢ) / (‖q‖ × ‖dᵢ‖)**

A higher similarity score generally means that the query and document vectors have a more similar direction.

This allows the RAG system to rank documents according to their relevance to the query.

---

## 6. Euclidean Distance

Euclidean distance measures the straight-line distance between two vectors.

**d(A,B) = √Σ(Aᵢ - Bᵢ)²**

For example:

**A = [1, 2, 3]**

**B = [2, 4, 3]**

Therefore:

**d(A,B) = √[(1-2)² + (2-4)² + (3-3)²]**

**d(A,B) = √(1 + 4 + 0)**

**d(A,B) = √5**

A smaller Euclidean distance means the vectors are geometrically closer.

---

## 7. Query → Retrieval

The RAG retrieval process can be represented as:

### Step 1: Convert query to vector

**q = fθ(Q)**

### Step 2: Compare query with document vectors

**Sᵢ = (q · dᵢ) / (‖q‖ × ‖dᵢ‖)**

### Step 3: Rank documents

**Dₜₒₚ₋ₖ = TopK(S₁, S₂, ..., Sₙ)**

The system selects the **k documents with the highest similarity scores**.

---

## 8. Top-k Retrieval

Suppose the similarity scores are:

| Document | Similarity |
|----------|------------|
| D1 | 0.91 |
| D2 | 0.87 |
| D3 | 0.72 |
| D4 | 0.41 |

If:

**k = 2**

then:

**Dₜₒₚ₋₂ = {D1, D2}**

These documents are passed to the LLM as relevant context.

---

## 9. Probability in the LLM

After retrieval, the LLM generates an answer using probabilities.

For a sequence of tokens:

**x₁, x₂, ..., xₙ**

the probability of the sequence can be represented using the chain rule:

**P(x₁, ..., xₙ) = ∏ P(xₜ | x₁, ..., xₜ₋₁)**

In simple terms, the model predicts the probability of the next token based on the context available to it.

With RAG, the retrieved documents become part of that context:

**P(A | Q, Dᵣₑₜᵣᵢₑᵥₑd)**

Where:

- **A** = generated answer
- **Q** = user query
- **Dᵣₑₜᵣᵢₑᵥₑd** = retrieved documents

---

## 10. Gradient Descent

Embedding models are trained using optimization techniques such as gradient descent.

A loss function measures how well the model performs:

**L(θ)**

The parameters are updated using:

**θₙₑw = θₒₗd - η∇θL**

Where:

- **θ** = model parameters
- **η** = learning rate
- **∇θL** = gradient of the loss

The important distinction is:

**Training:** model parameters are updated.

**RAG inference:** the trained model is normally used to generate embeddings and perform retrieval without updating its parameters.

---

## 11. Complete Mathematical RAG Flow

The entire process can be summarized as:

### Document

**Dᵢ → fθ(Dᵢ) → dᵢ**

The document chunk is converted into an embedding vector.

### Query

**Q → fθ(Q) → q**

The user's query is converted into an embedding vector.

### Similarity

**S(q,dᵢ) = (q · dᵢ) / (‖q‖ × ‖dᵢ‖)**

The query vector is compared with document vectors.

### Retrieval

**Dₜₒₚ₋ₖ = TopK(S₁, ..., Sₙ)**

The highest-scoring documents are selected.

### Generation

**P(A | Q, Dₜₒₚ₋ₖ)**

The LLM generates an answer using the query and retrieved context.

---

## 12. Key Mathematical Concepts

| Concept | Purpose in RAG |
|---------|----------------|
| Vectors | Represent text numerically |
| Dot Product | Combines corresponding vector values |
| L2 Norm | Calculates vector magnitude |
| Cosine Similarity | Measures directional similarity |
| Euclidean Distance | Measures geometric distance |
| Top-k | Selects the most relevant documents |
| Probability | Models token generation |
| Gradient Descent | Used when training model parameters |

---

## 13. Final Summary

The mathematics behind RAG connects several areas:

**Linear Algebra**

↓

**Vectors and Embeddings**

↓

**Cosine Similarity / Distance**

↓

**Information Retrieval**

↓

**Probability**

↓

**LLM Generation**

The central mathematical operation in semantic retrieval is:

**Cosine Similarity = (A · B) / (‖A‖ × ‖B‖)**

This allows a RAG system to compare a user's query vector with document vectors and retrieve the information that is most semantically relevant.

