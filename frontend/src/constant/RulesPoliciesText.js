import {
  Lock,
  FileText,
  Eye,
  Scale,
  Database,
  Globe,
} from "lucide-react";

export const rulesData = [
  {
    title: "Rule 1: Respectful Conduct",
    rules: [
      {
        heading: "1.1 Civility Requirement:",
        description:
          "All members must treat others with courtesy, dignity, and respect at all times. Disagreement with ideas is encouraged; disrespect toward individuals is prohibited.",
      },
      {
        heading: "1.2 Prohibited Behavior:",
        description:
          "Users shall not engage in personal attacks, name-calling, insults, mockery, or any form of harassment directed at other members, moderators, or any individual referenced in debates.",
      },
      {
        heading: "1.3 Tone and Language:",
        description:
          "While passionate debate is encouraged, users must maintain a professional and constructive tone. Excessive profanity, inflammatory language, or aggressive communication styles are not permitted.",
      },
      {
        heading: "1.4 Good Faith Participation:",
        description:
          "Members are expected to engage in good faith, meaning they should genuinely attempt to understand opposing viewpoints and contribute meaningfully to discussions rather than obstruct or derail them.",
      },
    ],
  },

  {
    title: "Rule 2: Intellectual Integrity",
    rules: [
      {
        heading: "2.1 Evidence-Based Arguments:",
        description:
          "Users are strongly encouraged to support their claims with credible evidence, including but not limited to peer-reviewed research, reputable news sources, official statistics, and expert testimony.",
      },
      {
        heading: "2.2 Source Citations:",
        description:
          "When presenting factual claims, users should provide proper attribution and links to sources whenever possible. Failure to substantiate extraordinary claims may result in content removal.",
      },
      {
        heading: "2.3 Misinformation Prohibition:",
        description:
          "Deliberately spreading false information, conspiracy theories without credible evidence, or knowingly misrepresenting facts is strictly prohibited and will result in immediate disciplinary action.",
      },
      {
        heading: "2.4 Logical Fallacies:",
        description:
          "While not strictly prohibited, users should make genuine efforts to avoid common logical fallacies such as ad hominem attacks, straw man arguments, false dichotomies, and appeals to emotion in place of reasoned argument.",
      },
      {
        heading: "2.5 Plagiarism:",
        description:
          "All content must be original or properly attributed. Copying others' arguments, posts, or external content without citation constitutes plagiarism and is prohibited.",
      },
    ],
  },

  {
    title: "Rule 3: On-Topic Engagement",
    rules: [
      {
        heading: "3.1 Relevance Requirement:",
        description:
          "All contributions to a debate thread must be directly relevant to the topic at hand. Off-topic discussions, tangential arguments, or deliberate topic derailment are prohibited.",
      },
      {
        heading: "3.2 Thread Hijacking:",
        description:
          "Users shall not attempt to redirect discussions toward unrelated topics or their personal agendas. Each debate has a specific scope that must be respected.",
      },
      {
        heading: "3.3 Appropriate Categorization:",
        description:
          "When creating new debate threads, users must select the appropriate category and tags to ensure proper organization and discoverability.",
      },
    ],
  },

  {
    title: "Rule 4: Prohibited Content",
    rules: [
      {
        heading: "4.1 Hate Speech:",
        description:
          "Content that promotes hatred, violence, or discrimination against individuals or groups based on race, ethnicity, national origin, religion, gender, sexual orientation, disability, or any other protected characteristic is absolutely prohibited.",
      },
      {
        heading: "4.2 Threats and Violence:",
        description:
          "Any content containing threats of violence, incitement to violence, or glorification of violent acts against any person or group will result in immediate account termination and potential reporting to law enforcement.",
      },
      {
        heading: "4.3 Illegal Content:",
        description:
          "Content that violates local, state, national, or international laws is prohibited. This includes but is not limited to: illegal substances, weapons trafficking, human trafficking, child exploitation, and terrorism.",
      },
      {
        heading: "4.4 Sexual Content:",
        description:
          "Sexually explicit content, pornography, or sexual solicitation is strictly prohibited on this platform.",
      },
      {
        heading: "4.5 Personal Information:",
        description:
          "Sharing private personal information (doxxing) of any individual, including addresses, phone numbers, email addresses, or other identifying information without explicit consent is prohibited.",
      },
      {
        heading: "4.6 Spam and Commercial Content:",
        description:
          "Unsolicited advertising, promotional content, spam, or commercial solicitation is not permitted unless explicitly authorized in designated areas.",
      },
    ],
  },

  {
    title: "Rule 5: Account Integrity",
    rules: [
      {
        heading: "5.1 One Account Per Person:",
        description:
          "Each user is permitted one primary account. Creating multiple accounts to circumvent bans, manipulate voting, or deceive other users is prohibited.",
      },
      {
        heading: "5.2 Impersonation:",
        description:
          "Users shall not impersonate other members, public figures, organizations, or DebateHub staff members. Parody accounts must be clearly labeled as such.",
      },
      {
        heading: "5.3 Bot and Automation:",
        description:
          "Automated accounts, bots, or scripts that interact with the platform are prohibited unless explicitly authorized by DebateHub administration.",
      },
      {
        heading: "5.4 Account Security:",
        description:
          "Users are responsible for maintaining the security of their accounts. Account sharing is discouraged and users will be held responsible for all activity conducted under their credentials.",
      },
    ],
  },

  {
    title: "Rule 6: Voting and Reputation System",
    rules: [
      {
        heading: "6.1 Vote Manipulation:",
        description:
          "Vote manipulation, including but not limited to using multiple accounts, coordinating with others to mass upvote/downvote content, or offering incentives for votes, is strictly prohibited.",
      },
      {
        heading: "6.2 Voting Standards:",
        description:
          "Votes should reflect the quality, relevance, and contribution value of content, not personal agreement or disagreement with opinions expressed.",
      },
      {
        heading: "6.3 Reputation Farming:",
        description:
          "Creating low-quality content solely to accumulate reputation points or engaging in reciprocal voting arrangements is prohibited.",
      },
    ],
  },

  {
    title: "Rule 7: Moderation Compliance",
    rules: [
      {
        heading: "7.1 Moderator Authority:",
        description:
          "Moderators have the authority to remove content, issue warnings, and take disciplinary action when rules are violated. Users must comply with moderator directives.",
      },
      {
        heading: "7.2 Appeals Process:",
        description:
          "Users who believe they have been unfairly moderated may submit an appeal through the appropriate channels. However, publicly disputing moderation decisions or harassing moderators is prohibited.",
      },
      {
        heading: "7.3 Moderator Conduct:",
        description:
          "Moderators are expected to enforce rules fairly and consistently. Any concerns about moderator conduct should be reported to platform administrators through official channels.",
      },
    ],
  },

  {
    title: "Rule 8: Content Ownership and Usage",
    rules: [
      {
        heading: "8.1 User Content License:",
        description:
          "By posting content on DebateHub, users grant the platform a non-exclusive, royalty-free license to display, distribute, and moderate that content as necessary for platform operations.",
      },
      {
        heading: "8.2 Copyright Compliance:",
        description:
          "Users must respect intellectual property rights. Posting copyrighted material without authorization may result in content removal and account penalties.",
      },
      {
        heading: "8.3 Content Deletion:",
        description:
          "While users may delete their own posts, DebateHub reserves the right to retain content for moderation, legal, or archival purposes as outlined in our policies.",
      },
    ],
  },

  {
    title: "Enforcement and Consequences",
    rules: [
      {
        heading: "Warning System:",
        description:
          "Minor violations may result in formal warnings. Accumulation of warnings may lead to temporary or permanent suspension.",
      },
      {
        heading: "Temporary Suspension:",
        description:
          "Moderate violations or repeated minor violations may result in temporary account suspension ranging from 24 hours to 30 days.",
      },
      {
        heading: "Permanent Ban:",
        description:
          "Severe violations, including but not limited to hate speech, threats, illegal content, or repeated rule violations after suspension, will result in permanent account termination.",
      },
      {
        heading: "Content Removal:",
        description:
          "Violating content will be removed immediately upon discovery. Users will be notified of removals when possible.",
      },
      {
        heading: "Discretionary Enforcement:",
        description:
          "DebateHub reserves the right to take appropriate action on a case-by-case basis for situations not explicitly covered in these rules or when circumstances warrant special consideration.",
      },
    ],
  },
];

