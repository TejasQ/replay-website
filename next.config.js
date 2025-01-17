const host =
  process.env.REPLAY_DEVTOOLS_HOST || "https://dc3tvimjwmdjm.cloudfront.net";
const directories = ["dist", "images", "downloads", "driver", "protocol"];

const rewrites = [];
const headers = [];

rewrites.push({
  source: `/protocol/tot/:domain`,
  destination: `${host}/protocol/tot/:domain/`
});

rewrites.push({
  source: "/discord",
  destination: "https://discord.gg/PFjtU3uv7M"
});

const careersPage =
  "https://www.notion.so/replayio/Replay-is-Hiring-2459455b1ab1446da7f1458721ba128f";
rewrites.push({
  source: "/jobs",
  destination: careersPage
});
rewrites.push({
  source: "/careers",
  destination: careersPage
});

for (const directory of directories) {
  headers.push({
    source: `/${directory}/:rest*`,
    headers: [{ key: "cache-control", value: "s-maxage=1" }]
  });

  rewrites.push({
    source: `/${directory}/:rest*`,
    destination: `${host}/${directory}/:rest*`
  });
}

module.exports = {
  productionBrowserSourceMaps: true,
  rewrites() {
    return rewrites;
  },
  redirects() {
    return [
      {
        source: "/view/:slug*",
        destination: "https://app.replay.io/:slug*",
        permanent: true
      },
      {
        source: `/browser/:rest*`,
        destination: `https://app.replay.io/browser/:rest*`,
        permanent: true
      },
      // [ryanjduffy] FIXME: Temporary redirects for browser pages
      {
        source: `/welcome-to-replay`,
        destination: `https://app.replay.io/browser/welcome`,
        permanent: true
      },
      {
        source: `/new-tab`,
        destination: `https://app.replay.io/browser/new-tab`,
        permanent: true
      }
    ];
  },
  headers() {
    return headers;
  }
};
