"use strict";
"use client";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// minikit-provider.tsx
var minikit_provider_exports = {};
__export(minikit_provider_exports, {
  MiniKitProvider: () => MiniKitProvider,
  useMiniKit: () => useMiniKit
});
module.exports = __toCommonJS(minikit_provider_exports);
var import_react = require("react");

// minikit.ts
var import_idkit_core3 = require("@worldcoin/idkit-core");
var import_hashing = require("@worldcoin/idkit-core/hashing");

// helpers/send-webview-event.ts
var sendWebviewEvent = (payload) => {
  if (window.webkit) {
    window.webkit?.messageHandlers?.minikit?.postMessage?.(payload);
  } else if (window.Android) {
    window.Android.postMessage?.(JSON.stringify(payload));
  }
};

// types/errors.ts
var import_idkit_core = require("@worldcoin/idkit-core");
var import_idkit_core2 = require("@worldcoin/idkit-core");
var VerificationErrorMessage = {
  [import_idkit_core.AppErrorCodes.VerificationRejected]: "You've cancelled the request in World App.",
  [import_idkit_core.AppErrorCodes.MaxVerificationsReached]: "You have already verified the maximum number of times for this action.",
  [import_idkit_core.AppErrorCodes.CredentialUnavailable]: "It seems you do not have the verification level required by this app.",
  [import_idkit_core.AppErrorCodes.MalformedRequest]: "There was a problem with this request. Please try again or contact the app owner.",
  [import_idkit_core.AppErrorCodes.InvalidNetwork]: "Invalid network. If you are the app owner, visit docs.worldcoin.org/test for details.",
  [import_idkit_core.AppErrorCodes.InclusionProofFailed]: "There was an issue fetching your credential. Please try again.",
  [import_idkit_core.AppErrorCodes.InclusionProofPending]: "Your identity is still being registered. Please wait a few minutes and try again.",
  [import_idkit_core.AppErrorCodes.UnexpectedResponse]: "Unexpected response from your wallet. Please try again.",
  [import_idkit_core.AppErrorCodes.FailedByHostApp]: "Verification failed by the app. Please contact the app owner for details.",
  [import_idkit_core.AppErrorCodes.GenericError]: "Something unexpected went wrong. Please try again.",
  [import_idkit_core.AppErrorCodes.ConnectionFailed]: "Connection to your wallet failed. Please try again."
};
var MiniKitInstallErrorMessage = {
  ["unknown" /* Unknown */]: "Failed to install MiniKit.",
  ["already_installed" /* AlreadyInstalled */]: "MiniKit is already installed.",
  ["outside_of_worldapp" /* OutsideOfWorldApp */]: "MiniApp launched outside of WorldApp.",
  ["not_on_client" /* NotOnClient */]: "Window object is not available.",
  ["app_out_of_date" /* AppOutOfDate */]: "WorldApp is out of date. Please update the app."
};

// helpers/microphone/index.ts
var microphoneSetupDone = false;
var setupMicrophone = () => {
  if (microphoneSetupDone) {
    return;
  }
  if (typeof navigator !== "undefined" && !navigator.mediaDevices?.getUserMedia)
    return;
  const originalStop = MediaStreamTrack.prototype.stop;
  MediaStreamTrack.prototype.stop = function() {
    originalStop.call(this);
    if (this.readyState === "ended") {
      setTimeout(() => this.dispatchEvent(new Event("ended")), 0);
    }
  };
  const realGUM = navigator.mediaDevices.getUserMedia.bind(
    navigator.mediaDevices
  );
  const live = /* @__PURE__ */ new Set();
  async function wrapped(constraints) {
    const stream = await realGUM(constraints);
    sendWebviewEvent({
      command: "microphone-stream-started",
      version: 1,
      payload: {
        streamId: stream.id
      }
    });
    live.add(stream);
    stream.getTracks().forEach((t) => {
      t.addEventListener("ended", () => {
        sendWebviewEvent({
          command: "microphone-stream-ended",
          version: 1,
          payload: {
            streamId: stream.id
          }
        });
        live.delete(stream);
      });
    });
    return stream;
  }
  Object.defineProperty(navigator.mediaDevices, "getUserMedia", {
    value: wrapped,
    writable: false,
    configurable: false,
    enumerable: true
  });
  Object.freeze(navigator.mediaDevices);
  const stopAllMiniAppMicrophoneStreams = () => {
    live.forEach((s) => {
      s.getTracks().forEach((t) => {
        t.stop();
        sendWebviewEvent({
          command: "microphone-stream-ended",
          version: 1,
          payload: {
            streamId: s.id
          }
        });
      });
    });
    live.clear();
  };
  MiniKit.subscribe("miniapp-microphone" /* MiniAppMicrophone */, (payload) => {
    if (payload.status === "error" && (payload.error_code === "mini_app_permission_not_enabled" /* MiniAppPermissionNotEnabled */ || payload.error_code === "world_app_permission_not_enabled" /* WorldAppPermissionNotEnabled */)) {
      console.log("stopping all microphone streams", payload);
      stopAllMiniAppMicrophoneStreams();
    }
  });
  window.__stopAllMiniAppMicrophoneStreams = stopAllMiniAppMicrophoneStreams;
  microphoneSetupDone = true;
};

