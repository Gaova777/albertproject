import { useCallback, useEffect, useState } from "react";
import type { Session, AuthError } from "@supabase/supabase-js";
import { getSupabase, isSupabaseConfigured } from "../lib/supabase";

export interface UseAuthResult {
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthError | null>;
  signOut: () => Promise<void>;
  configured: boolean;
}

export const useAuth = (): UseAuthResult => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const supabase = getSupabase();

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(
    async (email: string, password: string): Promise<AuthError | null> => {
      if (!isSupabaseConfigured) {
        return {
          name: "ConfigError",
          message: "Supabase no está configurado.",
        } as AuthError;
      }
      const supabase = getSupabase();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return error;
    },
    []
  );

  const signOut = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    const supabase = getSupabase();
    await supabase.auth.signOut();
  }, []);

  return {
    session,
    loading,
    signIn,
    signOut,
    configured: isSupabaseConfigured,
  };
};
