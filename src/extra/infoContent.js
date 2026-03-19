// Storage Setting
export const digitalOceanContent = [
    {
        label: "Endpoint",
        description: "Tells your app where to connect to your Space for uploads/downloads.",
    },
    {
        label: "Host Name",
        description: "Defines the base URL for serving files from your Space region.",
    },
    {
        label: "Secret Key",
        description: "Secures access to your files. Keep this private.",
    },
    {
        label: "Access Key",
        description: "Works with Secret Key to authenticate file requests.",
    },
    {
        label: "Bucket Name",
        description: "Specifies which Space stores your uploaded files.",
    },
    {
        label: "Region",
        description: "Decides the data center (e.g., blr1) — affects speed and latency.",
    },
];

export const awsContent = [
    {
        label: "Endpoint",
        description: "Connects your app to AWS S3 for file storage.",
    },
    {
        label: "Host Name",
        description: "Used to generate URLs for accessing stored files.",
    },
    {
        label: "Access Key",
        description: "Identifies your AWS account when making storage requests.",
    },
    {
        label: "Secret Key",
        description: "Secures those requests. Keep this hidden.",
    },
    {
        label: "Bucket Name",
        description: "Defines which S3 bucket your files are stored in.",
    },
    {
        label: "Region",
        description: "Specifies bucket’s location (e.g., ap-south-1). Impacts latency & costs.",
    },
];

export const storageOptionContent = [
    {
        label: "Local",
        description: "Stores files on your own server. Easy setup but limited space.",
    },
    {
        label: "AWS S3",
        description: "Scalable storage from Amazon. Best for large-scale apps.",
    },
    {
        label: "DigitalOcean Space",
        description: "Affordable S3-compatible storage. Good for small to medium apps.",
    },
];


// Payment Setting 
export const razorpayContent = [
    {
        label: "Razorpay",
        description: "Toggle to enable or disable Razorpay as a payment method.",
    },
    {
        label: "Razorpay Id",
        description: (
            <>
                Public Key ID for Razorpay integration.{" "}
                <a
                    href="https://dashboard.razorpay.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#0d6efd", textDecoration: "underline" }}
                >
                    Get it from Razorpay Dashboard
                </a>
            </>
        ),
    },
    {
        label: "Razorpay Secret Key",
        description: (
            <>
                Secret API key paired with the Key ID for secure transactions.{" "}
                <a
                    href="https://dashboard.razorpay.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#0d6efd", textDecoration: "underline" }}
                >
                    Manage it in Razorpay Dashboard
                </a>
            </>
        ),
    },
];

export const stripeContent = [
    {
        label: "Stripe",
        description: "Toggle to enable or disable Stripe as a payment method.",
    },
    {
        label: "Stripe Publishable Key",
        description: (
            <>
                Public API key for Stripe payments. Required for client-side requests.{" "}
                <a
                    href="https://dashboard.stripe.com/apikeys"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#0d6efd", textDecoration: "underline" }}
                >
                    Get it from Stripe Dashboard
                </a>
            </>
        ),
    },
    {
        label: "Stripe Secret Key",
        description: (
            <>
                Secret API key for server-side requests. Keep this key private.{" "}
                <a
                    href="https://dashboard.stripe.com/apikeys"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#0d6efd", textDecoration: "underline" }}
                >
                    Manage it in Stripe Dashboard
                </a>
            </>
        ),
    },
];

export const googlePlayContent = [
    {
        label: "Google Play",
        description: (
            <>
                Toggle to enable or disable Google Play billing for in-app purchases.{" "}
                <a
                    href="https://developer.android.com/google/play/billing"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#0d6efd", textDecoration: "underline" }}
                >
                    Learn more at Google Play Billing Docs
                </a>
            </>
        ),
    },
];

export const flutterWaveContent = [
    {
        label: "Flutterwave",
        description: "Enable or disable Flutterwave as a payment method.",
    },
    {
        label: "Flutterwave ID",
        description: (
            <>
                API key for Flutterwave integration.{" "}
                <a
                    href="https://dashboard.flutterwave.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#0d6efd", textDecoration: "underline" }}
                >
                    Get it from Flutterwave Dashboard
                </a>
            </>
        ),
    },
];

