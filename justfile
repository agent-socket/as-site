serve:
    bunx astro dev --port 4321

build:
    bunx astro build

deploy: build
    #!/usr/bin/env bash
    set -euo pipefail
    timebound-iam exec -s s3:full,cloudfront:full -t 30m --profile as-prod -- bash -c '\
        aws s3 sync dist/ s3://agent-socket-ai-site-prod/ --delete --region us-west-2 && \
        aws cloudfront create-invalidation --distribution-id E1PHJ3XOVDPAGJ --paths "/*"'
