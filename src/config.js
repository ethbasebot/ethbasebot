import dotenv from "dotenv";

dotenv.config();

const ETH_RPC_URL = process.env.ETH_RPC_URL || "";
const BASE_RPC_URL = process.env.BASE_RPC_URL || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const BASESCAN_API_KEY = process.env.BASESCAN_API_KEY || "";
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";
const SCAN_INTERVAL_SECONDS = Number(process.env.SCAN_INTERVAL_SECONDS ?? 20);

function getExplorerDomain(apiUrl) {
  return apiUrl.replace(/^https?:\/\/(api\.)?/, "").replace(/\/api$/, "");
}

const chains = {
  ETH: {
    name: "Ethereum",
    rpcUrl: ETH_RPC_URL,
    explorerApiUrl: "https://api.etherscan.io/api",
    explorerApiKey: ETHERSCAN_API_KEY,
    explorerDomain: getExplorerDomain("https://api.etherscan.io/api"),
    nativeWrapper: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    factories: [
      "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
      "0xC0AEe478e3658e2610c5F7A4A2E1777Ce9e4f2Ac"
    ]
  },
  BASE: {
    name: "Base",
    rpcUrl: BASE_RPC_URL || "https://mainnet.base.org",
    explorerApiUrl: "https://api.basescan.org/api",
    explorerApiKey: BASESCAN_API_KEY,
    explorerDomain: getExplorerDomain("https://api.basescan.org/api"),
    nativeWrapper: "0x4200000000000000000000000000000000000006",
    factories: [
      "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
      "0xC0AEe478e3658e2610c5F7A4A2E1777Ce9e4f2Ac"
    ]
  }
};

function validateConfig() {
  const missing = [];
  if (!ETH_RPC_URL) missing.push("ETH_RPC_URL");
  if (!BASE_RPC_URL) missing.push("BASE_RPC_URL");
  if (!ETHERSCAN_API_KEY) missing.push("ETHERSCAN_API_KEY");
  if (!BASESCAN_API_KEY) missing.push("BASESCAN_API_KEY");
  if (!TELEGRAM_BOT_TOKEN) missing.push("TELEGRAM_BOT_TOKEN");
  if (!TELEGRAM_CHAT_ID) missing.push("TELEGRAM_CHAT_ID");
  if (missing.length) {
    throw new Error(`Missing environment variables: ${missing.join(", ")}`);
  }
}

function loadConfig() {
  validateConfig();
  return {
    telegramBotToken: TELEGRAM_BOT_TOKEN,
    telegramChatId: TELEGRAM_CHAT_ID,
    scanIntervalSeconds: SCAN_INTERVAL_SECONDS,
    chains
  };
}

export { loadConfig };