// helpers/payment/client.ts
var validatePaymentPayload = (payload) => {
  if (payload.tokens.some(
    (token) => token.symbol == "USDCE" /* USDC */ && parseFloat(token.token_amount) < 0.1
  )) {
    console.error("USDC amount should be greater than $0.1");
    return false;
  }
  if (payload.reference.length > 36) {
    console.error("Reference must not exceed 36 characters");
    return false;
  }
  if (typeof payload.reference !== "string") {
    throw new Error("Reference must be a string");
  }
  return true;
};

// helpers/proof/index.ts
var import_viem = require("viem");
var import_chains = require("viem/chains");
var semaphoreVerifierAddress = "0x79f46b94d134109EbcbbddBAeD0E88790409A0e4";
var semaphoreVerifierAbi = [
  {
    inputs: [
      {
        internalType: "uint256[8]",
        name: "proof",
        type: "uint256[8]"
      }
    ],
    name: "compressProof",
    outputs: [
      {
        internalType: "uint256[4]",
        name: "compressed",
        type: "uint256[4]"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];
var compressAndPadProof = async (proof, rpcUrl) => {
  try {
    const publicClient = (0, import_viem.createPublicClient)({
      chain: import_chains.worldchain,
      transport: (0, import_viem.http)(
        rpcUrl || "https://worldchain-mainnet.g.alchemy.com/public"
      )
    });
    const decodedProof = (0, import_viem.decodeAbiParameters)(
      [{ type: "uint256[8]" }],
      proof
    )[0];
    const compressedProof = await publicClient.readContract({
      address: semaphoreVerifierAddress,
      abi: semaphoreVerifierAbi,
      functionName: "compressProof",
      args: [decodedProof]
    });
    const paddedProof = [...compressedProof, 0n, 0n, 0n, 0n];
    return (0, import_viem.encodeAbiParameters)([{ type: "uint256[8]" }], [paddedProof]);
  } catch (e) {
    return proof;
  }
};

// helpers/share/index.ts
var MAX_FILES = 10;
var MAX_TOTAL_SIZE_MB = 50;
var MAX_TOTAL_SIZE_BYTES = MAX_TOTAL_SIZE_MB * 1024 * 1024;
var processFile = async (file) => {
  const buffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(buffer);
  let binaryString = "";
  const K_CHUNK_SIZE = 32768;
  for (let i = 0; i < uint8Array.length; i += K_CHUNK_SIZE) {
    const chunk = uint8Array.subarray(
      i,
      Math.min(i + K_CHUNK_SIZE, uint8Array.length)
    );
    binaryString += String.fromCharCode.apply(
      null,
      Array.from(chunk)
      // Convert Uint8Array chunk to number[]
    );
  }
  const base64Data = btoa(binaryString);
  return {
    name: file.name,
    type: file.type,
    data: base64Data
  };
};
var formatShareInput = async (input) => {
  if (!input.files) {
    return {
      title: input.title,
      text: input.text,
      url: input.url
    };
  }
  if (!Array.isArray(input.files)) {
    throw new Error('The "files" property must be an array.');
  }
  if (input.files.length === 0) {
  } else {
    if (input.files.length > MAX_FILES) {
      throw new Error(`Cannot share more than ${MAX_FILES} files.`);
    }
    let totalSize = 0;
    for (const file of input.files) {
      if (!(file instanceof File)) {
        throw new Error(
          `Each item in the 'files' array must be a File object. Received: ${typeof file}`
        );
      }
      totalSize += file.size;
    }
    if (totalSize > MAX_TOTAL_SIZE_BYTES) {
      throw new Error(`Total file size cannot exceed ${MAX_TOTAL_SIZE_MB}MB.`);
    }
  }
  const fileProcessingPromises = input.files.map((file) => processFile(file));
  const processedFiles = await Promise.all(fileProcessingPromises);
  return {
    files: processedFiles,
    title: input.title,
    text: input.text,
    url: input.url
  };
};

// helpers/siwe/siwe.ts
var import_viem2 = require("viem");
var import_chains2 = require("viem/chains");
var generateSiweMessage = (siweMessageData) => {
  let siweMessage = "";
  if (siweMessageData.scheme) {
    siweMessage += `${siweMessageData.scheme}://${siweMessageData.domain} wants you to sign in with your Ethereum account:
`;
  } else {
    siweMessage += `${siweMessageData.domain} wants you to sign in with your Ethereum account:
`;
  }
  if (siweMessageData.address) {
    siweMessage += `${siweMessageData.address}
`;
  } else {
    siweMessage += "{address}\n";
  }
  siweMessage += "\n";
  if (siweMessageData.statement) {
    siweMessage += `${siweMessageData.statement}
`;
  }
  siweMessage += "\n";
  siweMessage += `URI: ${siweMessageData.uri}
`;
  siweMessage += `Version: ${siweMessageData.version}
`;
  siweMessage += `Chain ID: ${siweMessageData.chain_id}
`;
  siweMessage += `Nonce: ${siweMessageData.nonce}
`;
  siweMessage += `Issued At: ${siweMessageData.issued_at}
`;
  if (siweMessageData.expiration_time) {
    siweMessage += `Expiration Time: ${siweMessageData.expiration_time}
`;
  }
  if (siweMessageData.not_before) {
    siweMessage += `Not Before: ${siweMessageData.not_before}
`;
  }
  if (siweMessageData.request_id) {
    siweMessage += `Request ID: ${siweMessageData.request_id}
`;
  }
  return siweMessage;
};

// helpers/siwe/validate-wallet-auth-command-input.ts
var validateWalletAuthCommandInput = (params) => {
  if (!params.nonce) {
    return { valid: false, message: "'nonce' is required" };
  }
  if (params.nonce.length < 8) {
    return { valid: false, message: "'nonce' must be at least 8 characters" };
  }
  if (params.statement && params.statement.includes("\n")) {
    return { valid: false, message: "'statement' must not contain newlines" };
  }
  if (params.expirationTime && new Date(params.expirationTime) < /* @__PURE__ */ new Date()) {
    return { valid: false, message: "'expirationTime' must be in the future" };
  }
  if (params.expirationTime && new Date(params.expirationTime) > new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3)) {
    return { valid: false, message: "'expirationTime' must be within 7 days" };
  }
  if (params.notBefore && new Date(params.notBefore) > new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3)) {
    return { valid: false, message: "'notBefore' must be within 7 days" };
  }
  return { valid: true };
};

// helpers/transaction/validate-payload.ts
var isValidHex = (str) => {
  return /^0x[0-9A-Fa-f]+$/.test(str);
};
var objectValuesToArrayRecursive = (input) => {
  if (input === null || typeof input !== "object") {
    return input;
  }
  if (Array.isArray(input)) {
    return input.map((item) => objectValuesToArrayRecursive(item));
  }
  const values = Object.values(input);
  return values.map((value) => objectValuesToArrayRecursive(value));
};
var processPayload = (payload) => {
  if (typeof payload === "boolean" || typeof payload === "string" || payload === null || payload === void 0) {
    return payload;
  }
  if (typeof payload === "number" || typeof payload === "bigint") {
    return String(payload);
  }
  if (Array.isArray(payload)) {
    return payload.map((value) => processPayload(value));
  }
  if (typeof payload === "object") {
    const result = { ...payload };
    if ("value" in result && result.value !== void 0) {
      if (typeof result.value !== "string") {
        result.value = String(result.value);
      }
      if (!isValidHex(result.value)) {
        console.error(
          "Transaction value must be a valid hex string",
          result.value
        );
        throw new Error(
          `Transaction value must be a valid hex string: ${result.value}`
        );
      }
    }
    for (const key in result) {
      if (Object.prototype.hasOwnProperty.call(result, key)) {
        result[key] = processPayload(result[key]);
      }
    }
    return result;
  }
  return payload;
};
var validateSendTransactionPayload = (payload) => {
  if (payload.formatPayload) {
    const formattedPayload = processPayload(payload);
    formattedPayload.transaction = formattedPayload.transaction.map((tx) => {
      const args = objectValuesToArrayRecursive(tx.args);
      return {
        ...tx,
        args
      };
    });
    return formattedPayload;
  }
  return payload;
};

// helpers/usernames/index.ts
var getUserProfile = async (address) => {
  const res = await fetch("https://usernames.worldcoin.org/api/v1/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      addresses: [address]
    })
  });
  const usernames = await res.json();
  return usernames?.[0] ?? { username: null, profile_picture_url: null };
};

