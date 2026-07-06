function getGitHubConfig() {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token || !owner || !repo) {
    return null;
  }

  return { token, owner, repo, branch };
}

function getGitHubHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function githubFetch(url, token) {
  const response = await fetch(url, {
    headers: getGitHubHeaders(token),
    cache: "no-store",
  });

  const data = await response.json().catch(() => ({}));

  return { ok: response.ok, status: response.status, data };
}

function decodeGitHubFileContent(content) {
  return Buffer.from(content, "base64").toString("utf-8");
}

const USERS_FILE_PATHS = ["users.json", "data/users.json", "config/users.json"];

export async function verifyGitHubConnection() {
  const config = getGitHubConfig();

  if (!config) {
    return { ok: false, error: "Missing GITHUB_TOKEN, GITHUB_OWNER, or GITHUB_REPO" };
  }

  const { token, owner, repo } = config;

  const tokenCheck = await githubFetch("https://api.github.com/user", token);

  if (!tokenCheck.ok) {
    return {
      ok: false,
      error: tokenCheck.data.message || `GitHub token error (${tokenCheck.status})`,
    };
  }

  const repoCheck = await githubFetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    token
  );

  return {
    ok: true,
    user: tokenCheck.data,
    repo: repoCheck.ok ? repoCheck.data : null,
    repoError: repoCheck.ok
      ? null
      : repoCheck.data.message || `Repo error (${repoCheck.status})`,
  };
}

export async function fetchGitHubJsonFile(filePath) {
  const config = getGitHubConfig();
  if (!config) {
    return null;
  }

  const { token, owner, repo, branch } = config;
  const { ok, data } = await githubFetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`,
    token
  );

  if (!ok || !data.content) {
    return null;
  }

  try {
    return JSON.parse(decodeGitHubFileContent(data.content));
  } catch {
    return null;
  }
}

async function findUserInGitHub(username, password) {
  for (const filePath of USERS_FILE_PATHS) {
    const users = await fetchGitHubJsonFile(filePath);
    if (!Array.isArray(users)) {
      continue;
    }

    const match = users.find(
      (user) =>
        (user.username === username || user.user_name === username) &&
        user.password === password
    );

    if (match) {
      return match;
    }

    const exists = users.some(
      (user) => user.username === username || user.user_name === username
    );

    if (exists) {
      return null;
    }
  }

  return undefined;
}

export async function validateUserCredentials(username, password) {
  const connection = await verifyGitHubConnection();

  if (!connection.ok) {
    return {
      valid: false,
      message: connection.error || "Unable to connect to GitHub",
      status: 503,
    };
  }

  const githubUser = await findUserInGitHub(username, password);

  if (githubUser) {
    return { valid: true, user: username };
  }

  if (githubUser === null) {
    return {
      valid: false,
      message: "Invalid user name or password",
      status: 401,
    };
  }

  const envUsername = process.env.AUTH_USERNAME?.trim();
  const envPassword = process.env.AUTH_PASSWORD;

  if (
    envUsername &&
    envPassword &&
    username === envUsername &&
    password === envPassword
  ) {
    return { valid: true, user: username };
  }

  return {
    valid: false,
    message: "Invalid user name or password",
    status: 401,
  };
}
