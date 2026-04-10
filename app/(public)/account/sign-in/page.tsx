import CustomerSignInClient from './sign-in-client';

export const dynamic = 'force-dynamic';

export default async function CustomerSignInPage(props: {
  searchParams?: Promise<{ next?: string | string[] }>;
}) {
  const searchParams = await props.searchParams;
  const nextValue = searchParams?.next;
  const nextPath = Array.isArray(nextValue) ? nextValue[0] : nextValue;
  const redirectPath = nextPath && nextPath.startsWith('/') ? nextPath : '/account/orders';

  return <CustomerSignInClient nextPath={redirectPath} />;
}
