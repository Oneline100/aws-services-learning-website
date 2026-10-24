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
