const CONVEX_URL = "https://cheerful-rhinoceros-28.convex.cloud";

export async function convexQuery<T = any>(path: string, args?: any): Promise<T> {
  const response = await fetch(`${CONVEX_URL}/api/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, args: args || {}, format: "json" }),
  });
  
  const result = await response.json();
  
  if (result.status === "error") {
    throw new Error(result.errorMessage || "Convex query failed");
  }
  
  return result.value;
}

export async function convexMutation<T = any>(path: string, args?: any): Promise<T> {
  const response = await fetch(`${CONVEX_URL}/api/mutation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, args: args || {}, format: "json" }),
  });
  
  const result = await response.json();
  
  if (result.status === "error") {
    throw new Error(result.errorMessage || "Convex mutation failed");
  }
  
  return result.value;
}

export async function convexAction<T = any>(path: string, args?: any): Promise<T> {
  const response = await fetch(`${CONVEX_URL}/api/action`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, args: args || {}, format: "json" }),
  });

  const result = await response.json();

  if (result.status === "error") {
    throw new Error(result.errorMessage || "Convex action failed");
  }

  return result.value;
}
