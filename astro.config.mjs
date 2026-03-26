// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	redirects: {
		'/docs': '/docs/overview',
	},
	integrations: [
		starlight({
			title: 'Gitty',
			components: {
				SiteTitle: './src/components/SiteTitle.astro',
			},
			head: [
				{ tag: 'script', attrs: { src: '/a11y-widget.js', defer: true } },
			],
			description: 'Async-first Git for Swift. A modern libgit2 wrapper, SPM-native, for iOS & macOS.',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/RonenMars/Gitty' },
			],
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{ label: 'Overview', slug: 'docs/overview' },
				{
					label: 'Getting Started',
					items: [
						{ label: 'Installation', slug: 'docs/getting-started/installation' },
						{ label: 'Quick Start', slug: 'docs/getting-started/quick-start' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Repository', slug: 'docs/guides/repository' },
						{ label: 'Branches', slug: 'docs/guides/branches' },
						{ label: 'Commits & Staging', slug: 'docs/guides/commits' },
						{ label: 'Remotes, Fetch & Push', slug: 'docs/guides/remotes' },
						{ label: 'Diff', slug: 'docs/guides/diff' },
						{ label: 'Merge & Rebase', slug: 'docs/guides/merge-rebase' },
						{ label: 'Stash', slug: 'docs/guides/stash' },
						{ label: 'Tags', slug: 'docs/guides/tags' },
						{ label: 'Worktrees', slug: 'docs/guides/worktrees' },
						{ label: 'Blame', slug: 'docs/guides/blame' },
						{ label: 'Credentials', slug: 'docs/guides/credentials' },
					],
				},
				{
					label: 'API Reference',
					items: [
						{ label: 'Repository', slug: 'docs/reference/repository' },
						{ label: 'Models', slug: 'docs/reference/models' },
						{ label: 'Error Handling', slug: 'docs/reference/errors' },
					],
				},
			],
		}),
	],
});
