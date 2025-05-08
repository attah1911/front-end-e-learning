import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import type { SessionExtended } from "../../../types/Auth";

export const SessionCheck = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // Memoize the current path to avoid unnecessary checks
  const currentPath = router.pathname;
  const isAuthPage = currentPath.startsWith("/auth/") || currentPath === "/";

  useEffect(() => {
    // Skip session check for auth pages
    if (isAuthPage) return;

    let mounted = true;

    const handleAuthError = async (errorType?: string) => {
      if (!mounted) return;
      
      // Only sign out if currently authenticated
      if (status === "authenticated") {
        try {
          await signOut({ redirect: false });
        } catch (error) {
          console.error('Sign out error:', error);
        }
      }

      // Redirect to login with appropriate error
      const callbackUrl = encodeURIComponent(router.asPath);
      const errorParam = errorType ? `&error=${errorType}` : '';
      router.push(`/auth/login?callbackUrl=${callbackUrl}${errorParam}`);
    };

    const checkSession = async () => {
      try {
        // Check session status
        if (status === "unauthenticated") {
          await handleAuthError();
        } else if (status === "authenticated") {
          const sess = session as SessionExtended;
          
          if (sess?.error === "TokenExpired") {
            await handleAuthError("expired");
          } else if (!sess?.accessToken) {
            await handleAuthError("invalid");
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
        await handleAuthError("unknown");
      }
    };

    checkSession();

    return () => {
      mounted = false;
    };
  }, [status, session, isAuthPage, router]);

  // Handle unauthorized API responses
  useEffect(() => {
    if (isAuthPage) return;

    const handleUnauthorized = async (event: Event) => {
      try {
        const customEvent = event as CustomEvent;
        const error = customEvent.detail;
        
        if (error?.response?.status === 401) {
          await signOut({ redirect: false });
          const callbackUrl = encodeURIComponent(router.asPath);
          router.push(`/auth/login?callbackUrl=${callbackUrl}&error=expired`);
        }
      } catch (error) {
        console.error('Unauthorized handler error:', error);
      }
    };

    window.addEventListener('unauthorized', handleUnauthorized as EventListener);
    return () => {
      window.removeEventListener('unauthorized', handleUnauthorized as EventListener);
    };
  }, [isAuthPage, router]);

  return null;
};

export default SessionCheck;
