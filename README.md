# Score Formula Visualizer

**➡️ Live Demo: [https://ahmadizzan.github.io/Score-Formula-Visualizer/](https://ahmadizzan.github.io/Score-Formula-Visualizer/) ⬅️**

## Overview

The Score Formula Visualizer is an interactive web application designed to help you understand and experiment with different mathematical formulas for aggregating scores or signals. It provides a user-friendly interface to select formulas, configure input signals with varying values and weights, and instantly visualize the resulting score.

This tool is perfect for anyone who needs to model scoring systems, understand the impact of different aggregation methods, or simply explore mathematical concepts in a hands-on way.

## Usefulness & Use Cases

Why use the Score Formula Visualizer?

*   **Understand Formula Behavior**: See firsthand how formulas like Arithmetic Mean, Harmonic Mean, and Probabilistic OR behave with different inputs.
*   **Experiment with Scoring Models**: Easily create and tweak scoring models by adjusting signal values and weights. This is useful for:
    *   Developing credit scoring models.
    *   Creating ranking systems.
    *   Designing evaluation metrics.
    *   Any scenario where multiple factors contribute to a final score.
*   **Educational Tool**: A great way to learn about aggregation functions and their mathematical properties.
*   **Rapid Prototyping**: Quickly test different scoring approaches before implementing them in a larger system.
*   **Visualize Complex Interactions**: Understand how nested formulas (where a signal itself is a result of another formula) contribute to the overall score.

## How to Use the Visualizer

The application is straightforward to use:

1.  **Select a Formula**:
    *   On the left-hand side, you'll find the "Formula Selector".
    *   Choose from the available formulas:
        *   `Arithmetic Mean`: Calculates the simple average of the signals, weighted.
        *   `Harmonic Mean`: A type of average, generally used for sets of rates.
        *   `Probabilistic OR (Noisy OR)`: Used when signals represent probabilities of an event occurring, and you want to find the combined probability.
    *   The selected formula will be used to calculate the final score.

2.  **Configure Signals**:
    *   On the right-hand side, you'll see the "Signal Configuration" section.
    *   Initially, there will be a set of default signals.
    *   For each signal, you can:
        *   **Name**: Give it a descriptive name.
        *   **Value**: Set its numerical value (typically between 0 and 1, especially for probabilities, but the tool is flexible).
        *   **Weight**: Assign a weight to signify its importance in the overall calculation.
        *   **Make it a Sub-Formula**: Toggle the "Is Formula?" switch. If enabled:
            *   Select a `Formula Type` for this sub-signal.
            *   Configure its own `Signals` (these will be nested).
    *   **Add or Remove Signals**:
        *   Click "Add Signal" to introduce a new input.
        *   Click the "Remove" button (often an X or trash icon) next to a signal to delete it.

3.  **View the Score**:
    *   At the bottom, the "Score Display" section will show:
        *   The final calculated `Score`.
        *   A summary of the `Formula Type` used.
        *   A recap of the `Signals` and their configurations that contributed to the score.
    *   The score updates in real-time as you change the formula or signal configurations.

## Key Features

*   **Interactive Interface**: User-friendly controls for selecting formulas and configuring signals.
*   **Real-time Calculation**: Scores update instantly as parameters are changed.
*   **Multiple Formula Types**: Supports Arithmetic Mean, Harmonic Mean, and Probabilistic OR.
*   **Signal Weighting**: Allows assigning different levels of importance to signals.
*   **Nested Formulas**: Signals can themselves be formulas, allowing for complex, multi-layered scoring models.
*   **Clear Visualization**: Presents the score and contributing factors in an easy-to-understand format.

## Getting Started (For Developers)

This project was bootstrapped with Vite and uses React, TypeScript, and Tailwind CSS.

1.  **Prerequisites**:
    *   Node.js (v18 or later recommended)
    *   npm (comes with Node.js)

2.  **Installation**:
    ```bash
    npm install
    ```

3.  **Running the Development Server**:
    ```bash
    npm run dev
    ```
    This will start the Vite development server, typically on `http://localhost:5173`.

4.  **Building for Production**:
    ```bash
    npm run build
    ```
    This command bundles the application into the `dist/` directory for deployment.

5.  **Linting**:
    ```bash
    npm run lint
    ```
    Checks the codebase for linting errors using ESLint.

## Technologies Used

*   **Vite**: Next-generation frontend tooling.
*   **React**: A JavaScript library for building user interfaces.
*   **TypeScript**: A typed superset of JavaScript.
*   **Tailwind CSS**: A utility-first CSS framework.
*   **Lucide React**: Beautiful and consistent icons.

---

This code was originally generated by [Magic Patterns](https://magicpatterns.com) for this design: [Source Design](https://www.magicpatterns.com/c/cqczzhpe9yvft2uxagvr5d) (Note: The original design link might be for a template and may not reflect the current "Score Formula Visualizer" functionality in detail).
