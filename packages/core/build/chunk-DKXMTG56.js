// types/errors.ts
import { AppErrorCodes } from "@worldcoin/idkit-core";
import { AppErrorCodes as AppErrorCodes2 } from "@worldcoin/idkit-core";
var VerificationErrorMessage = {
  [AppErrorCodes.VerificationRejected]: "You've cancelled the request in World App.",
  [AppErrorCodes.MaxVerificationsReached]: "You have already verified the maximum number of times for this action.",
  [AppErrorCodes.CredentialUnavailable]: "It seems you do not have the verification level required by this app.",
  [AppErrorCodes.MalformedRequest]: "There was a problem with this request. Please try again or contact the app owner.",
  [AppErrorCodes.InvalidNetwork]: "Invalid network. If you are the app owner, visit docs.worldcoin.org/test for details.",
  [AppErrorCodes.InclusionProofFailed]: "There was an issue fetching your credential. Please try again.",
  [AppErrorCodes.InclusionProofPending]: "Your identity is still being registered. Please wait a few minutes and try again.",
  [AppErrorCodes.UnexpectedResponse]: "Unexpected response from your wallet. Please try again.",
  [AppErrorCodes.FailedByHostApp]: "Verification failed by the app. Please contact the app owner for details.",
  [AppErrorCodes.GenericError]: "Something unexpected went wrong. Please try again.",
  [AppErrorCodes.ConnectionFailed]: "Connection to your wallet failed. Please try again."
};
var PaymentErrorCodes = /* @__PURE__ */ ((PaymentErrorCodes2) => {
  PaymentErrorCodes2["InputError"] = "input_error";
  PaymentErrorCodes2["UserRejected"] = "user_rejected";
  PaymentErrorCodes2["PaymentRejected"] = "payment_rejected";
  PaymentErrorCodes2["InvalidReceiver"] = "invalid_receiver";
  PaymentErrorCodes2["InsufficientBalance"] = "insufficient_balance";
  PaymentErrorCodes2["TransactionFailed"] = "transaction_failed";
  PaymentErrorCodes2["GenericError"] = "generic_error";
  PaymentErrorCodes2["UserBlocked"] = "user_blocked";
  return PaymentErrorCodes2;
})(PaymentErrorCodes || {});
var PaymentErrorMessage = {
  ["input_error" /* InputError */]: "There was a problem with this request. Please try again or contact the app owner.",
  ["user_rejected" /* UserRejected */]: "You have cancelled the payment in World App.",
  ["payment_rejected" /* PaymentRejected */]: "You've cancelled the payment in World App.",
  ["invalid_receiver" /* InvalidReceiver */]: "The receiver address is invalid. Please contact the app owner.",
  ["insufficient_balance" /* InsufficientBalance */]: "You do not have enough balance to complete this transaction.",
  ["transaction_failed" /* TransactionFailed */]: "The transaction failed. Please try again.",
  ["generic_error" /* GenericError */]: "Something unexpected went wrong. Please try again.",
  ["user_blocked" /* UserBlocked */]: "User's region is blocked from making payments."
};
var PaymentValidationErrors = /* @__PURE__ */ ((PaymentValidationErrors2) => {
  PaymentValidationErrors2["MalformedRequest"] = "There was a problem with this request. Please try again or contact the app owner.";
  PaymentValidationErrors2["InvalidTokenAddress"] = "The token address is invalid. Please contact the app owner.";
  PaymentValidationErrors2["InvalidAppId"] = "The app ID is invalid. Please contact the app owner.";
  PaymentValidationErrors2["DuplicateReference"] = "This reference ID already exists please generate a new one and try again.";
  return PaymentValidationErrors2;
})(PaymentValidationErrors || {});
var WalletAuthErrorCodes = /* @__PURE__ */ ((WalletAuthErrorCodes2) => {
  WalletAuthErrorCodes2["MalformedRequest"] = "malformed_request";
  WalletAuthErrorCodes2["UserRejected"] = "user_rejected";
  WalletAuthErrorCodes2["GenericError"] = "generic_error";
  return WalletAuthErrorCodes2;
})(WalletAuthErrorCodes || {});
var WalletAuthErrorMessage = {
  ["malformed_request" /* MalformedRequest */]: "Provided parameters in the request are invalid.",
  ["user_rejected" /* UserRejected */]: "User rejected the request.",
  ["generic_error" /* GenericError */]: "Something unexpected went wrong."
};
var SendTransactionErrorCodes = /* @__PURE__ */ ((SendTransactionErrorCodes2) => {
  SendTransactionErrorCodes2["InvalidOperation"] = "invalid_operation";
  SendTransactionErrorCodes2["UserRejected"] = "user_rejected";
  SendTransactionErrorCodes2["InputError"] = "input_error";
  SendTransactionErrorCodes2["SimulationFailed"] = "simulation_failed";
  SendTransactionErrorCodes2["TransactionFailed"] = "transaction_failed";
  SendTransactionErrorCodes2["GenericError"] = "generic_error";
  SendTransactionErrorCodes2["DisallowedOperation"] = "disallowed_operation";
  SendTransactionErrorCodes2["ValidationError"] = "validation_error";
  SendTransactionErrorCodes2["InvalidContract"] = "invalid_contract";
  SendTransactionErrorCodes2["MaliciousOperation"] = "malicious_operation";
  SendTransactionErrorCodes2["DailyTxLimitReached"] = "daily_tx_limit_reached";
  SendTransactionErrorCodes2["PermittedAmountExceedsSlippage"] = "permitted_amount_exceeds_slippage";
  SendTransactionErrorCodes2["PermittedAmountNotFound"] = "permitted_amount_not_found";
  return SendTransactionErrorCodes2;
})(SendTransactionErrorCodes || {});
var SendTransactionErrorMessage = {
  ["invalid_operation" /* InvalidOperation */]: "Transaction included an operation that was invalid",
  ["user_rejected" /* UserRejected */]: "User rejected the request.",
  ["input_error" /* InputError */]: "Invalid payload.",
  ["simulation_failed" /* SimulationFailed */]: "The transaction simulation failed.",
  ["validation_error" /* ValidationError */]: "The transaction validation failed. Please try again.",
  ["transaction_failed" /* TransactionFailed */]: "The transaction failed. Please try again later.",
  ["generic_error" /* GenericError */]: "Something unexpected went wrong. Please try again.",
  ["disallowed_operation" /* DisallowedOperation */]: "The operation requested is not allowed. Please refer to the docs.",
  ["invalid_contract" /* InvalidContract */]: "The contract address is not allowed for your application. Please check your developer portal configurations",
  ["malicious_operation" /* MaliciousOperation */]: "The operation requested is considered malicious.",
  ["daily_tx_limit_reached" /* DailyTxLimitReached */]: "Daily transaction limit reached. Max 100 transactions per day. Wait until the next day.",
  ["permitted_amount_exceeds_slippage" /* PermittedAmountExceedsSlippage */]: "Permitted amount exceeds slippage. You must spend at least 90% of the permitted amount.",
  ["permitted_amount_not_found" /* PermittedAmountNotFound */]: "Permitted amount not found in permit2 payload."
};
var SignMessageErrorCodes = /* @__PURE__ */ ((SignMessageErrorCodes2) => {
  SignMessageErrorCodes2["InvalidMessage"] = "invalid_message";
  SignMessageErrorCodes2["UserRejected"] = "user_rejected";
  SignMessageErrorCodes2["GenericError"] = "generic_error";
  return SignMessageErrorCodes2;
})(SignMessageErrorCodes || {});
var SignMessageErrorMessage = {
  ["invalid_message" /* InvalidMessage */]: "Invalid message requested",
  ["user_rejected" /* UserRejected */]: "User rejected the request.",
  ["generic_error" /* GenericError */]: "Something unexpected went wrong."
};
var SignTypedDataErrorCodes = /* @__PURE__ */ ((SignTypedDataErrorCodes2) => {
  SignTypedDataErrorCodes2["InvalidOperation"] = "invalid_operation";
  SignTypedDataErrorCodes2["UserRejected"] = "user_rejected";
  SignTypedDataErrorCodes2["InputError"] = "input_error";
  SignTypedDataErrorCodes2["SimulationFailed"] = "simulation_failed";
  SignTypedDataErrorCodes2["GenericError"] = "generic_error";
  SignTypedDataErrorCodes2["DisallowedOperation"] = "disallowed_operation";
  SignTypedDataErrorCodes2["InvalidContract"] = "invalid_contract";
  SignTypedDataErrorCodes2["MaliciousOperation"] = "malicious_operation";
  return SignTypedDataErrorCodes2;
})(SignTypedDataErrorCodes || {});
var SignTypedDataErrorMessage = {
  ["invalid_operation" /* InvalidOperation */]: "Transaction included an operation that was invalid",
  ["user_rejected" /* UserRejected */]: "User rejected the request.",
  ["input_error" /* InputError */]: "Invalid payload.",
  ["simulation_failed" /* SimulationFailed */]: "The transaction simulation failed.",
  ["generic_error" /* GenericError */]: "Something unexpected went wrong. Please try again.",
  ["disallowed_operation" /* DisallowedOperation */]: "The operation requested is not allowed. Please refer to the docs.",
  ["invalid_contract" /* InvalidContract */]: "The contract address is not allowed for your application. Please check your developer portal configurations",
  ["malicious_operation" /* MaliciousOperation */]: "The operation requested is considered malicious."
};
var MiniKitInstallErrorCodes = /* @__PURE__ */ ((MiniKitInstallErrorCodes2) => {
  MiniKitInstallErrorCodes2["Unknown"] = "unknown";
  MiniKitInstallErrorCodes2["AlreadyInstalled"] = "already_installed";
  MiniKitInstallErrorCodes2["OutsideOfWorldApp"] = "outside_of_worldapp";
  MiniKitInstallErrorCodes2["NotOnClient"] = "not_on_client";
  MiniKitInstallErrorCodes2["AppOutOfDate"] = "app_out_of_date";
  return MiniKitInstallErrorCodes2;
})(MiniKitInstallErrorCodes || {});
var MiniKitInstallErrorMessage = {
  ["unknown" /* Unknown */]: "Failed to install MiniKit.",
  ["already_installed" /* AlreadyInstalled */]: "MiniKit is already installed.",
  ["outside_of_worldapp" /* OutsideOfWorldApp */]: "MiniApp launched outside of WorldApp.",
  ["not_on_client" /* NotOnClient */]: "Window object is not available.",
  ["app_out_of_date" /* AppOutOfDate */]: "WorldApp is out of date. Please update the app."
};
var ShareContactsErrorCodes = /* @__PURE__ */ ((ShareContactsErrorCodes2) => {
  ShareContactsErrorCodes2["UserRejected"] = "user_rejected";
  ShareContactsErrorCodes2["GenericError"] = "generic_error";
  return ShareContactsErrorCodes2;
})(ShareContactsErrorCodes || {});
var ShareContactsErrorMessage = {
  ["user_rejected" /* UserRejected */]: "User rejected the request.",
  ["generic_error" /* GenericError */]: "Something unexpected went wrong."
};
var RequestPermissionErrorCodes = /* @__PURE__ */ ((RequestPermissionErrorCodes2) => {
  RequestPermissionErrorCodes2["UserRejected"] = "user_rejected";
  RequestPermissionErrorCodes2["GenericError"] = "generic_error";
  RequestPermissionErrorCodes2["AlreadyRequested"] = "already_requested";
  RequestPermissionErrorCodes2["PermissionDisabled"] = "permission_disabled";
  RequestPermissionErrorCodes2["AlreadyGranted"] = "already_granted";
  RequestPermissionErrorCodes2["UnsupportedPermission"] = "unsupported_permission";
  return RequestPermissionErrorCodes2;
})(RequestPermissionErrorCodes || {});
var RequestPermissionErrorMessage = {
  ["user_rejected" /* UserRejected */]: "User declined sharing contacts",
  ["generic_error" /* GenericError */]: "Request failed for unknown reason.",
  ["already_requested" /* AlreadyRequested */]: "User has already declined turning on notifications once",
  ["permission_disabled" /* PermissionDisabled */]: "User does not have this permission enabled in World App",
  ["already_granted" /* AlreadyGranted */]: "If the user has already granted this mini app permission",
  ["unsupported_permission" /* UnsupportedPermission */]: "The permission requested is not supported by this mini app"
};
var GetPermissionsErrorCodes = /* @__PURE__ */ ((GetPermissionsErrorCodes2) => {
  GetPermissionsErrorCodes2["GenericError"] = "generic_error";
  return GetPermissionsErrorCodes2;
})(GetPermissionsErrorCodes || {});
var GetPermissionsErrorMessage = {
  ["generic_error" /* GenericError */]: "Something unexpected went wrong. Please try again."
};
var SendHapticFeedbackErrorCodes = /* @__PURE__ */ ((SendHapticFeedbackErrorCodes2) => {
  SendHapticFeedbackErrorCodes2["GenericError"] = "generic_error";
  SendHapticFeedbackErrorCodes2["UserRejected"] = "user_rejected";
  return SendHapticFeedbackErrorCodes2;
})(SendHapticFeedbackErrorCodes || {});
var SendHapticFeedbackErrorMessage = {
  ["generic_error" /* GenericError */]: "Something unexpected went wrong.",
  ["user_rejected" /* UserRejected */]: "User rejected the request."
};
var ShareFilesErrorCodes = /* @__PURE__ */ ((ShareFilesErrorCodes2) => {
  ShareFilesErrorCodes2["UserRejected"] = "user_rejected";
  ShareFilesErrorCodes2["GenericError"] = "generic_error";
  ShareFilesErrorCodes2["InvalidFileName"] = "invalid_file_name";
  return ShareFilesErrorCodes2;
})(ShareFilesErrorCodes || {});
var ShareFilesErrorMessage = {
  ["user_rejected" /* UserRejected */]: "User rejected the request.",
  ["generic_error" /* GenericError */]: "Something unexpected went wrong.",
  ["invalid_file_name" /* InvalidFileName */]: "Invalid file name. Make sure you include the extension"
};
var MicrophoneErrorCodes = /* @__PURE__ */ ((MicrophoneErrorCodes2) => {
  MicrophoneErrorCodes2["MiniAppPermissionNotEnabled"] = "mini_app_permission_not_enabled";
  MicrophoneErrorCodes2["WorldAppPermissionNotEnabled"] = "world_app_permission_not_enabled";
  return MicrophoneErrorCodes2;
})(MicrophoneErrorCodes || {});
var MicrophoneErrorMessage = {
  ["mini_app_permission_not_enabled" /* MiniAppPermissionNotEnabled */]: "Microphone permission not enabled for your Mini App",
  ["world_app_permission_not_enabled" /* WorldAppPermissionNotEnabled */]: "Microphone permission not enabled in World App"
};

