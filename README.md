# nextpen

A simple online code editor where you can write and run code in a few programming languages, or play around with HTML, CSS, and JavaScript with a live preview.

## Features

### Programming Languages

- C
- C++
- C#
- Java
- Python
- JavaScript (Node.js)
- TypeScript
- Go
- Rust
- Elixir

### HTML/CSS Playground

- Edit HTML, CSS, and JavaScript in separate tabs
- See the result in a side-by-side preview

### Editor Settings

- Syntax highlighting
- Multiple color themes
- Adjustable font size and font family
- Toggle line numbers, code wrapping, and minimap
- Vim mode support
- Input and output panels for programs

## Tech Stack

- Next.js 16 App router
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Monaco Editor (@monaco-editor/react)
- Zustand (state management)

## Installation

### Prerequisites

- Node.js 18+
- Git

### Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/ankitk26/nextpen.git
    cd nextpen
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    bun install
    ```

3. Create a `.env.local` file:

    ```bash
    cp .env .env.local
    ```

    Add your JDOODLE API credentials:

    ```env
    JDOODLE_CLIENT_ID=your_client_id
    JDOODLE_CLIENT_SECRET=your_client_secret
    ```

    Get your free API credentials at [jdoodle](https://www.jdoodle.com/integrate-online-ide-compiler-api-plugins)

4. Run the development server:

    ```bash
    npm run dev
    # or
    bun run dev
    ```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

### Programming Mode

1. Select a language from the dropdown (C, C++, Java, or Python)
2. Write your code in the editor
3. Enter input if your program needs it
4. Click "Run" to execute
5. View the output

### HTML/CSS Playground

1. Select "Web Development" from the language dropdown
2. Edit HTML, CSS, and JavaScript in their respective tabs
3. See the result in the preview panel

## Support

- Issues: [GitHub Issues](https://github.com/ankitk26/nextpen/issues)
- Repository: [GitHub](https://github.com/ankitk26/nextpen)
