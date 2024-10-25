
# Env Setup Helper

This repository provides a Node.js script to streamline setting up environment variables in a `.env` file. Intended for easy integration into any project, this tool allows teams to define required environment keys, so any developer can quickly configure their environment by running a single command.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Customizable Keys:** Define your own required environment keys within the script.
- **Interactive CLI Prompts:** Prompts users to input missing values directly from the command line.
- **Automatic `.env` File Update:** Saves any new values to the `.env` file, ensuring it’s always up-to-date.

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/env-setup-helper.git
   cd env-setup-helper
   ```

2. **Install Node.js (if not installed):**
   This script requires [Node.js](https://nodejs.org/) to run.

3. **Install Dependencies:**
   - Install `esbuild-register` to support TypeScript in Node.js:
     ```bash
     npm install esbuild-register
     ```

## Setup Instructions

1. **Define Required Environment Keys:**
   - Open `setup-env.ts` and customize the `REQUIRED_ENV_KEYS` array to include the environment variables your project requires.

2. **Add the Script to Your Project:**
   - Copy the `setup-env.ts` file into the root directory of your project.

3. **Add the Script to `package.json`:**
   - To simplify running the setup, add the following script to your `package.json`:
   ```json
   "scripts": {
     "setup-env": "node -r esbuild-register setup-env.ts"
   }
   ```

4. **Push to Your Repository:**
   - Commit and push the changes to your project repository so other team members can access and use the setup.

## Usage

Once the setup is added to your project, new developers can simply run:
```bash
npm run setup-env
```
Upon running, the script will:
1. Check for the presence of a `.env` file in the root directory.
2. Verify that all required environment variables are present.
3. Prompt the developer to enter any missing values in the terminal.
4. Save the updated variables to the `.env` file.

### Expected Output

- **All variables present:** 
  ```bash
  ✅ All required environment variables are already set.
  🎉 Environment setup completed successfully!
  ```
- **Missing variables found:** 
  ```bash
  🔍 Step 1: Checking for missing environment variables...
  ⚠️ Missing YOUR_ENV_KEY. Please provide a value:
  ✅ .env file updated with the missing variables.
  🎉 Environment setup completed successfully!
  ```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License.
