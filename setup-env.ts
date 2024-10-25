import { promises as fs } from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

const REQUIRED_ENV_KEYS: string[] = [];

function question(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

async function loadEnvFile(): Promise<Record<string, string>> {
  const envPath = path.join(process.cwd(), '.env');
  try {
    const envFile = await fs.readFile(envPath, 'utf-8');
    return envFile
      .split('\n')
      .filter((line) => line.trim() !== '' && !line.startsWith('#'))
      .reduce((envVars, line) => {
        const [key, value] = line.split('=');
        envVars[key.trim()] = value?.trim();
        return envVars;
      }, {} as Record<string, string>);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.error('❌ No .env file found. Please create a .env file in the root directory.');
      process.exit(1);
    } else {
      console.error('❌ An error occurred while reading the .env file:', error);
      process.exit(1);
    }
  }
}

async function checkMissingEnvVars(currentEnvVars: Record<string, string>): Promise<Record<string, string>> {
  const missingEnvVars: Record<string, string> = {};

  for (const key of REQUIRED_ENV_KEYS) {
    if (!currentEnvVars[key]) {
      const value = await question(`⚠️ Missing ${key}. Please provide a value: `);
      missingEnvVars[key] = value;
    }
  }

  return missingEnvVars;
}

async function writeEnvFile(envVars: Record<string, string>) {
  const envPath = path.join(process.cwd(), '.env');
  const envContent = Object.entries(envVars)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  await fs.writeFile(envPath, envContent);
  console.log('✅ .env file updated with the missing variables.');
}

async function main() {
  console.log('🔍 Step 1: Checking for missing environment variables...');

  if (REQUIRED_ENV_KEYS.length === 0) {
    console.error('⚠️ No required environment variables specified. Please add keys to REQUIRED_ENV_KEYS in setup-env.ts.');
    process.exit(1);
  }

  const currentEnvVars = await loadEnvFile();

  const missingEnvVars = await checkMissingEnvVars(currentEnvVars);

  if (Object.keys(missingEnvVars).length === 0) {
    console.log('✅ All required environment variables are already set.');
  } else {
    const updatedEnvVars = { ...currentEnvVars, ...missingEnvVars };
    await writeEnvFile(updatedEnvVars);
    console.log('📝 Missing environment variables have been added.');
  }

  console.log('🎉 Environment setup completed successfully!');
}

main().catch(console.error);
