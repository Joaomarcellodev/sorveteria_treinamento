# 📌 Casos de Uso e Modelo de Dados  
## Sistema de Distribuidora de Picolé

---

## 1️⃣ Visão Geral do Sistema

O sistema tem como objetivo gerenciar **estoque e controle financeiro** de uma distribuidora de picolés e cremosin.

A aplicação é organizada em **três módulos principais**:

- **Dashboard** – visão gerencial
- **Transações** – vendas e despesas
- **Estoque (Produtos)** – controle de quantidade disponível

---

## 2️⃣ Atores do Sistema

- **Administrador**
  - Acompanha indicadores
  - Cadastra produtos
  - Registra vendas e despesas

- **Funcionário** (opcional)
  - Registra vendas
  - Registra despesas operacionais

---

## 3️⃣ Casos de Uso

### 🔹 UC01 – Visualizar Dashboard

**Ator:** Administrador  

**Descrição:**  
Permite visualizar os principais indicadores financeiros e de estoque da distribuidora.

**Funcionalidades:**
- Receita total
- Despesas totais
- Saldo (receita − despesas)
- Quantidade de produtos vendidos
- Estoque atual de produtos
- Gráficos de vendas e despesas
- Lista de transações recentes

---

### 🔹 UC02 – Cadastrar Produto no Estoque

**Ator:** Administrador  

**Descrição:**  
Permite cadastrar os produtos comercializados pela distribuidora.

**Fluxo Principal:**
1. Informar nome do produto
2. Selecionar tipo do produto  
   - Picolé simples  
   - Picolé com cobertura  
   - Cremosin
3. Informar quantidade inicial
4. Informar preço de venda
5. Sistema salva o produto no estoque

---

### 🔹 UC03 – Atualizar Estoque Automaticamente

**Ator:** Sistema  

**Descrição:**  
Atualiza automaticamente a quantidade em estoque após uma venda.

**Regras:**
- A cada venda, o estoque do produto é reduzido
- Não permitir estoque negativo
- Gerar notificação quando estoque < 50 unidades

---

### 🔹 UC04 – Registrar Venda

**Ator:** Administrador / Funcionário  

**Descrição:**  
Registra a venda de picolés ou cremosin.

**Fluxo Principal:**
1. Selecionar produto
2. Informar quantidade vendida
3. Sistema calcula o valor total
4. Sistema registra uma transação do tipo **Venda**
5. Estoque é atualizado automaticamente

---

### 🔹 UC05 – Registrar Despesa

**Ator:** Administrador / Funcionário  

**Descrição:**  
Registra despesas operacionais da distribuidora.

**Exemplos de despesas:**
- Alimentação
- Gasolina
- Compra de insumos
- Manutenção
- Outros gastos operacionais

---

### 🔹 UC06 – Receber Notificação de Estoque Baixo

**Ator:** Administrador  

**Descrição:**  
Sistema notifica quando algum produto estiver com quantidade abaixo do limite mínimo definido (50 unidades).

---

## 4️⃣ Modelo de Dados

### 📦 Tabela: PRODUTOS

Armazena os produtos disponíveis no estoque.

| Campo              | Tipo        | Descrição |
|-------------------|-------------|-----------|
| id                | PK          | Identificador do produto |
| nome              | texto       | Nome do produto |
| tipo              | texto       | Tipo do produto (picolé simples, cobertura, cremosin) |
| quantidade_estoque| inteiro     | Quantidade disponível |
| preco_venda       | decimal     | Preço de venda unitário |
| estoque_minimo    | inteiro     | Quantidade mínima (default: 50) |
| created_at        | timestamp   | Data de cadastro |

---

### 💰 Tabela: TRANSACOES

Registra todas as entradas e saídas financeiras.

| Campo           | Tipo        | Descrição |
|----------------|-------------|-----------|
| id             | PK          | Identificador da transação |
| tipo           | texto       | Venda ou Despesa |
| categoria      | texto       | Categoria da transação |
| produto_id     | FK (opcional)| Produto relacionado (apenas para vendas) |
| quantidade     | inteiro     | Quantidade vendida (opcional) |
| valor          | decimal     | Valor da transação |
| data_transacao | timestamp   | Data da transação |
| descricao      | texto       | Observações adicionais |

---

### 📊 Dashboard (Visão Calculada)

> O Dashboard **não é uma tabela física**, mas sim uma visão calculada a partir das tabelas `produtos` e `transacoes`.

**Indicadores calculados:**
- Receita total (soma das vendas)
- Despesas totais
- Saldo financeiro
- Total de produtos vendidos
- Estoque atual
- Transações recentes

---

## 5️⃣ Regras de Negócio

- Toda venda gera uma transação do tipo **Venda**
- Toda despesa gera uma transação do tipo **Despesa**
- Vendas reduzem automaticamente o estoque
- Estoque não pode ficar negativo
- Sistema gera alerta quando estoque < 50 unidades
- Dashboard sempre reflete dados atualizados em tempo real

---

## 6️⃣ Considerações Técnicas

Este modelo é adequado para:
- Banco de dados relacional (PostgreSQL)
- Supabase
- Aplicações Web (Next.js / React)
- Dashboards financeiros e de estoque

---

## 7️⃣ Possíveis Evoluções Futuras

- Controle por usuário
- Relatórios por período
- Exportação de dados
- Integração com gráficos avançados
- Aplicativo mobile

---