export const paystackContent = [
    {
        label: "Paystack",
        description: "Toggle to enable or disable Paystack as a payment method.",
    },
    {
        label: "Paystack Public Key",
        description: (
            <>
                Public API key for Paystack payments. Required for client-side requests.{" "}
                <a
                    href="https://dashboard.paystack.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#0d6efd", textDecoration: "underline" }}
                >
                    Get it from Paystack Dashboard
                </a>
            </>
        ),
    },
    {
        label: "Paystack Secret Key",
        description: (
            <>
                Secret API key for server-side requests. Keep this key private.{" "}
                <a
                    href="https://dashboard.paystack.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#0d6efd", textDecoration: "underline" }}
                >
                    Manage it in Paystack Dashboard
                </a>
            </>
        ),
    },
];

export const paypalContent = [
    {
        label: "PayPal",
        description: "Toggle to enable or disable PayPal as a payment method.",
    },
    {
        label: "PayPal Client Id",
        description: (
            <>
                Client ID for PayPal integration. Used for identifying your application.{" "}
                <a
                    href="https://developer.paypal.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#0d6efd", textDecoration: "underline" }}
                >
                    Get it from PayPal Developer Dashboard
                </a>
            </>
        ),
    },
    {
        label: "PayPal Secret Key",
        description: (
            <>
                Secret key paired with the Client ID for secure transactions. Keep this private.{" "}
                <a
                    href="https://developer.paypal.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#0d6efd", textDecoration: "underline" }}
                >
                    Manage it in PayPal Developer Dashboard
                </a>
            </>
        ),
    },
];

export const cashfreeContent = [
    {
        label: "Cashfree",
        description: "Toggle to enable or disable Cashfree as a payment method.",
    },
    {
        label: "Cashfree Client Id",
        description: (
            <>
                Client ID for Cashfree integration. Used for API authentication.{" "}
                <a
                    href="https://merchant.cashfree.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#0d6efd", textDecoration: "underline" }}
                >
                    Get it from Cashfree Merchant Dashboard
                </a>
            </>
        ),
    },
    {
        label: "Cashfree Client Secret",
        description: (
            <>
                Client Secret paired with the Client ID for secure API calls. Keep this private.{" "}
                <a
                    href="https://merchant.cashfree.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#0d6efd", textDecoration: "underline" }}
                >
                    Manage it in Cashfree Merchant Dashboard
                </a>
            </>
        ),
    },
];

// Ads Setting
export const androidAdsContent = [
    {
        label: "Android Google Reward",
        description: "Ad unit ID for rewarded ads on Android (users watch ads to earn rewards).",
    },
    {
        label: "Android Google Native",
        description: "Ad unit ID for native ads on Android (blend into app content).",
    },
    {
        label: "Android Google Native Video",
        description: "Ad unit ID for native video ads on Android (video ads integrated into app content).",
    },
];

export const iosAdsContent = [
    {
        label: "iOS Google Reward",
        description: "Ad unit ID for rewarded ads on iOS (users watch ads to earn rewards).",
    },
    {
        label: "iOS Google Native",
        description: "Ad unit ID for native ads on iOS (seamlessly integrated with UI).",
    },
    {
        label: "iOS Google Native Video",
        description: "Ad unit ID for native video ads on iOS (video ads integrated into app content).",
    },
];

// General Setting

export const resendApiSetting = [
    {
        label: "Resend API Key",
        description: (
            <>
                Key for Resend service to send OTPs, resets, and emails.{' '}
                <a
                    href="https://resend.com/api-keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Get it from Resend Dashboard
                </a>
                .
            </>
        ),
    }
]