// types/responses.ts
var ResponseEvent = /* @__PURE__ */ ((ResponseEvent2) => {
  ResponseEvent2["MiniAppVerifyAction"] = "miniapp-verify-action";
  ResponseEvent2["MiniAppPayment"] = "miniapp-payment";
  ResponseEvent2["MiniAppWalletAuth"] = "miniapp-wallet-auth";
  ResponseEvent2["MiniAppSendTransaction"] = "miniapp-send-transaction";
  ResponseEvent2["MiniAppSignMessage"] = "miniapp-sign-message";
  ResponseEvent2["MiniAppSignTypedData"] = "miniapp-sign-typed-data";
  ResponseEvent2["MiniAppShareContacts"] = "miniapp-share-contacts";
  ResponseEvent2["MiniAppRequestPermission"] = "miniapp-request-permission";
  ResponseEvent2["MiniAppGetPermissions"] = "miniapp-get-permissions";
  ResponseEvent2["MiniAppSendHapticFeedback"] = "miniapp-send-haptic-feedback";
  ResponseEvent2["MiniAppShare"] = "miniapp-share";
  ResponseEvent2["MiniAppMicrophone"] = "miniapp-microphone";
  return ResponseEvent2;
})(ResponseEvent || {});

// types/payment.ts
var Tokens = /* @__PURE__ */ ((Tokens2) => {
  Tokens2["USDC"] = "USDCE";
  Tokens2["WLD"] = "WLD";
  return Tokens2;
})(Tokens || {});
var TokenDecimals = {
  ["USDCE" /* USDC */]: 6,
  ["WLD" /* WLD */]: 18
};
var Network = /* @__PURE__ */ ((Network2) => {
  Network2["Optimism"] = "optimism";
  Network2["WorldChain"] = "worldchain";
  return Network2;
})(Network || {});