// minikit.ts
var sendMiniKitEvent = (payload) => {
  sendWebviewEvent(payload);
};
var _MiniKit = class _MiniKit {
  static sendInit() {
    sendWebviewEvent({
      command: "init",
      payload: {
        version: this.MINIKIT_VERSION,
        minorVersion: this.MINIKIT_MINOR_VERSION
      }
    });
  }
  static subscribe(event, handler) {
    if (event === "miniapp-wallet-auth" /* MiniAppWalletAuth */) {
      const originalHandler = handler;
      const wrappedHandler = async (payload) => {
        if (payload.status === "success") {
          _MiniKit.user.walletAddress = payload.address;
          try {
            const user = await _MiniKit.getUserByAddress(payload.address);
            _MiniKit.user = { ..._MiniKit.user, ...user };
          } catch (error) {
            console.error("Failed to fetch user profile:", error);
          }
        }
        originalHandler(payload);
      };
      this.listeners[event] = wrappedHandler;
    } else if (event === "miniapp-verify-action" /* MiniAppVerifyAction */) {
      const originalHandler = handler;
      const wrappedHandler = (payload) => {
        if (payload.status === "success" && payload.verification_level === import_idkit_core3.VerificationLevel.Orb) {
          compressAndPadProof(payload.proof).then(
            (compressedProof) => {
              payload.proof = compressedProof;
              originalHandler(payload);
            }
          );
        } else {
          originalHandler(payload);
        }
      };
      this.listeners[event] = wrappedHandler;
    } else {
      this.listeners[event] = handler;
    }
  }
  static unsubscribe(event) {
    delete this.listeners[event];
  }
  static trigger(event, payload) {
    if (!this.listeners[event]) {
      console.error(
        `No handler for event ${event}, payload: ${JSON.stringify(payload)}`
      );
      return;
    }
    this.listeners[event](payload);
  }
  static async awaitCommand(event, command, executor) {
    return new Promise((resolve) => {
      let commandPayload = null;
      const handleAndUnsubscribe = (payload) => {
        this.unsubscribe(event);
        resolve({ commandPayload, finalPayload: payload });
      };
      this.subscribe(event, handleAndUnsubscribe);
      commandPayload = executor();
    });
  }
  static commandsValid(worldAppSupportedCommands) {
    let allCommandsValid = true;
    Object.entries(this.miniKitCommandVersion).forEach(
      ([minikitCommandName, version]) => {
        const commandInput = worldAppSupportedCommands.find(
          (command) => command.name === minikitCommandName
        );
        let isCommandValid = false;
        if (!commandInput) {
          console.warn(
            `Command ${minikitCommandName} is not supported by the app. Try updating the app version`
          );
        } else {
          if (commandInput.supported_versions.includes(version)) {
            _MiniKit.isCommandAvailable[minikitCommandName] = true;
            isCommandValid = true;
          } else {
            isCommandValid = true;
            console.warn(
              `Command ${minikitCommandName} version ${version} is not supported by the app. Supported versions: ${commandInput.supported_versions.join(", ")}. This is not an error, but it is recommended to update the World App version.`
            );
            _MiniKit.isCommandAvailable[minikitCommandName] = isCommandValid;
          }
        }
        if (!isCommandValid) {
          allCommandsValid = false;
        }
      }
    );
    return allCommandsValid;
  }
  static install(appId) {
    if (typeof window === "undefined" || Boolean(window.MiniKit)) {
      return {
        success: false,
        errorCode: "already_installed" /* AlreadyInstalled */,
        errorMessage: MiniKitInstallErrorMessage["already_installed" /* AlreadyInstalled */]
      };
    }
    if (!appId) {
      console.warn("App ID not provided during install");
    } else {
      _MiniKit.appId = appId;
    }
    if (!window.WorldApp) {
      return {
        success: false,
        errorCode: "outside_of_worldapp" /* OutsideOfWorldApp */,
        errorMessage: MiniKitInstallErrorMessage["outside_of_worldapp" /* OutsideOfWorldApp */]
      };
    }
    _MiniKit.user.optedIntoOptionalAnalytics = window.WorldApp.is_optional_analytics;
    _MiniKit.user.deviceOS = window.WorldApp.device_os;
    _MiniKit.user.worldAppVersion = window.WorldApp.world_app_version;
    _MiniKit.deviceProperties.safeAreaInsets = window.WorldApp.safe_area_insets;
    _MiniKit.deviceProperties.deviceOS = window.WorldApp.device_os;
    _MiniKit.deviceProperties.worldAppVersion = window.WorldApp.world_app_version;
    try {
      window.MiniKit = _MiniKit;
      this.sendInit();
    } catch (error) {
      console.error(
        MiniKitInstallErrorMessage["unknown" /* Unknown */],
        error
      );
      return {
        success: false,
        errorCode: "unknown" /* Unknown */,
        errorMessage: MiniKitInstallErrorMessage["unknown" /* Unknown */]
      };
    }
    _MiniKit.isReady = true;
    setupMicrophone();
    if (!this.commandsValid(window.WorldApp.supported_commands)) {
      return {
        success: false,
        errorCode: "app_out_of_date" /* AppOutOfDate */,
        errorMessage: MiniKitInstallErrorMessage["app_out_of_date" /* AppOutOfDate */]
      };
    }
    return { success: true };
  }
  static isInstalled(debug) {
    const isInstalled = _MiniKit.isReady && Boolean(window.MiniKit);
    if (!isInstalled)
      console.error(
        "MiniKit is not installed. Make sure you're running the application inside of World App"
      );
    if (debug && isInstalled) console.log("MiniKit is alive!");
    return isInstalled;
  }
};
_MiniKit.MINIKIT_VERSION = 1;
_MiniKit.MINIKIT_MINOR_VERSION = 96;
_MiniKit.miniKitCommandVersion = {
  ["verify" /* Verify */]: 1,
  ["pay" /* Pay */]: 1,
  ["wallet-auth" /* WalletAuth */]: 2,
  ["send-transaction" /* SendTransaction */]: 1,
  ["sign-message" /* SignMessage */]: 1,
  ["sign-typed-data" /* SignTypedData */]: 1,
  ["share-contacts" /* ShareContacts */]: 1,
  ["request-permission" /* RequestPermission */]: 1,
  ["get-permissions" /* GetPermissions */]: 1,
  ["send-haptic-feedback" /* SendHapticFeedback */]: 1,
  ["share" /* Share */]: 1
};
_MiniKit.isCommandAvailable = {
  ["verify" /* Verify */]: false,
  ["pay" /* Pay */]: false,
  ["wallet-auth" /* WalletAuth */]: false,
  ["send-transaction" /* SendTransaction */]: false,
  ["sign-message" /* SignMessage */]: false,
  ["sign-typed-data" /* SignTypedData */]: false,
  ["share-contacts" /* ShareContacts */]: false,
  ["request-permission" /* RequestPermission */]: false,
  ["get-permissions" /* GetPermissions */]: false,
  ["send-haptic-feedback" /* SendHapticFeedback */]: false,
  ["share" /* Share */]: false
};
_MiniKit.listeners = {
  ["miniapp-verify-action" /* MiniAppVerifyAction */]: () => {
  },
  ["miniapp-payment" /* MiniAppPayment */]: () => {
  },
  ["miniapp-wallet-auth" /* MiniAppWalletAuth */]: () => {
  },
  ["miniapp-send-transaction" /* MiniAppSendTransaction */]: () => {
  },
  ["miniapp-sign-message" /* MiniAppSignMessage */]: () => {
  },
  ["miniapp-sign-typed-data" /* MiniAppSignTypedData */]: () => {
  },
  ["miniapp-share-contacts" /* MiniAppShareContacts */]: () => {
  },
  ["miniapp-request-permission" /* MiniAppRequestPermission */]: () => {
  },
  ["miniapp-get-permissions" /* MiniAppGetPermissions */]: () => {
  },
  ["miniapp-send-haptic-feedback" /* MiniAppSendHapticFeedback */]: () => {
  },
  ["miniapp-share" /* MiniAppShare */]: () => {
  },
  ["miniapp-microphone" /* MiniAppMicrophone */]: () => {
  }
};
_MiniKit.appId = null;
_MiniKit.user = {};
_MiniKit.isReady = false;
_MiniKit.deviceProperties = {};
_MiniKit.getUserByAddress = async (address) => {
  const userProfile = await getUserProfile(
    address ?? _MiniKit.user.walletAddress
  );
  return {
    walletAddress: address ?? _MiniKit.user.walletAddress,
    username: userProfile.username,
    profilePictureUrl: userProfile.profile_picture_url
  };
};
_MiniKit.getUserByUsername = async (username) => {
  const res = await fetch(
    `https://usernames.worldcoin.org/api/v1/${username}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  const user = await res.json();
  return {
    walletAddress: user.address,
    username: user.username,
    profilePictureUrl: user.profile_picture_url
  };
};
// Simply re-exporting the existing function
_MiniKit.getUserInfo = _MiniKit.getUserByAddress;
_MiniKit.commands = {
  verify: (payload) => {
    if (typeof window === "undefined" || !_MiniKit.isCommandAvailable["verify" /* Verify */]) {
      console.error(
        "'verify' command is unavailable. Check MiniKit.install() or update the app version"
      );
      return null;
    }
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const eventPayload = {
      action: (0, import_hashing.encodeAction)(payload.action),
      signal: (0, import_hashing.generateSignal)(payload.signal).digest,
      verification_level: payload.verification_level || import_idkit_core3.VerificationLevel.Orb,
      timestamp
    };
    sendMiniKitEvent({
      command: "verify" /* Verify */,
      version: _MiniKit.miniKitCommandVersion["verify" /* Verify */],
      payload: eventPayload
    });
    return eventPayload;
  },
  pay: (payload) => {
    if (typeof window === "undefined" || !_MiniKit.isCommandAvailable["pay" /* Pay */]) {
      console.error(
        "'pay' command is unavailable. Check MiniKit.install() or update the app version"
      );
      return null;
    }
    if (!validatePaymentPayload(payload)) {
      return null;
    }
    const eventPayload = {
      ...payload,
      network: "worldchain" /* WorldChain */
    };
    sendMiniKitEvent({
      command: "pay" /* Pay */,
      version: _MiniKit.miniKitCommandVersion["pay" /* Pay */],
      payload: eventPayload
    });
    return eventPayload;
  },
  walletAuth: (payload) => {
    if (typeof window === "undefined" || !_MiniKit.isCommandAvailable["wallet-auth" /* WalletAuth */]) {
      console.error(
        "'walletAuth' command is unavailable. Check MiniKit.install() or update the app version"
      );
      return null;
    }
    const validationResult = validateWalletAuthCommandInput(payload);
    if (!validationResult.valid) {
      console.error(
        "Failed to validate wallet auth input:\n\n -->",
        validationResult.message
      );
      return null;
    }
    let protocol = null;
    try {
      const currentUrl = new URL(window.location.href);
      protocol = currentUrl.protocol.split(":")[0];
    } catch (error) {
      console.error("Failed to get current URL", error);
      return null;
    }
    const siweMessage = generateSiweMessage({
      scheme: protocol,
      domain: window.location.host,
      statement: payload.statement ?? void 0,
      uri: window.location.href,
      version: "1",
      chain_id: 480,
      nonce: payload.nonce,
      issued_at: (/* @__PURE__ */ new Date()).toISOString(),
      expiration_time: payload.expirationTime?.toISOString() ?? void 0,
      not_before: payload.notBefore?.toISOString() ?? void 0,
      request_id: payload.requestId ?? void 0
    });
    const walletAuthPayload = { siweMessage };
    const walletAuthVersion = _MiniKit.user.worldAppVersion && _MiniKit.user.worldAppVersion > 2087900 ? _MiniKit.miniKitCommandVersion["wallet-auth" /* WalletAuth */] : 1;
    sendMiniKitEvent({
      command: "wallet-auth" /* WalletAuth */,
      version: walletAuthVersion,
      payload: walletAuthPayload
    });
    return walletAuthPayload;
  },
  sendTransaction: (payload) => {
    if (typeof window === "undefined" || !_MiniKit.isCommandAvailable["send-transaction" /* SendTransaction */]) {
      console.error(
        "'sendTransaction' command is unavailable. Check MiniKit.install() or update the app version"
      );
      return null;
    }
    payload.formatPayload = payload.formatPayload !== false;
    const validatedPayload = validateSendTransactionPayload(payload);
    sendMiniKitEvent({
      command: "send-transaction" /* SendTransaction */,
      version: _MiniKit.miniKitCommandVersion["send-transaction" /* SendTransaction */],
      payload: validatedPayload
    });
    return validatedPayload;
  },
  signMessage: (payload) => {
    if (typeof window === "undefined" || !_MiniKit.isCommandAvailable["sign-message" /* SignMessage */]) {
      console.error(
        "'signMessage' command is unavailable. Check MiniKit.install() or update the app version"
      );
      return null;
    }
    sendMiniKitEvent({
      command: "sign-message" /* SignMessage */,
      version: _MiniKit.miniKitCommandVersion["sign-message" /* SignMessage */],
      payload
    });
    return payload;
  },
  signTypedData: (payload) => {
    if (typeof window === "undefined" || !_MiniKit.isCommandAvailable["sign-typed-data" /* SignTypedData */]) {
      console.error(
        "'signTypedData' command is unavailable. Check MiniKit.install() or update the app version"
      );
      return null;
    }
    if (!payload.chainId) {
      payload.chainId = 480;
    }
    sendMiniKitEvent({
      command: "sign-typed-data" /* SignTypedData */,
      version: _MiniKit.miniKitCommandVersion["sign-typed-data" /* SignTypedData */],
      payload
    });
    return payload;
  },
  shareContacts: (payload) => {
    if (typeof window === "undefined" || !_MiniKit.isCommandAvailable["share-contacts" /* ShareContacts */]) {
      console.error(
        "'shareContacts' command is unavailable. Check MiniKit.install() or update the app version"
      );
      return null;
    }
    sendMiniKitEvent({
      command: "share-contacts" /* ShareContacts */,
      version: _MiniKit.miniKitCommandVersion["share-contacts" /* ShareContacts */],
      payload
    });
    return payload;
  },
  requestPermission: (payload) => {
    if (typeof window === "undefined" || !_MiniKit.isCommandAvailable["request-permission" /* RequestPermission */]) {
      console.error(
        "'requestPermission' command is unavailable. Check MiniKit.install() or update the app version"
      );
      return null;
    }
    sendMiniKitEvent({
      command: "request-permission" /* RequestPermission */,
      version: _MiniKit.miniKitCommandVersion["request-permission" /* RequestPermission */],
      payload
    });
    return payload;
  },
  getPermissions: () => {
    if (typeof window === "undefined" || !_MiniKit.isCommandAvailable["get-permissions" /* GetPermissions */]) {
      console.error(
        "'getPermissions' command is unavailable. Check MiniKit.install() or update the app version"
      );
      return null;
    }
    sendMiniKitEvent({
      command: "get-permissions" /* GetPermissions */,
      version: _MiniKit.miniKitCommandVersion["get-permissions" /* GetPermissions */],
      payload: {}
    });
    return {
      status: "sent"
    };
  },
  sendHapticFeedback: (payload) => {
    if (typeof window === "undefined" || !_MiniKit.isCommandAvailable["send-haptic-feedback" /* SendHapticFeedback */]) {
      console.error(
        "'sendHapticFeedback' command is unavailable. Check MiniKit.install() or update the app version"
      );
      return null;
    }
    sendMiniKitEvent({
      command: "send-haptic-feedback" /* SendHapticFeedback */,
      version: _MiniKit.miniKitCommandVersion["send-haptic-feedback" /* SendHapticFeedback */],
      payload
    });
    return payload;
  },
  // We return share input here because the payload is formatted asynchronously
  share: (payload) => {
    if (typeof window === "undefined" || !_MiniKit.isCommandAvailable["share" /* Share */]) {
      console.error(
        "'share' command is unavailable. Check MiniKit.install() or update the app version"
      );
      return null;
    }
    if (_MiniKit.deviceProperties.deviceOS === "ios" && typeof navigator !== "undefined") {
      sendMiniKitEvent({
        command: "share" /* Share */,
        version: _MiniKit.miniKitCommandVersion["share" /* Share */],
        payload
      });
      navigator.share(payload);
    } else {
      formatShareInput(payload).then((formattedResult) => {
        sendMiniKitEvent({
          command: "share" /* Share */,
          version: _MiniKit.miniKitCommandVersion["share" /* Share */],
          payload: formattedResult
        });
      }).catch((error) => {
        console.error("Failed to format share input", error);
      });
      _MiniKit.subscribe("miniapp-share" /* MiniAppShare */, (payload2) => {
        console.log("Share Response", payload2);
      });
    }
    return payload;
  }
};
/**
 * This object contains async versions of all the commands.
 * Instead of using event listeners, you can just `await` these.
 *
 * They return a standardized object
 *
 * commandPayload - object returned by the command function
 *
 * finalPayload - object returned by the event listener, or in other words, WorldApp response
 */
_MiniKit.commandsAsync = {
  verify: async (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await _MiniKit.awaitCommand(
          "miniapp-verify-action" /* MiniAppVerifyAction */,
          "verify" /* Verify */,
          () => _MiniKit.commands.verify(payload)
        );
        if (response.finalPayload.status === "success" && response.finalPayload.verification_level === import_idkit_core3.VerificationLevel.Orb) {
          response.finalPayload.proof = await compressAndPadProof(
            response.finalPayload.proof
          );
        }
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },
  pay: async (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await _MiniKit.awaitCommand(
          "miniapp-payment" /* MiniAppPayment */,
          "pay" /* Pay */,
          () => _MiniKit.commands.pay(payload)
        );
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },
  walletAuth: async (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await _MiniKit.awaitCommand(
          "miniapp-wallet-auth" /* MiniAppWalletAuth */,
          "wallet-auth" /* WalletAuth */,
          () => _MiniKit.commands.walletAuth(payload)
        );
        return resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },
  sendTransaction: async (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await _MiniKit.awaitCommand(
          "miniapp-send-transaction" /* MiniAppSendTransaction */,
          "send-transaction" /* SendTransaction */,
          () => _MiniKit.commands.sendTransaction(payload)
        );
        return resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },
  signMessage: async (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await _MiniKit.awaitCommand(
          "miniapp-sign-message" /* MiniAppSignMessage */,
          "sign-message" /* SignMessage */,
          () => _MiniKit.commands.signMessage(payload)
        );
        return resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },
  signTypedData: async (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await _MiniKit.awaitCommand(
          "miniapp-sign-typed-data" /* MiniAppSignTypedData */,
          "sign-typed-data" /* SignTypedData */,
          () => _MiniKit.commands.signTypedData(payload)
        );
        return resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },
  shareContacts: async (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await _MiniKit.awaitCommand(
          "miniapp-share-contacts" /* MiniAppShareContacts */,
          "share-contacts" /* ShareContacts */,
          () => _MiniKit.commands.shareContacts(payload)
        );
        return resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },
  requestPermission: async (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await _MiniKit.awaitCommand(
          "miniapp-request-permission" /* MiniAppRequestPermission */,
          "request-permission" /* RequestPermission */,
          () => _MiniKit.commands.requestPermission(payload)
        );
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },
  getPermissions: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await _MiniKit.awaitCommand(
          "miniapp-get-permissions" /* MiniAppGetPermissions */,
          "get-permissions" /* GetPermissions */,
          () => _MiniKit.commands.getPermissions()
        );
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },
  sendHapticFeedback: async (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await _MiniKit.awaitCommand(
          "miniapp-send-haptic-feedback" /* MiniAppSendHapticFeedback */,
          "send-haptic-feedback" /* SendHapticFeedback */,
          () => _MiniKit.commands.sendHapticFeedback(payload)
        );
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },
  share: async (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await _MiniKit.awaitCommand(
          "miniapp-share" /* MiniAppShare */,
          "share" /* Share */,
          () => _MiniKit.commands.share(payload)
        );
        resolve({
          commandPayload: response.commandPayload,
          finalPayload: response.finalPayload
        });
      } catch (error) {
        reject(error);
      }
    });
  }
};
var MiniKit = _MiniKit;

// minikit-provider.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var MiniKitContext = (0, import_react.createContext)({
  isInstalled: void 0
});
var MiniKitProvider = ({
  children,
  props
}) => {
  const [isInstalled, setIsInstalled] = (0, import_react.useState)(
    void 0
  );
  (0, import_react.useEffect)(() => {
    const { success } = MiniKit.install(props?.appId);
    if (!success) return setIsInstalled(false);
    MiniKit.commandsAsync.getPermissions().then(({ commandPayload: _, finalPayload }) => {
      if (finalPayload.status === "success") {
        MiniKit.user.permissions = {
          notifications: finalPayload.permissions.notifications,
          contacts: finalPayload.permissions.contacts
        };
      }
    });
    setIsInstalled(success);
  }, [props?.appId]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniKitContext.Provider, { value: { isInstalled }, children });
};
var useMiniKit = () => {
  const context = (0, import_react.useContext)(MiniKitContext);
  if (context === void 0) {
    throw new Error("useMiniKit must be used within a MiniKitProvider");
  }
  return context;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MiniKitProvider,
  useMiniKit
});
