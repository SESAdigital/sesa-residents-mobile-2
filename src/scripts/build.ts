import { execSync } from 'child_process';

type Format = 'apk' | 'aab';
type BuildType = 'debug' | 'release';
type Flavor = 'production' | 'staging' | 'development';

// -------- Allowed values --------
const validFlavors: Flavor[] = ['production', 'staging', 'development'];
const validTypes: BuildType[] = ['debug', 'release'];
const validFormats: Format[] = ['apk', 'aab'];

// -------- Parse args --------
const args = process.argv.slice(2);
const getArg = (key: string): string | undefined =>
  args.find(arg => arg.startsWith(`--${key}=`))?.split('=')[1];

const flavor = (getArg('flavor') || 'production') as Flavor;
const type = (getArg('type') || 'debug') as BuildType;
const format = (getArg('format') || 'apk') as Format;

// -------- Validation --------
function validate() {
  if (!validFlavors.includes(flavor)) {
    console.error(`❌ Invalid flavor: "${flavor}"`);
    process.exit(1);
  }

  if (!validTypes.includes(type)) {
    console.error(`❌ Invalid type: "${type}"`);
    process.exit(1);
  }

  if (!validFormats.includes(format)) {
    console.error(`❌ Invalid format: "${format}"`);
    process.exit(1);
  }
}

validate();

// env mapping
const envMap: Record<Flavor, string> = {
  production: '.env.production',
  staging: '.env.staging',
  development: '.env.development',
};

// appIdSuffix
const suffixMap: Record<Flavor, string> = {
  production: '',
  staging: 'staging',
  development: 'development',
};

const envFile = envMap[flavor];
const suffix = suffixMap[flavor];

// -------- Commands --------
try {
  console.warn(`\n📦 Flavor: ${flavor} | Type: ${type} | Format: ${format}\n`);

  // -------- LOCAL (DEBUG) --------
  if (type === 'debug') {
    let cmd = `npx react-native run-android --active-arch-only --mode=${flavor}Debug`;

    if (suffix) {
      cmd += ` --appIdSuffix=${suffix}`;
    }

    console.warn(`🚀 Running app locally...\n`);
    console.warn(`${cmd} \n`);
    execSync(cmd, { stdio: 'inherit' });
  }

  // -------- BUILD (RELEASE) --------
  else {
    // 2. Capitalize flavor for the Gradle task (e.g., "staging" -> "Staging")
    const capitalizedFlavor = flavor.charAt(0).toUpperCase() + flavor.slice(1);

    // 3. Construct the specific task (e.g., "assembleStagingRelease")
    const taskPrefix = format === 'aab' ? 'bundle' : 'assemble';
    const gradleTask = `${taskPrefix}${capitalizedFlavor}Release`;

    // 4. Combine them into the final command
    // Use "SET" for Windows and inline variables for Mac/Linux
    const isWindows = process.platform === 'win32';
    const envPrefix = isWindows
      ? `set ENVFILE=${envFile} &&`
      : `ENVFILE=${envFile}`;

    const cmd = `cd android && ${envPrefix} gradlew clean && gradlew ${gradleTask}`;

    console.warn(`🚀 Building ${format.toUpperCase()}...\n`);
    console.warn(`${cmd} \n`);
    execSync(cmd, { stdio: 'inherit' });
  }
} catch (e) {
  console.error('\n❌ Failed', e);
  process.exit(1);
}

/**
 * ============================================
 * ✅ AVAILABLE COMMAND COMBINATIONS
 * ============================================
 *
 * ▶️ LOCAL RUN (DEBUG)
 * --------------------------------------------
 * production:
 * npx ts-node build.ts --flavor=production --type=debug
 *
 * staging:
 * npx ts-node build.ts --flavor=staging --type=debug
 *
 * development:
 * npx ts-node build.ts --flavor=development --type=debug
 *
 *
 * 📦 BUILD APK (RELEASE)
 * --------------------------------------------
 * production:
 * npx ts-node build.ts --flavor=production --type=release --format=apk
 *
 * staging:
 * npx ts-node build.ts --flavor=staging --type=release --format=apk
 *
 * development:
 * npx ts-node build.ts --flavor=development --type=release --format=apk
 *
 *
 * 📦 BUILD AAB (RELEASE)
 * --------------------------------------------
 * production:
 * npx ts-node build.ts --flavor=production --type=release --format=aab
 *
 * staging:
 * npx ts-node build.ts --flavor=staging --type=release --format=aab
 *
 * development:
 * npx ts-node build.ts --flavor=development --type=release --format=aab
 *
 *
 * 🧠 DEFAULTS (if no args passed)
 * --------------------------------------------
 * flavor = production
 * type   = debug
 * format = apk
 *
 * Example:
 * npx ts-node build.ts
 *
 * ============================================
 */