// helpers/payment/client.ts
var tokenToDecimals = (amount, token) => {
  const decimals = TokenDecimals[token];
  if (decimals === void 0) {
    throw new Error(`Invalid token: ${token}`);
  }
  const factor = 10 ** decimals;
  const result = amount * factor;
  if (!Number.isInteger(result)) {
    throw new Error(`The resulting amount is not a whole number: ${result}`);
  }
  return result;
};
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

// helpers/siwe/siwe.ts
import {
  createPublicClient,
  getContract,
  hashMessage,
  http,
  recoverAddress
} from "viem";
import { worldchain } from "viem/chains";
var PREAMBLE = " wants you to sign in with your Ethereum account:";
var URI_TAG = "URI: ";
var VERSION_TAG = "Version: ";
var CHAIN_TAG = "Chain ID: ";
var NONCE_TAG = "Nonce: ";
var IAT_TAG = "Issued At: ";
var EXP_TAG = "Expiration Time: ";
var NBF_TAG = "Not Before: ";
var RID_TAG = "Request ID: ";
var ERC_191_PREFIX = "Ethereum Signed Message:\n";
var EIP1271_MAGICVALUE = "0x1626ba7e";
var SAFE_CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "isOwner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_message",
        type: "bytes32"
      },
      {
        internalType: "bytes",
        name: "_signature",
        type: "bytes"
      }
    ],
    name: "isValidSignature",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];
