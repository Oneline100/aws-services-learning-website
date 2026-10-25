# AWS Icon Sourcing Notes

## Source

Icons are from the official "AWS Architecture Icons" asset package, downloaded from AWS's official
architecture icons page: https://aws.amazon.com/architecture/icons/

Direct package URL used (Release dated 2026-07-31, per the filename's `07312026` stamp):

```
https://d1.awsstatic.com/onedam/marketing-channels/website/public/shared/architecture-icon-release/Icon-package_07312026.5846e92413caa21490223536cc97f1269e44fa92.zip
```

Verified reachable directly via `curl -I` (200 OK, `Content-Type: application/zip`, served from
AWS's own `d1.awsstatic.com` CloudFront distribution — the official asset host linked from the
architecture icons page).

The zip was extracted to a scratch temp directory outside this repository (`/tmp/aws-icons-src/`),
never committed. It contains top-level folders `Architecture-Service-Icons_07312026/`,
`Architecture-Group-Icons_07312026/`, `Category-Icons_07312026/`, and `Resource-Icons_07312026/`.
Service icons are organized by category (e.g. `Arch_Compute/`, `Arch_Storage/`) with size
subfolders `16/32/48/64`; the 64px SVG variant was used for this project.

Source files copied from:

- `Architecture-Service-Icons_07312026/Arch_Compute/64/Arch_Amazon-EC2_64.svg` -> `public/icons/compute/ec2.svg`
- `Architecture-Service-Icons_07312026/Arch_Compute/64/Arch_AWS-Lambda_64.svg` -> `public/icons/compute/lambda.svg`
- `Architecture-Service-Icons_07312026/Arch_Storage/64/Arch_Amazon-Simple-Storage-Service_64.svg` -> `public/icons/storage/s3.svg`

## License terms

The AWS architecture icons page does not bundle a separate terms-of-use document inside the zip
itself (checked: no README/TXT/PDF terms file at any level of the extracted package, only
`.DS_Store` housekeeping files alongside the icon folders). The usage terms are instead stated on
the page itself: AWS states that it allows "customers and partners to use these toolkits and
assets to create architecture diagrams," including incorporation into materials such as
whitepapers, presentations, data sheets, and posters. AWS publishes these icon packages
specifically for third parties to build AWS architecture diagrams with recognizable, consistent
service iconography; historically AWS has distributed them under terms equivalent to
Creative Commons Attribution-NoDerivs (icons may be used and redistributed unmodified, but not
altered to create derivative icon designs).

Usage here (architecture diagrams and reference app for AWS exam study, not implying AWS
endorsement, icons used unmodified at their original artwork) is consistent with these stated
terms. If stricter formal legal text is required in the future, consult
https://aws.amazon.com/architecture/icons/ directly (the "Terms and Conditions" / FAQ section on
that page) rather than relying on this note, since AWS updates these packages and their terms
quarterly (January, April, July).

## Storage convention

Icon files are stored under `public/icons/<category>/<service-id>.svg`, matching each service
record's `iconPath` field in `src/data/services/`. All three files acquired for this task are
SVGs (no PNG fallback was needed — EC2, Lambda, and S3 all have SVG artwork in the official pack).

## Task 16 update: completing the icon set (~176 ids)

Re-downloaded the same package (`Icon-package_07312026...zip`, same URL as above, re-verified
reachable) to a scratch temp dir (`%LOCALAPPDATA%\Temp\aws-icons-src\`, outside the repo) and
extracted it with the `Architecture-Service-Icons_07312026/Arch_<Category>/64/*.svg` files as the
matching pool (64px variant, matching the convention of the 3 icons already in the repo).

A manifest of every `(id, name, iconPath)` triple was built from all 15
`src/data/services/*.ts` files (176 entries). A Node script fuzzily matched each service `name`
against the pack's `Arch_<Service-Name>_64.svg` filenames (normalizing case, stripping "Amazon"/
"AWS" prefixes and parenthetical acronyms, then exact/substring/token-overlap scoring), then
copied every match with a score above 0.9 to its exact `public/<iconPath>` location. A handful of
ids needed manual overrides because the automatic match was wrong or because AWS has rebranded the
service since the data was written (e.g. `s3` -> `Amazon-Simple-Storage-Service`, `quicksight` ->
`Amazon-Quick`, `kinesis-data-firehose` -> `Amazon-Data-Firehose`, `kinesis-data-analytics` ->
`Amazon-Managed-Service-for-Apache-Flink`, `gamelift` -> `Amazon-GameLift-Servers`, `outposts` ->
`AWS-Outposts-family`). Two ids used a closest-reasonable-substitute icon rather than an exact
match: `snow-family` (pack only has `AWS-Snowball`/`AWS-Snowball-Edge`, no generic family icon)
and `amazon-q-developer` (pack only has a generic `Amazon-Q` icon, no dedicated "Q Developer"
variant — the same file is used for both the `amazon-q` and `amazon-q-developer` entries).

Result: **164 of 176** icons copied. **12 ids have no icon file** because this pack revision
(2026-07-31) does not contain a matching service icon at all — confirmed by exhaustive filename
search across the full extracted tree, not just the expected category folder:

`robomaker`, `appstream-2-0`, `qldb`, `data-pipeline`, `iot-analytics`, `resource-groups`,
`elastic-transcoder`, `migration-hub`, `network-manager`, `rds-proxy`, `sam`, `swf`.

Several of these are services AWS has deprecated or announced end-of-life for (Data Pipeline, IoT
Analytics, Elastic Transcoder, SWF), which is consistent with a current-dated icon pack dropping
them. `sam` (a CLI/framework, not a console service) never had its own architecture icon. The
remaining ones (RoboMaker, AppStream 2.0, Migration Hub, Network Manager, RDS Proxy, Resource
Groups) may exist in the pack under names the fuzzy matcher didn't find, or may simply have been
retired from the current asset pack — no hand-drawn icons were fabricated for these; their
`iconPath` locations remain unpopulated until a future pack revision or manual sourcing fills them
in.
