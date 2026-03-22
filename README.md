# Lista de Tarefas Inteligente (React Native + Expo)

A **Lista de Tarefas Inteligente** é um aplicativo de produtividade que utiliza um **algoritmo estruturado de ordenação ponderada** para ajudar usuários a identificarem quais tarefas devem ser realizadas primeiro, baseando-se em critérios de Urgência e Importância.

---

## O Algoritmo

Diferente de uma lista de tarefas comum, este projeto implementa a **Matriz de Eisenhower** de forma automatizada. 

### A Lógica de Cálculo
O algoritmo processa a entrada de dados do usuário e atribui um "Score de Prioridade" ($P$) seguindo a fórmula:

$$P = (U \times 1.5) + I$$

Onde:
* **$U$ (Urgência):** Peso 1.5 (Garante que o que é imediato suba na lista).
* **$I$ (Importância):** Peso 1.0.

Após o cálculo, o aplicativo executa uma **Ordenação Descrescente**, garantindo que o item com maior score ocupe o topo da interface (`index 0`).

---

## 🛠️ Tecnologias Utilizadas

* **React Native**: Framework para interface mobile.
* **Expo**: Plataforma de desenvolvimento e execução.
* **JavaScript (ES6+)**: Lógica e manipulação de arrays.
* **React Hooks (`useState`)**: Gerenciamento de estado em tempo real.

# O projeto foi criado com o comando *npx create-expo-app* 