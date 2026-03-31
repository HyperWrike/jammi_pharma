// Supabase has been fully migrated to Convex.
// This file is kept as a no-op stub to prevent import errors
// in files that haven't been updated yet.

function createQueryBuilder() {
  const resultMany = Promise.resolve({ data: [], error: null });
  const resultOne = Promise.resolve({ data: null, error: null });
  const builder: any = {
    select: () => builder,
    eq: () => builder,
    neq: () => builder,
    gt: () => builder,
    gte: () => builder,
    lt: () => builder,
    lte: () => builder,
    like: () => builder,
    ilike: () => builder,
    order: () => builder,
    limit: () => builder,
    range: () => builder,
    single: () => resultOne,
    maybeSingle: () => resultOne,
    then: resultMany.then.bind(resultMany),
    catch: resultMany.catch.bind(resultMany),
    finally: resultMany.finally.bind(resultMany),
  };
  return builder;
}

export const supabase = {
  from: () => ({
    select: () => createQueryBuilder(),
    insert: () => Promise.resolve({ data: null, error: null }),
    update: () => Promise.resolve({ data: null, error: null }),
    delete: () => Promise.resolve({ data: null, error: null }),
    upsert: () => Promise.resolve({ data: null, error: null }),
  }),
  channel: () => ({
    on: function () { return this; },
    subscribe: function () { return { unsubscribe: () => {} }; },
  }),
  removeChannel: () => {},
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: null }),
    signOut: () => Promise.resolve({ error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    setSession: () => Promise.resolve({ data: null, error: null }),
  },
  storage: {
    from: () => ({
      upload: () => Promise.resolve({ data: null, error: null }),
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
      remove: () => Promise.resolve({ data: null, error: null }),
    }),
  },
};

export const supabaseAdmin = supabase;

export const getValidSession = async () => null;
