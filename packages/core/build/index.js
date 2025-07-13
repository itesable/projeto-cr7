import {
  AppErrorCodes,
  Command,
  GetPermissionsErrorCodes,
  GetPermissionsErrorMessage,
  MicrophoneErrorCodes,
  MicrophoneErrorMessage,
  MiniKit,
  MiniKitInstallErrorCodes,
  MiniKitInstallErrorMessage,
  Network,
  PaymentErrorCodes,
  PaymentErrorMessage,
  PaymentValidationErrors,
  Permission,
  RequestPermissionErrorCodes,
  RequestPermissionErrorMessage,
  ResponseEvent,
  SendHapticFeedbackErrorCodes,
  SendHapticFeedbackErrorMessage,
  SendTransactionErrorCodes,
  SendTransactionErrorMessage,
  ShareContactsErrorCodes,
  ShareContactsErrorMessage,
  ShareFilesErrorCodes,
  ShareFilesErrorMessage,
  SignMessageErrorCodes,
  SignMessageErrorMessage,
  SignTypedDataErrorCodes,
  SignTypedDataErrorMessage,
  TokenDecimals,
  Tokens,
  VerificationErrorMessage,
  WalletAuthErrorCodes,
  WalletAuthErrorMessage,
  parseSiweMessage,
  tokenToDecimals,
  verifySiweMessage
} from "./chunk-DKXMTG56.js";

// index.ts
import { VerificationLevel } from "@worldcoin/idkit-core";
import {
  verifyCloudProof
} from "@worldcoin/idkit-core/backend";

// helpers/address-book/index.ts
import { createPublicClient, http } from "viem";
import { worldchain } from "viem/chains";
var worldIdAddressBookContractAddress = "0x57b930D551e677CC36e2fA036Ae2fe8FdaE0330D";
var addressVerifiedUntilAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "addressVerifiedUntil",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];
var getIsUserVerified = async (walletAddress, rpcUrl) => {
  const publicClient = createPublicClient({
    chain: worldchain,
    transport: http(
      rpcUrl || "https://worldchain-mainnet.g.alchemy.com/public"
    )
  });
  try {
    const verifiedUntilResponse = await publicClient.readContract({
      address: worldIdAddressBookContractAddress,
      abi: addressVerifiedUntilAbi,
      functionName: "addressVerifiedUntil",
      args: [walletAddress]
    });
    const verifiedUntil = Number(verifiedUntilResponse.toString());
    if (!Number.isFinite(verifiedUntil)) {
      console.warn("Invalid verifiedUntil value:", verifiedUntil);
      return false;
    }
    const currentTime = Math.floor(Date.now() / 1e3);
    return verifiedUntil > currentTime;
  } catch (error) {
    console.error("Error verifying user:", error);
    return false;
  }
};
export {
  Command,
  GetPermissionsErrorCodes,
  GetPermissionsErrorMessage,
  MicrophoneErrorCodes,
  MicrophoneErrorMessage,
  MiniKit,
  MiniKitInstallErrorCodes,
  MiniKitInstallErrorMessage,
  Network,
  PaymentErrorCodes,
  PaymentErrorMessage,
  PaymentValidationErrors,
  Permission,
  RequestPermissionErrorCodes,
  RequestPermissionErrorMessage,
  ResponseEvent,
  SendHapticFeedbackErrorCodes,
  SendHapticFeedbackErrorMessage,
  SendTransactionErrorCodes,
  SendTransactionErrorMessage,
  ShareContactsErrorCodes,
  ShareContactsErrorMessage,
  ShareFilesErrorCodes,
  ShareFilesErrorMessage,
  SignMessageErrorCodes,
  SignMessageErrorMessage,
  SignTypedDataErrorCodes,
  SignTypedDataErrorMessage,
  TokenDecimals,
  Tokens,
  AppErrorCodes as VerificationErrorCodes,
  VerificationErrorMessage,
  VerificationLevel,
  WalletAuthErrorCodes,
  WalletAuthErrorMessage,
  getIsUserVerified,
  parseSiweMessage,
  tokenToDecimals,
  verifyCloudProof,
  verifySiweMessage
};