var tagged = (line, tag) => {
  if (line && line.includes(tag)) {
    return line.replace(tag, "");
  } else {
    throw new Error(`Missing '${tag}'`);
  }
};
var parseSiweMessage = (inputString) => {
  const lines = inputString.split("\n")[Symbol.iterator]();
  const domain = tagged(lines.next()?.value, PREAMBLE);
  const address = lines.next()?.value;
  lines.next();
  const nextValue = lines.next()?.value;
  let statement;
  if (nextValue) {
    statement = nextValue;
    lines.next();
  }
  const uri = tagged(lines.next()?.value, URI_TAG);
  const version = tagged(lines.next()?.value, VERSION_TAG);
  const chain_id = tagged(lines.next()?.value, CHAIN_TAG);
  const nonce = tagged(lines.next()?.value, NONCE_TAG);
  const issued_at = tagged(lines.next()?.value, IAT_TAG);
  let expiration_time, not_before, request_id;
  for (let line of lines) {
    if (line.startsWith(EXP_TAG)) {
      expiration_time = tagged(line, EXP_TAG);
    } else if (line.startsWith(NBF_TAG)) {
      not_before = tagged(line, NBF_TAG);
    } else if (line.startsWith(RID_TAG)) {
      request_id = tagged(line, RID_TAG);
    }
  }
  if (lines.next().done === false) {
    throw new Error("Extra lines in the input");
  }
  const siweMessageData = {
    domain,
    address,
    statement,
    uri,
    version,
    chain_id,
    nonce,
    issued_at,
    expiration_time,
    not_before,
    request_id
  };
  return siweMessageData;
};
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
var verifySiweMessage = (payload, nonce, statement, requestId, userProvider) => {
  if (payload.version === 2) {
    return verifySiweMessageV2(
      payload,
      nonce,
      statement,
      requestId,
      userProvider
    );
  } else {
    return verifySiweMessageV1(
      payload,
      nonce,
      statement,
      requestId,
      userProvider
    );
  }
};
var validateMessage = (siweMessageData, nonce, statement, requestId) => {
  if (siweMessageData.expiration_time) {
    const expirationTime = new Date(siweMessageData.expiration_time);
    if (expirationTime < /* @__PURE__ */ new Date()) {
      throw new Error("Expired message");
    }
  }
  if (siweMessageData.not_before) {
    const notBefore = new Date(siweMessageData.not_before);
    if (notBefore > /* @__PURE__ */ new Date()) {
      throw new Error("Not Before time has not passed");
    }
  }
  if (nonce && siweMessageData.nonce !== nonce) {
    throw new Error(
      `Nonce mismatch. Got: ${siweMessageData.nonce}, Expected: ${nonce}`
    );
  }
  if (statement && siweMessageData.statement !== statement) {
    throw new Error(
      `Statement mismatch. Got: ${siweMessageData.statement}, Expected: ${statement}`
    );
  }
  if (requestId && siweMessageData.request_id !== requestId) {
    throw new Error(
      `Request ID mismatch. Got: ${siweMessageData.request_id}, Expected: ${requestId}`
    );
  }
  return true;
};
var verifySiweMessageV1 = async (payload, nonce, statement, requestId, userProvider) => {
  if (typeof window !== "undefined") {
    throw new Error("Wallet auth payload can only be verified in the backend");
  }
  const { message, signature, address } = payload;
  const siweMessageData = parseSiweMessage(message);
  validateMessage(siweMessageData, nonce, statement, requestId);
  let provider = userProvider || createPublicClient({ chain: worldchain, transport: http() });
  const signedMessage = `${ERC_191_PREFIX}${message.length}${message}`;
  const hashedMessage = hashMessage(signedMessage);
  const contract = getContract({
    address,
    abi: SAFE_CONTRACT_ABI,
    client: provider
  });
  try {
    const recoveredAddress = await recoverAddress({
      hash: hashedMessage,
      signature: `0x${signature}`
    });
    const isOwner = await contract.read.isOwner([recoveredAddress]);
    if (!isOwner) {
      throw new Error("Signature verification failed, invalid owner");
    }
  } catch (error) {
    throw new Error("Signature verification failed");
  }
  return { isValid: true, siweMessageData };
};
var verifySiweMessageV2 = async (payload, nonce, statement, requestId, userProvider) => {
  if (typeof window !== "undefined") {
    throw new Error("Wallet auth payload can only be verified in the backend");
  }
  const { message, signature, address } = payload;
  const siweMessageData = parseSiweMessage(message);
  if (!validateMessage(siweMessageData, nonce, statement, requestId)) {
    throw new Error("Validation failed");
  }
  try {
    const walletContract = getContract({
      address,
      abi: SAFE_CONTRACT_ABI,
      client: userProvider || createPublicClient({ chain: worldchain, transport: http() })
    });
    const hashedMessage = hashMessage(message);
    const res = await walletContract.read.isValidSignature([
      hashedMessage,
      signature
    ]);
    return {
      isValid: res === EIP1271_MAGICVALUE,
      siweMessageData
    };
  } catch (error) {
    console.log(error);
    throw new Error("Signature verification failed");
  }
};

