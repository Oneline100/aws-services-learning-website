import type { AWSService } from '../../types/service';

export const MEDIA_SERVICES: AWSService[] = [
  {
    id: 'elastic-transcoder',
    name: 'Amazon Elastic Transcoder',
    category: 'Media Services',
    tagline: 'Simple, cost-effective media transcoding service for converting video and audio files.',
    description:
      'Amazon Elastic Transcoder is a highly scalable, cost-effective media transcoding service that converts media files from their source format into versions optimized for playback on devices such as smartphones, tablets, and web browsers.',
    keyFeatures: [
      'Predefined transcoding presets simplify converting files for common devices and formats',
      'Pipelines process files from an S3 input bucket and write transcoded output back to an S3 output bucket',
      'Supports a wide range of common video and audio input/output formats',
      'Scales automatically to handle large batches of transcoding jobs without infrastructure management',
    ],
    useCases: [
      'Converting uploaded user videos into multiple device-optimized formats and resolutions',
      'Batch-transcoding a media library into web-friendly streaming formats',
      'Simple transcoding workflows that do not need the advanced live or broadcast features of MediaConvert/MediaLive',
    ],
    examNotes: [
      'Elastic Transcoder is AWS\'s original, simpler file-based transcoding service; MediaConvert is the newer, more feature-rich file-based transcoding service — exam guidance generally points to MediaConvert for new file-based (VOD) workloads',
      'It only handles file-based (video-on-demand) transcoding, not live video — that is MediaLive\'s role',
      'Operates on S3 input/output buckets using configurable pipelines and presets',
    ],
    relatedServices: ['mediaconvert', 's3'],
    pricingModel: 'Pay per minute of output transcoded, with pricing varying by output resolution tier.',
    iconPath: './icons/media/elastic-transcoder.svg',
  },
  {
    id: 'mediaconvert',
    name: 'AWS Elemental MediaConvert',
    category: 'Media Services',
    tagline: 'File-based video transcoding service for broadcast-grade, video-on-demand content.',
    description:
      'AWS Elemental MediaConvert is a file-based video transcoding service that creates video-on-demand (VOD) content for broadcast and multiscreen delivery, supporting professional-grade codecs, formats, and advanced features such as captions, DRM, and adaptive bitrate packaging.',
    keyFeatures: [
      'Supports broadcast-grade codecs and containers (e.g., H.264, H.265/HEVC, AV1, ProRes, MXF)',
      'Generates adaptive bitrate packages (HLS, DASH, CMAF) for smooth multiscreen playback across varying network conditions',
      'Built-in support for captions/subtitles, audio normalization, and digital rights management (DRM)',
      'Job templates and presets standardize settings for consistent, repeatable transcoding output',
    ],
    useCases: [
      'Preparing pre-recorded (video-on-demand) content for delivery across web, mobile, and connected-TV devices',
      'Transcoding broadcast-quality archives into modern adaptive-streaming formats for OTT platforms',
      'Automating large-scale batch transcoding pipelines for media libraries, often triggered by S3 uploads',
    ],
    examNotes: [
      'MediaConvert handles file-based (VOD/on-demand) transcoding; MediaLive handles live, real-time video processing — this is the single most tested Media Services distinction',
      'Commonly paired with MediaPackage to package transcoded output into adaptive streaming formats for delivery',
      'Supersedes Elastic Transcoder for new, professional-grade, file-based transcoding workloads',
    ],
    relatedServices: ['medialive', 'mediapackage', 'elastic-transcoder', 's3'],
    pricingModel: 'Pay per minute of video transcoded, with pricing tiers based on resolution and features used.',
    iconPath: './icons/media/mediaconvert.svg',
  },
  {
    id: 'medialive',
    name: 'AWS Elemental MediaLive',
    category: 'Media Services',
    tagline: 'Broadcast-grade live video processing service for creating live streams.',
    description:
      'AWS Elemental MediaLive is a broadcast-grade live video processing service that creates live outputs for broadcast and streaming delivery, encoding live video in real time for distribution to televisions and internet-connected devices.',
    keyFeatures: [
      'Encodes live video input streams in real time into multiple output formats and bitrates simultaneously',
      'Supports standard and redundant ("backup") input configurations for highly reliable live broadcasts',
      'Integrates directly with MediaPackage and MediaStore/MediaConnect for a complete live-streaming pipeline',
      'Channel-based model lets you configure inputs, encoding settings, and outputs per live event or 24/7 channel',
    ],
    useCases: [
      'Live-streaming events (sports, conferences, news) to internet-connected devices in real time',
      'Running 24/7 live linear broadcast channels with redundant, broadcast-grade reliability',
      'Encoding a single live input into multiple adaptive bitrate renditions for varied viewer bandwidth',
    ],
    examNotes: [
      'MediaLive is for real-time, live video encoding; MediaConvert is for file-based, on-demand transcoding — know this distinction cold for the exam',
      'A typical live-streaming exam architecture: MediaConnect (ingest) -> MediaLive (encode) -> MediaPackage (package) -> CloudFront (deliver)',
      'Supports input redundancy for mission-critical live broadcasts where stream interruption is unacceptable',
    ],
    relatedServices: ['mediaconvert', 'mediapackage', 'mediaconnect', 'cloudfront'],
    pricingModel: 'Pay per hour the channel is running, based on input/output resolution and the number of pipelines (standard vs. single).',
    iconPath: './icons/media/medialive.svg',
  },
  {
    id: 'mediapackage',
    name: 'AWS Elemental MediaPackage',
    category: 'Media Services',
    tagline: 'Prepares and protects live and on-demand video for delivery to viewer devices.',
    description:
      'AWS Elemental MediaPackage formats and packages video content for delivery to a wide range of viewer devices, taking a single encoded video source and repackaging it into multiple adaptive bitrate streaming formats (HLS, DASH, CMAF) with optional DRM and ad insertion.',
    keyFeatures: [
      'Repackages a single input into multiple output streaming formats (HLS, DASH, CMAF, MSS) without re-encoding',
      'Supports digital rights management (DRM) encryption for content protection across delivery formats',
      'Enables server-side ad insertion (SSAI) markers for inserting ads into live and VOD streams',
      'Provides both live (real-time) and VOD packaging endpoints for flexible content delivery pipelines',
    ],
    useCases: [
      'Packaging a live MediaLive output into multiple adaptive streaming formats for different device types',
      'Protecting premium video content with DRM before delivery to end-user devices',
      'Inserting targeted advertising into live or on-demand streams using server-side ad insertion',
    ],
    examNotes: [
      'MediaPackage sits downstream of MediaLive/MediaConvert in the pipeline — it packages already-encoded video rather than encoding it itself',
      'Key differentiator from MediaConvert: MediaPackage repackages into multiple formats from one input without re-encoding, which is faster and cheaper than full re-transcoding',
      'Supports both live and VOD packaging origins, each typically fronted by CloudFront for scalable delivery',
    ],
    relatedServices: ['medialive', 'mediaconvert', 'cloudfront', 'mediastore'],
    pricingModel: 'Pay based on the amount of video egressed and packaged, with separate rates for live and VOD origination.',
    iconPath: './icons/media/mediapackage.svg',
  },
  {
    id: 'mediastore',
    name: 'AWS Elemental MediaStore',
    category: 'Media Services',
    tagline: 'Storage service optimized for media, offering high performance and low latency.',
    description:
      'AWS Elemental MediaStore is a storage service optimized for media that provides the high performance, consistent low latency, and strong consistency needed for video workloads, such as origin storage for live and on-demand streaming content.',
    keyFeatures: [
      'Optimized specifically for media workloads requiring high throughput and consistent low-latency access',
      'Provides strong read-after-write consistency, important for frequently updated live-streaming segments',
      'Supports a folder-based container structure similar in concept to S3 buckets and objects',
      'Commonly used as an origin store for live video fed into MediaPackage or directly to CloudFront',
    ],
    useCases: [
      'Serving as a high-performance origin store for live-streaming video segments that update frequently',
      'Storing media assets that require stronger consistency guarantees than general-purpose object storage',
      'Supporting workflows needing very low and predictable latency for reading and writing video fragments',
    ],
    examNotes: [
      'MediaStore is positioned as a media-optimized alternative to S3 for performance-sensitive live video origin storage, emphasizing low latency and strong consistency',
      'It is less commonly featured in current exam material than MediaConvert/MediaLive/MediaPackage, but may appear as the "optimized storage for live video origin" answer',
      'Often used alongside MediaPackage and MediaLive as part of a full live-streaming delivery pipeline',
    ],
    relatedServices: ['medialive', 'mediapackage', 's3', 'cloudfront'],
    pricingModel: 'Pay per GB stored and per GB of data transferred (requests in/out of MediaStore).',
    iconPath: './icons/media/mediastore.svg',
  },
  {
    id: 'mediatailor',
    name: 'AWS Elemental MediaTailor',
    category: 'Media Services',
    tagline: 'Personalized ad insertion and content stitching for video streaming.',
    description:
      'AWS Elemental MediaTailor is a channel assembly and personalized ad-insertion service for video that stitches targeted advertisements into live and on-demand video streams without requiring changes to the video player, while maintaining broadcast-quality viewer experience.',
    keyFeatures: [
      'Server-side ad insertion (SSAI) stitches personalized ads directly into the video stream before delivery',
      'Supports targeted ad decisioning per viewer, enabling personalized advertising rather than one-size-fits-all',
      'Channel assembly feature can create live, linear channels from existing VOD content libraries',
      'Collects detailed ad-insertion and playback metrics for monetization reporting and analytics',
    ],
    useCases: [
      'Inserting personalized, targeted advertisements into live or on-demand video streams at the server side',
      'Building virtual, linear "FAST" (free ad-supported streaming TV) channels from an existing VOD library',
      'Monetizing streaming content through ad insertion without requiring custom client-side player logic',
    ],
    examNotes: [
      'MediaTailor is the service specifically focused on monetization via personalized server-side ad insertion, distinct from MediaPackage\'s more basic ad-marker support',
      'Server-side ad insertion avoids client-side ad-blocking issues and provides a more seamless viewer experience than client-side insertion',
      'Channel assembly lets providers repurpose existing VOD assets into "always-on" linear channel experiences',
    ],
    relatedServices: ['mediapackage', 'medialive', 'cloudfront'],
    pricingModel: 'Pay based on the number of ad decisioning requests and the volume of content manifest requests processed.',
    iconPath: './icons/media/mediatailor.svg',
  },
  {
    id: 'mediaconnect',
    name: 'AWS Elemental MediaConnect',
    category: 'Media Services',
    tagline: 'Secure, reliable transport for live video between facilities and into AWS.',
    description:
      'AWS Elemental MediaConnect is a high-quality transport service for live video, enabling broadcasters and content owners to securely and reliably send live video streams into AWS and share them with multiple destinations, replacing dedicated satellite or fiber links.',
    keyFeatures: [
      'Supports industry-standard live video transport protocols, including RTP, RTP-FEC, Zixi, and SRT',
      'Entitlements allow securely sharing a live video source with other AWS accounts without duplicating the stream',
      'Source redundancy and automatic failover improve reliability for mission-critical live feeds',
      'Provides monitoring of stream health and quality metrics for live video transport',
    ],
    useCases: [
      'Transporting live video feeds from a remote production facility into AWS for processing with MediaLive',
      'Securely sharing a single live video source with multiple partner organizations or AWS accounts',
      'Replacing costly dedicated satellite or fiber-based video transport links with AWS-managed delivery',
    ],
    examNotes: [
      'MediaConnect handles ingest/transport of live video into and across AWS, sitting upstream of MediaLive in a typical pipeline — ingest, not encoding or packaging',
      'Entitlements are the key feature for securely sharing a live feed with other organizations/accounts without re-transmitting the source',
      'A full live pipeline is commonly tested as: MediaConnect (ingest) -> MediaLive (encode) -> MediaPackage (package) -> CloudFront (deliver)',
    ],
    relatedServices: ['medialive', 'mediapackage', 'cloudfront'],
    pricingModel: 'Pay based on the number of outputs, duration of flows, and data transfer volume for each live feed.',
    iconPath: './icons/media/mediaconnect.svg',
  },
  {
    id: 'interactive-video-service',
    name: 'Amazon Interactive Video Service (IVS)',
    category: 'Media Services',
    tagline: 'Managed live streaming service for building interactive, low-latency video experiences.',
    description:
      'Amazon Interactive Video Service (IVS) is a fully managed live streaming solution that makes it easy to build interactive video experiences, handling the entire live streaming infrastructure so developers can focus on building engaging viewer experiences like chat and real-time interactivity.',
    keyFeatures: [
      'Fully managed ingest and low-latency delivery, removing the need to build custom live-streaming infrastructure',
      'Ultra-low latency mode delivers live video in near real time, well-suited for interactive experiences',
      'Built-in chat capability (via the companion IVS Chat API) supports real-time viewer interaction alongside video',
      'Simple broadcast SDKs and standard RTMPS ingest make it straightforward to start streaming from custom apps',
    ],
    useCases: [
      'Building social or interactive live-streaming apps where real-time viewer engagement (e.g., chat, reactions) matters',
      'Adding live video and interactivity features into an existing mobile or web application quickly',
      'Live auctions, gaming, or fitness-class style streaming where latency directly affects the user experience',
    ],
    examNotes: [
      'IVS is purpose-built for fast, interactive, developer-friendly live streaming — distinct from the Elemental Media* services, which target broadcast-grade, highly configurable production pipelines',
      'Ultra-low latency is the standout feature that differentiates IVS use cases from standard HLS-based MediaLive/MediaPackage pipelines',
      'Favored when the scenario emphasizes quick integration and real-time interactivity over broadcast-grade customization',
    ],
    relatedServices: ['medialive', 'mediapackage', 'cloudfront'],
    pricingModel: 'Pay per minute of video input (ingested) and per minute of video output (viewer stream time) delivered.',
    iconPath: './icons/media/interactive-video-service.svg',
  },
];
