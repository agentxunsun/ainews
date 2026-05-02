export type SignalCategory = "tweet" | "video" | "wechat" | "podcast" | "insight" | "trend";

export type Signal = {
  id: string;
  category: SignalCategory;
  author: string;
  handle: string;
  avatar: string;
  role: string;
  publishedAt: string;
  zh: string;
  en: string;
  tags: string[];
  likes: number;
  reposts: number;
  views: number;
  repostedFrom?: string;
  sourceUrl: string;
};

export const categoryLabels: Record<SignalCategory, string> = {
  tweet: "推文",
  video: "视频",
  wechat: "公众号",
  podcast: "播客",
  insight: "洞察",
  trend: "趋势"
};

export const signals: Signal[] = [
  {
    id: "karpathy-coding-agents",
    category: "tweet",
    author: "Andrej Karpathy",
    handle: "@karpathy",
    avatar: "AK",
    role: "AI Researcher",
    publishedAt: "2026-05-02T07:42:00+08:00",
    zh: "AI 编程的核心变化不是补全更多代码，而是把工程师的注意力从语法移动到规格、验证和审查。真正的瓶颈正在变成：你是否能清楚描述要构建的系统。",
    en: "The core shift in AI coding is not more autocomplete, but moving the engineer's attention from syntax to specs, verification, and review. The bottleneck becomes whether you can clearly describe the system you want built.",
    tags: ["AI编程", "Claude Code", "软件3.0"],
    likes: 48200,
    reposts: 7200,
    views: 3200000,
    sourceUrl: "https://x.com/karpathy"
  },
  {
    id: "sama-gpt5-agents",
    category: "tweet",
    author: "Sam Altman",
    handle: "@sama",
    avatar: "SA",
    role: "OpenAI CEO",
    publishedAt: "2026-05-01T22:18:00+08:00",
    zh: "下一代模型的产品形态会更像一个连续工作的队友：它能记住目标、调用工具、在长周期任务中汇报进度。模型能力和产品体验正在快速合并。",
    en: "The product shape of next-generation models will feel more like a teammate that keeps working: remembering goals, calling tools, and reporting progress on long-running tasks. Model capability and product experience are converging quickly.",
    tags: ["GPT-5", "Agent", "产品形态"],
    likes: 68500,
    reposts: 11900,
    views: 5400000,
    sourceUrl: "https://x.com/sama"
  },
  {
    id: "jimfan-world-models",
    category: "video",
    author: "Jim Fan",
    handle: "@DrJimFan",
    avatar: "JF",
    role: "NVIDIA Research",
    publishedAt: "2026-05-01T17:05:00+08:00",
    zh: "视频生成正在从“漂亮片段”进入“可控世界模型”阶段。Seedance、Sora 一类系统的关键指标会从美感转向时间一致性、物理可编辑性和可复用场景。",
    en: "Video generation is moving from pretty clips to controllable world models. For systems like Seedance and Sora, the key metrics shift from aesthetics to temporal consistency, editable physics, and reusable scenes.",
    tags: ["视频生成", "Seedance", "Sora", "世界模型"],
    likes: 21900,
    reposts: 4100,
    views: 1280000,
    repostedFrom: "@nvidiaai",
    sourceUrl: "https://x.com/DrJimFan"
  },
  {
    id: "swyx-mcp-stack",
    category: "insight",
    author: "swyx",
    handle: "@swyx",
    avatar: "SW",
    role: "AI Engineer",
    publishedAt: "2026-05-01T09:36:00+08:00",
    zh: "MCP 的意义不只是“又一个协议”。它让工具、上下文和权限边界有了可组合接口，AI 应用终于可以像 Web 应用一样形成生态层。",
    en: "MCP is not just another protocol. It gives tools, context, and permission boundaries a composable interface, letting AI applications form an ecosystem layer the way web apps did.",
    tags: ["MCP", "AI应用", "工具调用"],
    likes: 16400,
    reposts: 2800,
    views: 940000,
    sourceUrl: "https://x.com/swyx"
  },
  {
    id: "andrew-ng-one-person",
    category: "podcast",
    author: "吴恩达 Andrew Ng",
    handle: "@AndrewYNg",
    avatar: "NG",
    role: "DeepLearning.AI",
    publishedAt: "2026-04-30T21:12:00+08:00",
    zh: "一人公司的可行性正在被重新定义。不是一个人做所有事，而是一个人编排一组专业 Agent，并把判断力留在最关键的产品和客户问题上。",
    en: "The viability of one-person companies is being redefined. It is not one person doing everything, but one person orchestrating specialized agents while reserving judgment for the most critical product and customer questions.",
    tags: ["一人公司", "Agent", "创业"],
    likes: 30700,
    reposts: 5200,
    views: 2100000,
    sourceUrl: "https://x.com/AndrewYNg"
  },
  {
    id: "lecun-open-models",
    category: "tweet",
    author: "Yann LeCun",
    handle: "@ylecun",
    avatar: "YL",
    role: "Meta Chief AI Scientist",
    publishedAt: "2026-04-30T13:28:00+08:00",
    zh: "开源模型的价值不只在权重本身，而在于让研究者能验证、复现、拆解失败案例。Llama 4 这类开放生态会继续扩大研究和应用之间的通道。",
    en: "The value of open models is not only in the weights, but in letting researchers verify, reproduce, and dissect failure cases. Open ecosystems such as Llama 4 will keep widening the channel between research and applications.",
    tags: ["开源模型", "Llama 4", "研究复现"],
    likes: 25300,
    reposts: 3900,
    views: 1700000,
    sourceUrl: "https://x.com/ylecun"
  },
  {
    id: "emad-open-video",
    category: "trend",
    author: "Emad Mostaque",
    handle: "@EMostaque",
    avatar: "EM",
    role: "Stability AI Founder",
    publishedAt: "2026-04-30T02:54:00+08:00",
    zh: "视频模型会经历图像模型同样的开源压力：闭源产品先定义体验，开源社区随后压低成本、扩展工作流，并在垂直行业找到高频用例。",
    en: "Video models will face the same open-source pressure image models did: closed products define the experience first, then open communities lower cost, expand workflows, and find high-frequency vertical use cases.",
    tags: ["开源视频", "Sora", "工作流"],
    likes: 11800,
    reposts: 1900,
    views: 760000,
    sourceUrl: "https://x.com/EMostaque"
  },
  {
    id: "elon-musk-grok-agent",
    category: "tweet",
    author: "Elon Musk",
    handle: "@elonmusk",
    avatar: "EM",
    role: "xAI",
    publishedAt: "2026-04-29T23:41:00+08:00",
    zh: "下一阶段的 AI 助手必须能在真实软件环境里行动，而不只是聊天。浏览器、终端、文档和消息流会成为同一个智能体的连续工作面。",
    en: "The next stage of AI assistants must act in real software environments, not just chat. Browser, terminal, documents, and message streams become one continuous workspace for the agent.",
    tags: ["Grok", "Agent", "工作流"],
    likes: 124000,
    reposts: 22100,
    views: 21000000,
    sourceUrl: "https://x.com/elonmusk"
  },
  {
    id: "nat-friedman-small-teams",
    category: "insight",
    author: "Nat Friedman",
    handle: "@natfriedman",
    avatar: "NF",
    role: "Investor",
    publishedAt: "2026-04-29T15:08:00+08:00",
    zh: "最强的小团队会把 AI 当作组织结构来设计，而不是把它当作软件功能添加。招聘、代码审查、客服和销售线索都可以被重新编排。",
    en: "The strongest small teams will design AI as part of the organization structure, not add it as a software feature. Hiring, code review, support, and sales leads can all be re-orchestrated.",
    tags: ["小团队", "一人公司", "组织设计"],
    likes: 14600,
    reposts: 2400,
    views: 880000,
    sourceUrl: "https://x.com/natfriedman"
  },
  {
    id: "logan-kilpatrick-devtools",
    category: "tweet",
    author: "Logan Kilpatrick",
    handle: "@OfficialLoganK",
    avatar: "LK",
    role: "Developer Relations",
    publishedAt: "2026-04-28T19:22:00+08:00",
    zh: "开发者工具会从“帮你写函数”升级为“帮你完成变更”。一个好的 coding agent 应该理解 issue、改代码、跑测试、解释 diff，并能接受审查反馈。",
    en: "Developer tools move from helping you write functions to helping you complete changes. A good coding agent should understand issues, edit code, run tests, explain diffs, and respond to review feedback.",
    tags: ["AI编程", "Codex", "开发者工具"],
    likes: 9800,
    reposts: 1700,
    views: 620000,
    sourceUrl: "https://x.com/OfficialLoganK"
  },
  {
    id: "claire-vo-mcp-market",
    category: "wechat",
    author: "Claire Vo",
    handle: "@clairevo",
    avatar: "CV",
    role: "Product Builder",
    publishedAt: "2026-04-28T10:44:00+08:00",
    zh: "企业 AI 落地的难点不是模型演示，而是系统接入。谁能把 CRM、工单、代码库和权限体系接进 Agent，谁就更接近真实 ROI。",
    en: "The hard part of enterprise AI is not the model demo, but system integration. Whoever connects CRM, tickets, repos, and permissions into agents is closer to real ROI.",
    tags: ["企业AI", "MCP", "ROI"],
    likes: 7600,
    reposts: 1200,
    views: 430000,
    sourceUrl: "https://x.com/clairevo"
  },
  {
    id: "simonw-llm-evals",
    category: "insight",
    author: "Simon Willison",
    handle: "@simonw",
    avatar: "SW",
    role: "Developer",
    publishedAt: "2026-04-27T22:03:00+08:00",
    zh: "Agent 产品最容易被低估的部分是评测。你需要能回放任务、记录工具调用、比较输出质量，否则每次模型升级都像重新掷骰子。",
    en: "The most underestimated part of agent products is evaluation. You need to replay tasks, log tool calls, and compare output quality, or every model upgrade feels like rolling dice again.",
    tags: ["Agent评测", "可观测性", "模型升级"],
    likes: 18400,
    reposts: 3100,
    views: 980000,
    repostedFrom: "@llm",
    sourceUrl: "https://x.com/simonw"
  },
  {
    id: "demis-science-agents",
    category: "podcast",
    author: "Demis Hassabis",
    handle: "@demishassabis",
    avatar: "DH",
    role: "Google DeepMind",
    publishedAt: "2026-04-27T08:35:00+08:00",
    zh: "科学 Agent 的核心不是替代科学家，而是把搜索空间变得可导航。模型提出假设，人类判断意义，实验系统验证边界。",
    en: "The core of scientific agents is not replacing scientists, but making search spaces navigable. Models propose hypotheses, humans judge significance, and experimental systems verify boundaries.",
    tags: ["科学智能体", "DeepMind", "自动化科研"],
    likes: 22600,
    reposts: 3600,
    views: 1500000,
    sourceUrl: "https://x.com/demishassabis"
  },
  {
    id: "dario-safety-agents",
    category: "tweet",
    author: "Dario Amodei",
    handle: "@darioamodei",
    avatar: "DA",
    role: "Anthropic CEO",
    publishedAt: "2026-04-26T20:16:00+08:00",
    zh: "当模型开始执行长周期任务，安全问题会从回答是否正确转向行动是否可控。权限、审计、沙箱和人类确认会成为产品核心。",
    en: "As models execute long-horizon tasks, safety shifts from whether answers are correct to whether actions are controllable. Permissions, audit trails, sandboxes, and human confirmations become core product features.",
    tags: ["AI安全", "Agent", "权限控制"],
    likes: 31800,
    reposts: 5600,
    views: 2400000,
    sourceUrl: "https://x.com/darioamodei"
  },
  {
    id: "linus-e2b-sandboxes",
    category: "trend",
    author: "Linus Lee",
    handle: "@thesephist",
    avatar: "LL",
    role: "Interface Engineer",
    publishedAt: "2026-04-26T11:57:00+08:00",
    zh: "AI 应用会越来越需要临时计算环境：跑代码、浏览网页、生成文件、验证结果。沙箱会从开发工具变成 AI 产品的基础设施。",
    en: "AI applications increasingly need temporary compute environments: running code, browsing the web, generating files, and verifying results. Sandboxes move from developer tools to AI product infrastructure.",
    tags: ["沙箱", "Agent基础设施", "AI应用"],
    likes: 9200,
    reposts: 1500,
    views: 510000,
    sourceUrl: "https://x.com/thesephist"
  }
];

export const hotwords = [
  { word: "Claude Code", count: 128, delta: "+42%" },
  { word: "MCP", count: 114, delta: "+38%" },
  { word: "Agent评测", count: 96, delta: "+31%" },
  { word: "Seedance", count: 88, delta: "+29%" },
  { word: "Sora", count: 84, delta: "+24%" },
  { word: "Llama 4", count: 77, delta: "+22%" },
  { word: "一人公司", count: 69, delta: "+18%" },
  { word: "GPT-5", count: 63, delta: "+16%" },
  { word: "沙箱环境", count: 58, delta: "+14%" }
];

export const trendPredictions = [
  "AI 编程从编辑器插件进入完整变更闭环，评测与代码审查会成为差异点。",
  "MCP 市场会从“连接器数量”竞争，转向权限、审计和企业治理能力竞争。",
  "视频生成模型的热度将转移到可控性、长镜头一致性和素材工作流集成。",
  "开源模型继续在垂直场景压低推理成本，Llama 4 生态会带动更多本地 Agent。"
];