export const policiesData = [
  {
    title: "Privacy Policy",
    icon: Lock,
    sections: [
      {
        heading: "1. Information We Collect",
        items: [
          {
            title: "1.1 Account Information:",
            description:
              "When you create an account, we collect your email address, username, password (encrypted), and optional profile information such as display name and avatar image.",
          },
          {
            title: "1.2 User-Generated Content:",
            description:
              "We collect and store all content you post on the platform, including debate posts, comments, votes, and saved items. This content is associated with your account and may be publicly visible.",
          },
          {
            title: "1.3 Usage Data:",
            description:
              "We automatically collect information about your interactions with the platform, including pages viewed, debates accessed, search queries, voting patterns, time spent on pages, and clickstream data.",
          },
          {
            title: "1.4 Device and Technical Information:",
            description:
              "We collect IP addresses, browser type and version, operating system, device identifiers, screen resolution, and referring URLs to ensure platform security and optimize user experience.",
          },
          {
            title: "1.5 Cookies and Tracking Technologies:",
            description:
              "We use cookies, web beacons, and similar technologies to maintain session state, remember preferences, analyze traffic patterns, and improve platform functionality.",
          },
          {
            title: "1.6 Communications:",
            description:
              "We retain records of communications between you and DebateHub, including support tickets, moderation appeals, and feedback submissions.",
          },
        ],
      },
      {
        heading: "2. How We Use Your Information",
        items: [
          {
            title: "2.1 Platform Operations:",
            description:
              "To provide, maintain, and improve our services, including account management, content delivery, and feature development.",
          },
          {
            title: "2.2 Personalization:",
            description:
              "To customize your experience based on your preferences, interests, and interaction history, including personalized content recommendations and interface settings.",
          },
          {
            title: "2.3 Communication:",
            description:
              "To send you service-related notifications, policy updates, moderation actions, and optional community updates.",
          },
          {
            title: "2.4 Security and Fraud Prevention:",
            description:
              "To detect, prevent, and respond to security incidents, abuse, fraud, and other harmful or illegal activities.",
          },
          {
            title: "2.5 Analytics and Research:",
            description:
              "To analyze usage patterns, conduct research on user behavior, measure platform performance, and develop new features and improvements.",
          },
          {
            title: "2.6 Legal Compliance:",
            description:
              "To comply with applicable laws, regulations, legal processes, or enforceable governmental requests.",
          },
        ],
      },
    ],
  },

  {
    title: "Content Policy",
    icon: FileText,
    sections: [
      {
        heading: "1. Content Standards",
        items: [
          {
            title: "1.1 User Responsibility:",
            description:
              "Users are solely responsible for all content they post on DebateHub.",
          },
          {
            title: "1.2 Acceptable Use:",
            description:
              "Content must comply with community rules, applicable laws, and these policies.",
          },
          {
            title: "1.3 Intellectual Property:",
            description:
              "Users must respect copyright, trademark, and other intellectual property rights.",
          },
        ],
      },
      {
        heading: "2. Content Licensing",
        items: [
          {
            title: "2.1 User License to DebateHub:",
            description:
              "By posting content, you grant DebateHub a worldwide, non-exclusive, royalty-free license to use your content.",
          },
          {
            title: "2.2 Retention of Rights:",
            description:
              "You retain all ownership rights to your content.",
          },
          {
            title: "2.3 License Duration:",
            description:
              "This license continues even if you stop using DebateHub.",
          },
        ],
      },
    ],
  },

  {
    title: "Moderation Policy",
    icon: Eye,
    sections: [
      {
        heading: "1. Moderation Principles",
        items: [
          {
            description:
              "DebateHub employs a combination of automated systems and human moderators to enforce community rules and policies.",
          },
        ],
      },
      {
        heading: "2. Moderator Authority and Responsibilities",
        items: [
          {
            title: "2.1 Enforcement Powers:",
            description:
              "Moderators may remove content, issue warnings, suspend accounts, or permanently ban users.",
          },
          {
            title: "2.2 Consistency:",
            description:
              "Moderators strive to apply rules consistently across all users.",
          },
          {
            title: "2.3 Impartiality:",
            description:
              "Moderators must recuse themselves from conflicts of interest.",
          },
        ],
      },
    ],
  },

  {
    title: "Terms of Service",
    icon: Scale,
    sections: [
      {
        heading: "1. Acceptance of Terms",
        items: [
          {
            description:
              "By accessing or using DebateHub, you agree to be bound by these Terms of Service.",
          },
        ],
      },
      {
        heading: "2. Eligibility",
        items: [
          {
            description:
              "You must be at least 13 years of age to use this platform.",
          },
        ],
      },
      {
        heading: "3. Account Terms",
        items: [
          {
            title: "3.1 Registration:",
            description:
              "You must provide accurate and current information during registration.",
          },
          {
            title: "3.2 Account Security:",
            description:
              "You are responsible for safeguarding your account credentials.",
          },
          {
            title: "3.3 Account Transfer:",
            description:
              "Accounts are non-transferable.",
          },
        ],
      },
    ],
  },

  {
    title: "Data Protection and GDPR Compliance",
    icon: Database,
    sections: [
      {
        heading: "1. Legal Basis for Processing",
        items: [
          {
            description:
              "We process personal data based on consent, contractual necessity, legal obligations, and legitimate interests.",
          },
        ],
      },
      {
        heading: "2. Rights of EU/EEA Users",
        items: [
          {
            description:
              "EU/EEA users have rights including access, rectification, erasure, portability, and objection.",
          },
        ],
      },
      {
        heading: "3. Data Protection Officer",
        items: [
          {
            description:
              "Contact our Data Protection Officer at privacy@debatehub.com",
          },
        ],
      },
    ],
  },
];