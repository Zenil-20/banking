"use client"; // Ensures this component only runs in the client

import React, { useCallback, useEffect, useState, useRef } from "react";
import { Button } from "./ui/button";
import { PlaidLinkOnSuccess, usePlaidLink } from "react-plaid-link";
import { useRouter } from "next/navigation";
import { createLinkToken, exchangePublicToken } from "@/lib/actions/user.actions";
import Image from "next/image";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const isInitialized = useRef(false); // Prevent multiple script loads

  useEffect(() => {
    const getLinkToken = async () => {
      if (!isInitialized.current && user) {
        isInitialized.current = true; // Prevent multiple calls
        try {
          const data = await createLinkToken(user);
          if (data?.linkToken) {
            setToken(data.linkToken);
          } else {
            console.error("Failed to fetch the link token.");
          }
        } catch (error) {
          console.error("Error fetching link token:", error);
        }
      }
    };

    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      try {
        await exchangePublicToken({ publicToken: public_token, user });
        router.push("/");
      } catch (error) {
        console.error("Error during public token exchange:", error);
      }
    },
    [user, router]
  );

  const plaidConfig = token
    ? {
        token,
        onSuccess,
      }
    : null;

  // Initialize Plaid Link only when the token is ready
  const { open, ready } = usePlaidLink(plaidConfig || ({} as any));

  return (
    <>
      {variant === "primary" ? (
        <Button onClick={() => open()} disabled={!ready} className="plaidlink-primary">
          Connect bank
        </Button>
      ) : variant === "ghost" ? (
        <Button onClick={() => open()} variant="ghost" className="plaidlink-ghost">
          <Image src="/icons/connect-bank.svg" alt="connect bank" width={24} height={24} />
          <p className="hidden text-[16px] font-semibold text-black-2 xl:block">Connect bank</p>
        </Button>
      ) : (
        <Button onClick={() => open()} className="plaidlink-default">
          <Image src="/icons/connect-bank.svg" alt="connect bank" width={24} height={24} />
          <p className="text-[16px] font-semibold text-black-2">Connect bank</p>
        </Button>
      )}
    </>
  );
};

export default PlaidLink;
