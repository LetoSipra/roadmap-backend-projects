type GitHubEvent = {
  type: string;
  repo: { name: string };
  payload: any;
  created_at: string;
};

async function fetchEvents(username: string): Promise<GitHubEvent[]> {
  const url = `https://api.github.com/users/${encodeURIComponent(
    username
  )}/events`;
  const res = await fetch(url, {
    headers: { "User-Agent": "github-activity-cli" },
  });

  if (res.status === 404) {
    throw new Error(`User "${username}" not found (404).`);
  }
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  return (await res.json()) as GitHubEvent[];
}

function summarizeEvent(e: GitHubEvent): string {
  const repo = e.repo.name;
  switch (e.type) {
    case "PushEvent": {
      const count = e.payload.commits?.length ?? 0;
      return `Pushed ${count} commit${count !== 1 ? "s" : ""} to ${repo}`;
    }
    case "IssuesEvent": {
      const action = e.payload.action;
      return `${
        action.charAt(0).toUpperCase() + action.slice(1)
      } an issue in ${repo}`;
    }
    case "IssueCommentEvent": {
      const action = e.payload.action;
      return `${
        action.charAt(0).toUpperCase() + action.slice(1)
      } a comment on an issue in ${repo}`;
    }
    case "PullRequestEvent": {
      const action = e.payload.action;
      return `${
        action.charAt(0).toUpperCase() + action.slice(1)
      } a pull request in ${repo}`;
    }
    case "WatchEvent": {
      const action = e.payload.action === "started" ? "Starred" : "Unstarred";
      return `${action} ${repo}`;
    }
    case "ForkEvent":
      return `Forked ${repo}`;
    default:
      return `${e.type.replace(/Event$/, "")} on ${repo}`;
  }
}

async function main() {
  const [, , username] = process.argv;
  if (!username) {
    console.error("Usage: github-activity <username>");
    process.exit(1);
  }

  try {
    console.log(`Fetching recent activity for "${username}"...\n`);
    const events = await fetchEvents(username);
    if (events.length === 0) {
      console.log("No recent public activity found.");
      return;
    }

    events.slice(0, 10).forEach((e) => {
      const when = new Date(e.created_at).toLocaleString();
      console.log(`- ${summarizeEvent(e)} (${when})`);
    });
  } catch (err: any) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

main();
