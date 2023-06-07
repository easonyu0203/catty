<script lang="ts">
	import { Avatar, ListBox, ListBoxItem, ProgressRadial } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { serverTimestamp, collection, addDoc } from 'firebase/firestore';
	import { db, auth } from '$lib/firebase';
	import { FirebaseApp, User, userStore } from 'sveltefire';

	const user = userStore(auth);

	// Types
	interface MessageFeed {
		id: number;
		host: boolean;
		avatar: number;
		name: string;
		timestamp: string;
		message: string;
		color: string;
	}

	interface OpenAIChatMessage {
		role: string;
		content: string;
		timestamp: string;
	}

	let elemChat: HTMLElement;

	// Messages
	let openaiMessages: OpenAIChatMessage[] = [
		{
			role: 'system',
			content:
				'你是為台灣的流浪貓研究專家，民眾有關於流浪貓的問題想要問你，你要以親切幽默地回答他們問題',
			timestamp: `Today @ ${getCurrentTimestamp()}`
		},
		{
			role: 'assistant',
			content: '你好，我是 AI 小幫手，有什麼可以幫你的嗎？',
			timestamp: `Today @ ${getCurrentTimestamp()}`
		}
	];
	$: messageFeed = openaiMessages.slice(1).map((msg) => {
		const isHost = msg.role === 'user';

		return {
			host: isHost,
			avatar: 14,
			name: isHost ? $user?.displayName ?? 'User' : 'AI 小幫手',
			timestamp: msg.timestamp,
			message: msg.content,
			color: 'variant-soft-primary'
		};
	});

	let currentMessage = '';

	async function handleChatAsync() {
		openaiMessages = [
			...openaiMessages,
			{ role: 'user', content: currentMessage, timestamp: `Today @ ${getCurrentTimestamp()}` }
		];

		// store to firestore
		addDoc(collection(db, 'questions'), {
			uid: $user!.uid,
			content: currentMessage,
			timestamp: serverTimestamp()
		});

		// Clear prompt
		currentMessage = '';
		// Smooth scroll to bottom
		// Timeout prevents race condition
		setTimeout(() => {
			scrollChatBottom('smooth');
		}, 0);

		// Send message to OpenAI
		const msgs = openaiMessages.map((m) => {
			return { role: m.role.toString(), content: m.content.toString() };
		});
		// if msgs > 10, we only send index 0 and last 4
		if (msgs.length > 8) {
			msgs.splice(1, msgs.length - 5);
		}
		const res = await fetch('/main/ai-helper', {
			method: 'POST',
			body: JSON.stringify(msgs)
		});

		// get chat gpt message
		const chatGPTMsg = await res.json();

		openaiMessages = [
			...openaiMessages,
			{
				role: chatGPTMsg.role,
				content: chatGPTMsg.content,
				timestamp: `Today @ ${getCurrentTimestamp()}`
			}
		];

		setTimeout(() => {
			scrollChatBottom('smooth');
		}, 0);
	}

	function scrollChatBottom(behavior?: ScrollBehavior): void {
		if (elemChat === undefined) return;
		elemChat.scrollTo({ top: elemChat.scrollHeight, behavior });
	}

	function getCurrentTimestamp(): string {
		return new Date().toLocaleString('zh-TW', { hour: 'numeric', minute: 'numeric', hour12: true });
	}

	function onPromptKeydown(event: KeyboardEvent): void {
		// if (['Enter'].includes(event.code)) {
		// 	event.preventDefault();
		// 	handleChatAsync();
		// }
	}

	// When DOM mounted, scroll to bottom
	onMount(() => {
		scrollChatBottom();
	});
</script>

<FirebaseApp {auth} firestore={db}>
	<User let:user>
		<div class="container flex flex-col justify-center items-center space-y-20 h-full m-auto">
			<h1 class="h1">問問我們的小幫手關於流浪貓的問題吧!</h1>
			<section class="card w-[72rem]">
				<div class="chat w-full h-full">
					<!-- Chat -->
					<div class="grid grid-row-[1fr_auto]">
						<!-- Conversation -->
						<section bind:this={elemChat} class="max-h-[36rem] p-4 overflow-y-auto space-y-4">
							{#each messageFeed as bubble}
								{#if bubble.host === true}
									<div class="grid grid-cols-[auto_1fr] gap-2">
										<Avatar
											src={user.photoURL ? user.photoURL : ''}
											initials={user.displayName ? user.displayName[0] : 'U'}
											width="w-12"
										/>
										<div class="card p-4 variant-soft rounded-tl-none space-y-2">
											<header class="flex justify-between items-center">
												<p class="font-bold">{bubble.name}</p>
												<small class="opacity-50">{bubble.timestamp}</small>
											</header>
											<p>{bubble.message}</p>
										</div>
									</div>
								{:else}
									<div class="grid grid-cols-[1fr_auto] gap-2">
										<div class="card p-4 rounded-tr-none space-y-2 {bubble.color}">
											<header class="flex justify-between items-center">
												<p class="font-bold">{bubble.name}</p>
												<small class="opacity-50">{bubble.timestamp}</small>
											</header>
											<p>{bubble.message}</p>
										</div>
										<Avatar src="/ai_cat.png" width="w-12" />
									</div>
								{/if}
							{/each}
							{#if messageFeed[messageFeed.length - 1].host === true}
								<div class="grid grid-cols-[1fr_auto] gap-2">
									<div class="card p-4 rounded-tr-none space-y-2 variant-soft-primary">
										<header class="flex justify-between items-center">
											<p class="font-bold">AI 小幫手</p>
										</header>
										<ProgressRadial
											width="w-12"
											stroke={100}
											meter="stroke-primary-500"
											track="stroke-primary-500/30"
										/>
									</div>
									<Avatar src="/ai_cat.png" width="w-12" />
								</div>
							{/if}
						</section>
						<!-- Prompt -->
						<section class="border-t border-surface-500/30 p-4">
							<div
								class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token"
							>
								<div class="input-group-shim">+</div>
								<textarea
									bind:value={currentMessage}
									class="bg-transparent border-0 ring-0 outline-none p-2 h-12"
									name="prompt"
									id="prompt"
									placeholder="Write a message..."
									rows="1"
									on:keydown={(e) => onPromptKeydown(e)}
								/>
								<button
									disabled={currentMessage === '' ||
										messageFeed[messageFeed.length - 1].host === true}
									class={currentMessage ? 'variant-filled-primary' : 'input-group-shim'}
									on:click={() => handleChatAsync()}
								>
									<i class="fa-solid fa-paper-plane" />
								</button>
							</div>
						</section>
					</div>
				</div>
			</section>
		</div>
		<div
			slot="signedOut"
			class="container h-full m-auto flex flex-col space-y-10 items-center justify-center"
		>
			<h1 class="h1">要登入才能使用我們小幫手喔</h1>
			<h4 class="h4">請點選右上角登入按鈕</h4>
		</div>
	</User>
</FirebaseApp>
