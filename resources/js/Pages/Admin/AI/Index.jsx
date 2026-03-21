import { Head, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import Button from '@/Components/UI/Button';

const DEFAULT_CHAT_SESSION = `admin-ai-${Math.random().toString(36).slice(2, 10)}`;

function TextInput({ label, value, onChange, placeholder = '' }) {
    return (
        <label className="block space-y-1.5">
            <span className="label">{label}</span>
            <input
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className="input w-full"
            />
        </label>
    );
}

function TextAreaInput({ label, value, onChange, placeholder = '', rows = 4 }) {
    return (
        <label className="block space-y-1.5">
            <span className="label">{label}</span>
            <textarea
                rows={rows}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className="input w-full resize-y"
            />
        </label>
    );
}

export default function AdminAiToolsIndex() {
    const { auth } = usePage().props;

    const [activeTab, setActiveTab] = useState('chat');

    const [chatMessage, setChatMessage] = useState('');
    const [chatSessionId, setChatSessionId] = useState(DEFAULT_CHAT_SESSION);
    const [chatReply, setChatReply] = useState('');
    const [chatLoading, setChatLoading] = useState(false);

    const [quotationInput, setQuotationInput] = useState({
        project_type: '',
        scope: '',
        budget_range: '',
        timeline: '',
    });
    const [quotationResult, setQuotationResult] = useState('');
    const [quotationLoading, setQuotationLoading] = useState(false);

    const [blogInput, setBlogInput] = useState({
        topic: '',
        keywords: '',
        tone: 'professional',
        length: 'medium',
    });
    const [blogResult, setBlogResult] = useState('');
    const [blogLoading, setBlogLoading] = useState(false);

    const [seoInput, setSeoInput] = useState({
        page_title: '',
        page_content: '',
        target_keyword: '',
    });
    const [seoResult, setSeoResult] = useState('');
    const [seoLoading, setSeoLoading] = useState(false);

    const [errorText, setErrorText] = useState('');

    const tabs = useMemo(() => [
        { key: 'chat', label: 'Assistant Chat' },
        { key: 'quotation', label: 'Quotation Helper' },
        { key: 'content', label: 'Content Generator' },
        { key: 'seo', label: 'SEO Generator' },
    ], []);

    const parseError = (error) => {
        const message = error?.response?.data?.message;
        if (typeof message === 'string' && message.trim() !== '') {
            return message;
        }

        if (error?.response?.status === 429) {
            return 'Rate limit reached. Please wait a moment and try again.';
        }

        return 'Request failed. Please review input and try again.';
    };

    const runChat = async () => {
        if (!chatMessage.trim()) return;

        setErrorText('');
        setChatLoading(true);

        try {
            const response = await window.axios.post(route('ai.chat'), {
                message: chatMessage,
                session_id: chatSessionId,
            });

            setChatReply(response?.data?.reply ?? 'No response returned.');
            setChatSessionId(response?.data?.session_id || chatSessionId);
        } catch (error) {
            setErrorText(parseError(error));
        } finally {
            setChatLoading(false);
        }
    };

    const runQuotation = async () => {
        setErrorText('');
        setQuotationLoading(true);

        try {
            const response = await window.axios.post(route('ai.quotation.suggest'), {
                project_type: quotationInput.project_type,
                scope: quotationInput.scope,
                budget_range: quotationInput.budget_range,
                timeline: quotationInput.timeline,
            });

            setQuotationResult(JSON.stringify(response?.data ?? {}, null, 2));
        } catch (error) {
            setErrorText(parseError(error));
        } finally {
            setQuotationLoading(false);
        }
    };

    const runBlogGenerator = async () => {
        setErrorText('');
        setBlogLoading(true);

        try {
            const keywords = blogInput.keywords
                .split(',')
                .map((keyword) => keyword.trim())
                .filter(Boolean);

            const response = await window.axios.post(route('ai.content.blog'), {
                topic: blogInput.topic,
                keywords,
                tone: blogInput.tone,
                length: blogInput.length,
            });

            setBlogResult(
                typeof response?.data?.content === 'string'
                    ? response.data.content
                    : JSON.stringify(response?.data?.content ?? response?.data ?? {}, null, 2),
            );
        } catch (error) {
            setErrorText(parseError(error));
        } finally {
            setBlogLoading(false);
        }
    };

    const runSeoGenerator = async () => {
        setErrorText('');
        setSeoLoading(true);

        try {
            const response = await window.axios.post(route('ai.seo.meta'), {
                page_title: seoInput.page_title,
                page_content: seoInput.page_content,
                target_keyword: seoInput.target_keyword || null,
            });

            setSeoResult(JSON.stringify(response?.data ?? {}, null, 2));
        } catch (error) {
            setErrorText(parseError(error));
        } finally {
            setSeoLoading(false);
        }
    };

    return (
        <AdminLayout title="AI Tools">
            <Head title="AI Tools - Admin" />

            <div className="max-w-6xl mx-auto space-y-6">
                <div className="card p-6">
                    <h2 className="text-xl font-semibold text-text-primary">AI Productivity Suite</h2>
                    <p className="text-sm text-text-secondary mt-1">
                        Signed in as {auth?.user?.name}. Use these tools to generate content, estimate quotations, and speed up delivery workflows.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setActiveTab(tab.key)}
                                className={[
                                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                                    activeTab === tab.key
                                        ? 'bg-accent-500 text-white'
                                        : 'bg-[#0e3435] text-text-secondary hover:text-text-primary',
                                ].join(' ')}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {errorText && (
                    <div className="rounded-xl border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                        {errorText}
                    </div>
                )}

                {activeTab === 'chat' && (
                    <div className="card p-6 space-y-4">
                        <TextAreaInput
                            label="Message"
                            value={chatMessage}
                            onChange={setChatMessage}
                            placeholder="Ask the assistant for implementation help or planning suggestions..."
                            rows={4}
                        />
                        <div className="flex items-center gap-3">
                            <Button type="button" onClick={runChat} loading={chatLoading}>Send</Button>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={async () => {
                                    setErrorText('');
                                    try {
                                        await window.axios.post(route('ai.chat.reset'), { session_id: chatSessionId });
                                        setChatReply('');
                                        setChatSessionId(`admin-ai-${Math.random().toString(36).slice(2, 10)}`);
                                    } catch (error) {
                                        setErrorText(parseError(error));
                                    }
                                }}
                            >
                                Reset Conversation
                            </Button>
                        </div>

                        <TextAreaInput
                            label="AI Reply"
                            value={chatReply}
                            onChange={() => {}}
                            rows={10}
                        />
                    </div>
                )}

                {activeTab === 'quotation' && (
                    <div className="card p-6 space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <TextInput
                                label="Project Type"
                                value={quotationInput.project_type}
                                onChange={(value) => setQuotationInput((prev) => ({ ...prev, project_type: value }))}
                                placeholder="ERP implementation"
                            />
                            <TextInput
                                label="Budget Range"
                                value={quotationInput.budget_range}
                                onChange={(value) => setQuotationInput((prev) => ({ ...prev, budget_range: value }))}
                                placeholder="$5k - $10k"
                            />
                        </div>

                        <TextInput
                            label="Timeline"
                            value={quotationInput.timeline}
                            onChange={(value) => setQuotationInput((prev) => ({ ...prev, timeline: value }))}
                            placeholder="6 weeks"
                        />

                        <TextAreaInput
                            label="Scope"
                            value={quotationInput.scope}
                            onChange={(value) => setQuotationInput((prev) => ({ ...prev, scope: value }))}
                            rows={5}
                            placeholder="Modules, integrations, and deliverables"
                        />

                        <Button type="button" onClick={runQuotation} loading={quotationLoading}>Generate Suggestions</Button>

                        <TextAreaInput
                            label="Output"
                            value={quotationResult}
                            onChange={() => {}}
                            rows={12}
                        />
                    </div>
                )}

                {activeTab === 'content' && (
                    <div className="card p-6 space-y-4">
                        <TextInput
                            label="Topic"
                            value={blogInput.topic}
                            onChange={(value) => setBlogInput((prev) => ({ ...prev, topic: value }))}
                            placeholder="Benefits of Flutter for startup MVPs"
                        />

                        <TextInput
                            label="Keywords (comma separated)"
                            value={blogInput.keywords}
                            onChange={(value) => setBlogInput((prev) => ({ ...prev, keywords: value }))}
                            placeholder="flutter development, startup app, mvp"
                        />

                        <div className="grid md:grid-cols-2 gap-4">
                            <label className="block space-y-1.5">
                                <span className="label">Tone</span>
                                <select
                                    className="input w-full"
                                    value={blogInput.tone}
                                    onChange={(event) => setBlogInput((prev) => ({ ...prev, tone: event.target.value }))}
                                >
                                    <option value="professional">Professional</option>
                                    <option value="casual">Casual</option>
                                    <option value="technical">Technical</option>
                                    <option value="educational">Educational</option>
                                </select>
                            </label>

                            <label className="block space-y-1.5">
                                <span className="label">Length</span>
                                <select
                                    className="input w-full"
                                    value={blogInput.length}
                                    onChange={(event) => setBlogInput((prev) => ({ ...prev, length: event.target.value }))}
                                >
                                    <option value="short">Short</option>
                                    <option value="medium">Medium</option>
                                    <option value="long">Long</option>
                                </select>
                            </label>
                        </div>

                        <Button type="button" onClick={runBlogGenerator} loading={blogLoading}>Generate Blog Draft</Button>

                        <TextAreaInput
                            label="Generated Content"
                            value={blogResult}
                            onChange={() => {}}
                            rows={14}
                        />
                    </div>
                )}

                {activeTab === 'seo' && (
                    <div className="card p-6 space-y-4">
                        <TextInput
                            label="Page Title"
                            value={seoInput.page_title}
                            onChange={(value) => setSeoInput((prev) => ({ ...prev, page_title: value }))}
                            placeholder="CodeUnion ERP Services"
                        />

                        <TextInput
                            label="Target Keyword"
                            value={seoInput.target_keyword}
                            onChange={(value) => setSeoInput((prev) => ({ ...prev, target_keyword: value }))}
                            placeholder="odoo erp implementation"
                        />

                        <TextAreaInput
                            label="Page Content"
                            value={seoInput.page_content}
                            onChange={(value) => setSeoInput((prev) => ({ ...prev, page_content: value }))}
                            rows={8}
                            placeholder="Paste text/content to generate metadata..."
                        />

                        <Button type="button" onClick={runSeoGenerator} loading={seoLoading}>Generate SEO Meta</Button>

                        <TextAreaInput
                            label="SEO Output"
                            value={seoResult}
                            onChange={() => {}}
                            rows={10}
                        />
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
