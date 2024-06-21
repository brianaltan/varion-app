import React, { useEffect, useState } from 'react';
import PlugConnect from '@Psychedelic/plug-connect';
import { LedgerCanister } from "@dfinity/ledger-icp";

export const isWalletConnected = async () => {
  return await window.ic.plug.isConnected();
};

export default function Currency() {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnectWallet = async () => {
    const whitelist = 'https://mainnet.dfinity.network';
    const host = 'https://mainnet.dfinity.network';
    console.log(window.ic.plug.agent.getPrincipal());
    console.log(window.ic.plug.isConnected());
    window.ic.plug.createAgent({ whitelist, host });
    const publicKey = await window.ic.plug.requestConnect();
    console.log(`The connected user's public key is:`, publicKey);
    console.log(window.ic.plug.sessionManager.sessionData);
  };

  const verifyConnectionAndAgent = async () => {
    const whitelist = 'https://mainnet.dfinity.network';
    const host = 'https://mainnet.dfinity.network';
    const connected = await isWalletConnected();
    if (!connected) {
      await window.ic.plug.requestConnect({ whitelist, host });
    }
    if (connected && !window.ic.plug.agent) {
      window.ic.plug.createAgent({ whitelist, host });
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      const connected = await isWalletConnected();
      setIsConnected(connected);
      verifyConnectionAndAgent();
    };

    checkConnection();
  }, []);

  return (
    <div>
      <PlugConnect
        dark
        whitelist={['bd3sg-teaaa-aaaaa-qaaba-cai']}
        host="https://mainnet.dfinity.network"
        onConnectCallback={handleConnectWallet}
      />
      {isConnected ? (
        <p>Wallet is connected</p>
      ) : (
        <p>Wallet is not connected</p>
      )}
    </div>
  );
}