export const zegoSetting = [
    {
        label: "Zego AppId",
        description: (
            <>
                Unique numeric ID for your ZegoCloud application.{" "}
                <a
                    href="https://console.zegocloud.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Get it from Zego Console
                </a>
                .
            </>
        ),
    },
    {
        label: "Zego App SignIn",
        description: (
            <>
                Security signature string used to authenticate with Zego services.{" "}
                <a
                    href="https://docs.zegocloud.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Learn how to generate it
                </a>
                .
            </>
        ),
    },
    {
        label: "Zego Server Secret",
        description: (
            <>
                Secret key for generating authentication tokens on your backend server.{" "}
                <a
                    href="https://docs.zegocloud.com/article/14802"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    See Zego token generation guide
                </a>
                .
            </>
        ),
    },
];

export const shortsEffectSetting = [
    {
        label: "Shorts Effect Setting",
        description: (
            <>
                Customize visual effects for your short videos, including filters,
                transitions, and special effects.{" "}
                <a
                    href="https://yourdocs.example.com/shorts-effects"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Learn more
                </a>
                .
            </>
        ),
    },
    {
        label: "Filter Intensity",
        description: (
            <>
                Adjust the strength of applied filters to make your videos subtle or vivid.{" "}
                <a
                    href="https://yourdocs.example.com/filter-intensity"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Guide
                </a>
                .
            </>
        ),
    },
    {
        label: "Transition Speed",
        description: (
            <>
                Control the speed of scene transitions in your short videos. Faster transitions create more dynamic effects.{" "}
                <a
                    href="https://yourdocs.example.com/transition-speed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Details
                </a>
                .
            </>
        ),
    },
];

export const waterMarkSetting = [
    {
        label: "Watermark Text",
        description: (
            <>
                Enter the text you want to appear as a watermark on your videos.{" "}
                <a
                    href="https://yourdocs.example.com/watermark-text"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Learn more
                </a>
                .
            </>
        ),
    },
    {
        label: "Watermark Position",
        description: (
            <>
                Choose where the watermark appears on your videos: top-left, top-right, bottom-left, or bottom-right.{" "}
                <a
                    href="https://yourdocs.example.com/watermark-position"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Guide
                </a>
                .
            </>
        ),
    },
    {
        label: "Watermark Opacity",
        description: (
            <>
                Adjust the transparency of the watermark. Lower values make it subtle, higher values make it more visible.{" "}
                <a
                    href="https://yourdocs.example.com/watermark-opacity"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Details
                </a>
                .
            </>
        ),
    },
    {
        label: "Watermark Size",
        description: (
            <>
                Set the size of the watermark text or image. Bigger sizes are more prominent.{" "}
                <a
                    href="https://yourdocs.example.com/watermark-size"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Info
                </a>
                .
            </>
        ),
    },
];

export const fakeDataSetting = [
    {
        label: "Enable Fake Data",
        description: (
            <>
                Toggle to enable or disable the use of fake/sample data in the app.{" "}
                <a
                    href="https://yourdocs.example.com/enable-fake-data"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Learn more
                </a>
                .
            </>
        ),
    },
    {
        label: "Fake User Count",
        description: (
            <>
                Set the number of fake users to generate for testing or demo purposes.{" "}
                <a
                    href="https://yourdocs.example.com/fake-user-count"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Guide
                </a>
                .
            </>
        ),
    },
    {
        label: "Fake Content Type",
        description: (
            <>
                Choose what type of fake content to display, e.g., posts, comments, or messages.{" "}
                <a
                    href="https://yourdocs.example.com/fake-content-type"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Details
                </a>
                .
            </>
        ),
    },
    {
        label: "Auto Refresh Fake Data",
        description: (
            <>
                Enable automatic refresh of fake data at a set interval. Useful for live demo previews.{" "}
                <a
                    href="https://yourdocs.example.com/auto-refresh-fake-data"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Info
                </a>
                .
            </>
        ),
    },
];


