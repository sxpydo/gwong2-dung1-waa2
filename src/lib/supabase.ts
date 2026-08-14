import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!url || !anonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    'Supabase env vars are missing. Copy .env.example to .env and fill in your project URL + anon key. ' +
      'Until then, progress will not persist.'
  );
}

export const supabase = url && anonKey ? createClient(url, anonKey) : null;

/**
 * This app is single-user, so we use Supabase's anonymous auth
 * (enable it in Authentication > Providers) purely to get a stable
 * user id for scoping rows under Row Level Security.
 */
export async function ensureAnonSession() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  if (data.session) return data.session;
  const { data: signInData, error } = await supabase.auth.signInAnonymously();
  if (error) {
    // eslint-disable-next-line no-console
    console.error('Anonymous sign-in failed:', error.message);
    return null;
  }
  return signInData.session;
}