// types/commands.ts
var Command = /* @__PURE__ */ ((Command2) => {
  Command2["Verify"] = "verify";
  Command2["Pay"] = "pay";
  Command2["WalletAuth"] = "wallet-auth";
  Command2["SendTransaction"] = "send-transaction";
  Command2["SignMessage"] = "sign-message";
  Command2["SignTypedData"] = "sign-typed-data";
  Command2["ShareContacts"] = "share-contacts";
  Command2["RequestPermission"] = "request-permission";
  Command2["GetPermissions"] = "get-permissions";
  Command2["SendHapticFeedback"] = "send-haptic-feedback";
  Command2["Share"] = "share";
  return Command2;
})(Command || {});
var Permission = /* @__PURE__ */ ((Permission2) => {
  Permission2["Notifications"] = "notifications";
  Permission2["Contacts"] = "contacts";
  Permission2["Microphone"] = "microphone";
  return Permission2;
})(Permission || {});

// minikit.ts
import { VerificationLevel } from "@worldcoin/idkit-core";
import { encodeAction, generateSignal } from "@worldcoin/idkit-core/hashing";

// helpers/send-webview-event.ts
var sendWebviewEvent = (payload) => {
  if (window.webkit) {
    window.webkit?.messageHandlers?.minikit?.postMessage?.(payload);
  } else if (window.Android) {
    window.Android.postMessage?.(JSON.stringify(payload));
  }
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

// helpers/proof/index.ts
import {
  createPublicClient as createPublicClient2,
  decodeAbiParameters,
  encodeAbiParameters,
  http as http2
} from "viem";
import { worldchain as worldchain2 } from "viem/chains";
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
    const publicClient = createPublicClient2({
      chain: worldchain2,
      transport: http2(
        rpcUrl || "https://worldchain-mainnet.g.alchemy.com/public"
      )
    });
    const decodedProof = decodeAbiParameters(
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
    return encodeAbiParameters([{ type: "uint256[8]" }], [paddedProof]);
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
        if (payload.status === "success" && payload.verification_level === VerificationLevel.Orb) {
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
      action: encodeAction(payload.action),
      signal: generateSignal(payload.signal).digest,
      verification_level: payload.verification_level || VerificationLevel.Orb,
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
        if (response.finalPayload.status === "success" && response.finalPayload.verification_level === VerificationLevel.Orb) {
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

export {
  VerificationErrorMessage,
  PaymentErrorCodes,
  PaymentErrorMessage,
  PaymentValidationErrors,
  WalletAuthErrorCodes,
  WalletAuthErrorMessage,
  SendTransactionErrorCodes,
  SendTransactionErrorMessage,
  SignMessageErrorCodes,
  SignMessageErrorMessage,
  SignTypedDataErrorCodes,
  SignTypedDataErrorMessage,
  MiniKitInstallErrorCodes,
  MiniKitInstallErrorMessage,
  ShareContactsErrorCodes,
  ShareContactsErrorMessage,
  RequestPermissionErrorCodes,
  RequestPermissionErrorMessage,
  GetPermissionsErrorCodes,
  GetPermissionsErrorMessage,
  SendHapticFeedbackErrorCodes,
  SendHapticFeedbackErrorMessage,
  ShareFilesErrorCodes,
  ShareFilesErrorMessage,
  MicrophoneErrorCodes,
  MicrophoneErrorMessage,
  AppErrorCodes2 as AppErrorCodes,
  ResponseEvent,
  Tokens,
  TokenDecimals,
  Network,
  tokenToDecimals,
  parseSiweMessage,
  verifySiweMessage,
  Command,
  Permission,
  MiniKit
};