export const firebaseNotificationSetting = [
    {
        label: "Enable Notifications",
        description: (
            <>
                Toggle to enable or disable push notifications in your app.{" "}
                <a
                    href="https://firebase.google.com/docs/cloud-messaging"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Learn more
                </a>
                .
            </>
        ),
    },
    {
        label: "Server Key / API Key",
        description: (
            <>
                Enter your Firebase Cloud Messaging server key or API key to authenticate notifications.{" "}
                <a
                    href="https://console.firebase.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Firebase Console
                </a>
                .
            </>
        ),
    },
    {
        label: "Notification Sound",
        description: (
            <>
                Select the default sound to play when a notification is received.{" "}
                <a
                    href="https://firebase.google.com/docs/cloud-messaging/android/send-message"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Guide
                </a>
                .
            </>
        ),
    },
    {
        label: "Notification Channel",
        description: (
            <>
                Choose the channel or category for notifications (Android only). Helps organize notifications.{" "}
                <a
                    href="https://firebase.google.com/docs/cloud-messaging/android/receive"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Details
                </a>
                .
            </>
        ),
    },
];


export const mediaModerationSetting = [
    {
        label: "Enable Moderation",
        description: (
            <>
                Toggle to enable automatic moderation for images and videos uploaded by users.{" "}
                <a
                    href="https://docs.example.com/enable-moderation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Learn more
                </a>
                .
            </>
        ),
    },
    {
        label: "Moderation Level",
        description: (
            <>
                Choose the strictness level of content moderation: low, medium, or high.{" "}
                <a
                    href="https://docs.example.com/moderation-level"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Guide
                </a>
                .
            </>
        ),
    },
    {
        label: "Action on Flagged Content",
        description: (
            <>
                Decide what happens when inappropriate content is detected: block, review, or warn user.{" "}
                <a
                    href="https://docs.example.com/flagged-content-action"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Details
                </a>
                .
            </>
        ),
    },
    {
        label: "Notification for Moderation",
        description: (
            <>
                Enable notifications for admins when content is flagged or removed.{" "}
                <a
                    href="https://docs.example.com/moderation-notifications"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Info
                </a>
                .
            </>
        ),
    },
];


export const coinSetting = [
    {
        label: "Enable Coin System",
        description: (
            <>
                Toggle to enable or disable the in-app coin/reward system.{" "}
                <a
                    href="https://docs.example.com/enable-coin-system"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Learn more
                </a>
                .
            </>
        ),
    },
    {
        label: "Coin Earn Rate",
        description: (
            <>
                Define how users earn coins (e.g., per video watched, per like, or per referral).{" "}
                <a
                    href="https://docs.example.com/coin-earn-rate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Guide
                </a>
                .
            </>
        ),
    },
    {
        label: "Coin Spend Rules",
        description: (
            <>
                Set rules for spending coins: redeeming for rewards, gifts, or unlocking content.{" "}
                <a
                    href="https://docs.example.com/coin-spend-rules"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Details
                </a>
                .
            </>
        ),
    },
    {
        label: "Daily Coin Limit",
        description: (
            <>
                Define the maximum number of coins a user can earn in a single day.{" "}
                <a
                    href="https://docs.example.com/daily-coin-limit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Info
                </a>
                .
            </>
        ),
    },
];


export const appSetting = [
    {
        label: "App Name",
        description: (
            <>
                Set the name of your application as it will appear to users.{" "}
                <a
                    href="https://docs.example.com/app-name"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Learn more
                </a>
                .
            </>
        ),
    },
    {
        label: "App Version",
        description: (
            <>
                Specify the current version of your app for update and display purposes.{" "}
                <a
                    href="https://docs.example.com/app-version"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Guide
                </a>
                .
            </>
        ),
    },
    {
        label: "Default Language",
        description: (
            <>
                Choose the default language for the app interface and content.{" "}
                <a
                    href="https://docs.example.com/default-language"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Details
                </a>
                .
            </>
        ),
    },
    {
        label: "Maintenance Mode",
        description: (
            <>
                Enable or disable maintenance mode. When active, users will see a maintenance page.{" "}
                <a
                    href="https://docs.example.com/maintenance-mode"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    Info
                </a>
                .
            </>
        ),
    },
];




