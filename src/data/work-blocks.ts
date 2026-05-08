export type WorkBlock = {
    date: string
    title: string
    venue: string
    role: string
    links: { label: string; href: string }[]
    highlights: string[]
    previewImage: string
}

export const workBlocks: WorkBlock[] = [
    {
        date: 'Apr 13, 2026',
        title: 'Our evaluation of Claude Mythos Preview\u2019s cyber capabilities',
        venue: 'AISI Blog',
        role: 'Contributor',
        links: [
            {
                label: 'Blog',
                href: 'https://www.aisi.gov.uk/blog/our-evaluation-of-claude-mythos-previews-cyber-capabilities',
            },
        ],
        highlights: [
            'Summarizes AISI cyber evaluations of Claude Mythos Preview.',
            'First model to complete the 32-step “The Last Ones” range end-to-end (3 of 10 runs); ~73% success on expert-level CTF tasks.',
            'Discusses evaluation limits, inference-time scaling, and plans for harder cyber ranges.',
        ],
        previewImage: '/work-previews/mythos_work_preview.png',
    },
    {
        date: 'Mar 13, 2026',
        title: "Measuring AI Agents' Progress on Multi-Step Cyber Attack Scenarios",
        venue: 'arXiv (cs.AI)',
        role: 'Co-author',
        links: [{ label: 'Paper', href: 'https://arxiv.org/html/2603.11214v2' }],
        highlights: [
            'Evaluates autonomous cyber capability on two purpose-built multi-step ranges.',
            'Finds log-linear gains from inference-time compute scaling up to 100M tokens.',
            'Shows measurable model generation-over-generation performance improvements.',
        ],
        previewImage: '/work-previews/cyber-ranges-2026.png',
    },
    {
        date: 'Feb 25, 2026',
        title: 'Seven simple steps for log analysis in AI systems',
        venue: 'arXiv (cs.AI)',
        role: 'Co-author',
        links: [
            { label: 'Paper', href: 'https://arxiv.org/abs/2604.09563' },
            { label: 'AISI page', href: 'https://www.aisi.gov.uk/research/seven-simple-steps-for-log-analysis-in-ai-systems' },
        ],
        highlights: [
            'Proposes a practical pipeline for analyzing agent logs and model behavior.',
            'Uses Inspect Scout examples to improve reproducibility and reduce analysis pitfalls.',
        ],
        previewImage: '/work-previews/log-analysis-2026.png',
    },
    {
        date: 'Jan 22, 2026',
        title: 'Improving Methodologies for Agentic Evaluations Across Domains',
        venue: 'arXiv (cs.AI)',
        role: 'Co-author',
        links: [{ label: 'Paper', href: 'https://arxiv.org/abs/2601.15679' }],
        highlights: [
            'International collaboration on agentic evaluation methods across cybersecurity, fraud, and data leakage.',
            'Focuses on improving methodology rather than leaderboard performance claims.',
        ],
        previewImage: '/work-previews/agentic-evals-2026.png',
    },
    {
        date: 'Dec 18, 2025',
        title: 'Frontier AI Trends Report',
        venue: 'AISI',
        role: 'Contributor',
        links: [
            { label: 'Report', href: 'https://www.aisi.gov.uk/frontier-ai-trends-report/pdf' },
            { label: 'AISI page', href: 'https://www.aisi.gov.uk/frontier-ai-trends-report' },
        ],
        highlights: [
            "AISI's first public evidence-based assessment of frontier model capability trends.",
            'Synthesizes findings across cyber, autonomy, safeguards, and broader societal impacts.',
        ],
        previewImage: '/work-previews/trends-report.jpg',
    },
    {
        date: 'Q4 2022',
        title: 'Should Your Portfolio Protection Work Fast or Slow?',
        venue: 'AQR Alternative Thinking',
        role: 'Contributor',
        links: [
            {
                label: 'Article',
                href: 'https://www.aqr.com/Insights/Research/Alternative-Thinking/Should-Your-Portfolio-Protection-Work-Fast-or-Slow',
            },
        ],
        highlights: [
            'Research note on portfolio protection dynamics in fast-crash vs slow-burn drawdowns.',
            'Discusses practical implications for long-horizon portfolio construction.',
        ],
        previewImage: '/work-previews/aqr-2022.png',
    },
]
