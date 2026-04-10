export async function generateCustomerId(): Promise<string> {
  const randomNum = Math.floor(Math.random() * 100000);
  const timestamp = Date.now().toString(36);
  return `customer-${timestamp}-${randomNum}`;
}
